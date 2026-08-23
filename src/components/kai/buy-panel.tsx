import { useEffect, useMemo, useState } from "react";
import type { Address } from "viem";
import { Button } from "@/components/ui/button";
import { MOBILE_WALLET, QR_CONNECT, copy, localeOf, type Lang } from "@/lib/kai/copy";
import {
  MIN_USD,
  ROUNDS,
  WALLET_CAP_KAI,
  estimateUsdg,
  formatInt,
  priceUsd,
} from "@/lib/kai/economics";
import { PRESALE, ROBINHOOD_CHAIN_ID, shortAddr } from "@/lib/kai/chain";
import {
  CHAIN_META,
  type PayAsset,
  quoteCovering,
  readPayBalance,
  sendLifiTx,
  waitBridge,
} from "@/lib/kai/pay";
import {
  approveUsdg,
  buyKai,
  connectWallet,
  connectWalletConnect,
  ensureChainId,
  fmtToken,
  fmtUsdg,
  getEthereum,
  kaiToWei,
  readPurchased,
  readQuote,
  readSaleClosed,
  readSaleOpened,
  readUsdg,
  readWalletChain,
} from "@/lib/kai/wallet";
import { Loader2, Wallet } from "lucide-react";

type Props = { lang: Lang };

const UNISWAP_ETH_USDG =
  "https://app.uniswap.org/swap?chain=robinhood&inputCurrency=NATIVE&outputCurrency=0x5fc5360D0400a0Fd4f2af552ADD042D716F1d168";

const ASSETS: PayAsset[] = ["USDG", "ETH", "USDT", "USDC"];

export function BuyPanel({ lang }: Props) {
  const t = copy[lang];
  const m = MOBILE_WALLET[lang];
  const locale = localeOf(lang);
  const [account, setAccount] = useState<Address | null>(null);
  const [asset, setAsset] = useState<PayAsset>("USDG");
  const [busy, setBusy] = useState(false);
  const [phase, setPhase] = useState<"idle" | "swap" | "bridge" | "buy">("idle");
  const [saleOpened, setSaleOpened] = useState<boolean | null>(null);
  const [saleClosed, setSaleClosed] = useState<boolean | null>(null);
  const [kaiInput, setKaiInput] = useState("500");
  const [quote, setQuote] = useState<bigint | null>(null);
  const [bal, setBal] = useState<bigint | null>(null);
  const [payBal, setPayBal] = useState<bigint | null>(null);
  const [payDecimals, setPayDecimals] = useState(6);
  const [allowance, setAllowance] = useState<bigint | null>(null);
  const [bought, setBought] = useState<bigint | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(/iPhone|iPad|Android/i.test(navigator.userAgent) && !getEthereum());
  }, []);

  const kaiWhole = useMemo(() => {
    const n = kaiInput.replace(/[^\d]/g, "");
    if (!n) return 0n;
    try {
      return BigInt(n);
    } catch {
      return 0n;
    }
  }, [kaiInput]);

  const localCost = kaiWhole > 0n ? estimateUsdg(kaiWhole) : 0n;
  const pay = quote ?? localCost;
  const belowMin = kaiWhole > 0n && Number(pay) / 1_000_000 < MIN_USD;
  const hasUsdg = bal !== null && bal >= pay && pay > 0n;
  const needsApprove = account !== null && hasUsdg && (allowance === null || allowance < pay);

  useEffect(() => {
    let alive = true;
    (async () => {
      const [opened, closed] = await Promise.all([readSaleOpened(), readSaleClosed()]);
      if (!alive) return;
      setSaleOpened(opened);
      setSaleClosed(closed);
    })();
    const id = window.setInterval(async () => {
      const opened = await readSaleOpened();
      if (alive) setSaleOpened(opened);
    }, 12_000);
    return () => {
      alive = false;
      window.clearInterval(id);
    };
  }, []);

  useEffect(() => {
    if (kaiWhole <= 0n) {
      setQuote(null);
      return;
    }
    const wei = kaiToWei(kaiWhole);
    let alive = true;
    readQuote(wei)
      .then((q) => {
        if (alive) setQuote(q);
      })
      .catch(() => {
        if (alive) setQuote(null);
      });
    return () => {
      alive = false;
    };
  }, [kaiWhole]);

  async function refreshAccount(addr: Address) {
    const [{ bal: b, allowance: a }, p] = await Promise.all([
      readUsdg(addr),
      readPurchased(addr),
    ]);
    setBal(b);
    setAllowance(a);
    setBought(p);
    const eth = getEthereum();
    if (!eth) return;
    try {
      const chain = await readWalletChain(eth);
      const payInfo = await readPayBalance(asset, addr, chain);
      setPayBal(payInfo.bal);
      setPayDecimals(payInfo.decimals);
    } catch {
      setPayBal(null);
    }
  }

  useEffect(() => {
    if (account) void refreshAccount(account);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asset, account]);

  async function onConnectQr() {
    setErr(null);
    setBusy(true);
    try {
      const addr = await connectWalletConnect();
      setAccount(addr);
      await refreshAccount(addr);
    } catch (e) {
      const raw = e instanceof Error ? e.message : "";
      if (raw.includes("User rejected") || raw.includes("denied") || raw === "Connection request reset") {
        setErr(t.txFail);
      } else {
        setErr(raw ? `${t.txFail}: ${raw.slice(0, 100)}` : t.txFail);
      }
    } finally {
      setBusy(false);
    }
  }

  async function onConnect() {
    setErr(null);
    if (!getEthereum()) {
      if (/iPhone|iPad|Android/i.test(navigator.userAgent)) {
        void onConnectQr();
        return;
      }
      setErr(t.noWallet);
      return;
    }
    setBusy(true);
    try {
      const addr = await connectWallet();
      setAccount(addr);
      await refreshAccount(addr);
    } catch (e) {
      setErr(e instanceof Error && e.message === "NO_WALLET" ? t.noWallet : t.txFail);
    } finally {
      setBusy(false);
    }
  }

  async function onApproveOrBuy() {
    if (!account) return onConnect();
    const eth = getEthereum();
    if (!eth) {
      setErr(t.noWallet);
      return;
    }
    if (saleOpened !== true || saleClosed === true || belowMin || kaiWhole <= 0n) return;
    setErr(null);
    setMsg(null);
    setBusy(true);
    setPhase("buy");
    try {
      const wei = kaiToWei(kaiWhole);
      const maxPay = quote ?? localCost;

      if (!hasUsdg) {
        if (asset === "ETH") {
          window.open(UNISWAP_ETH_USDG, "_blank", "noopener,noreferrer");
          setErr(t.swapUniswap);
          return;
        }
        setPhase("swap");
        const chain = await readWalletChain(eth);
        const route = await readPayBalance(asset, account, chain);
        const covering = await quoteCovering({
          fromChain: route.fromChain,
          fromToken: route.fromToken,
          decimals: route.decimals,
          neededUsdg: maxPay,
          fromAddress: account,
        });
        const hash = await sendLifiTx(eth, account, covering, route.fromChain);
        if (route.fromChain !== ROBINHOOD_CHAIN_ID) {
          setPhase("bridge");
          await waitBridge(hash, route.fromChain);
        }
        const meta = CHAIN_META[ROBINHOOD_CHAIN_ID];
        if (meta) {
          await ensureChainId(eth, ROBINHOOD_CHAIN_ID, meta);
        }
        await refreshAccount(account);
      }

      const latest = await readUsdg(account);
      if (latest.bal < maxPay) {
        setErr(t.needBal);
        return;
      }
      setPhase("buy");
      if (latest.allowance < maxPay) {
        await approveUsdg(eth, account, maxPay);
        await refreshAccount(account);
      }
      await buyKai(eth, account, wei, maxPay);
      setMsg(t.txOk);
      await refreshAccount(account);
    } catch (e) {
      const raw = e instanceof Error ? e.message : "";
      if (raw === "NO_WALLET") setErr(t.noWallet);
      else if (raw.includes("User rejected") || raw.includes("denied")) setErr(t.txFail);
      else setErr(raw ? `${t.txFail}: ${raw.slice(0, 120)}` : t.txFail);
    } finally {
      setBusy(false);
      setPhase("idle");
    }
  }

  const closed = saleClosed === true;
  const waiting = saleOpened !== true && !closed;
  let cta: string = t.connect;
  if (account && waiting) cta = t.saleWait;
  else if (account && closed) cta = t.saleClosed;
  else if (busy && phase === "swap") cta = t.swapping;
  else if (busy && phase === "bridge") cta = t.bridging;
  else if (busy) cta = t.buying;
  else if (account && !hasUsdg && asset === "ETH") cta = t.openUniswap;
  else if (account && !hasUsdg && asset !== "USDG") cta = t.swapBuy;
  else if (account && needsApprove) cta = t.approve;
  else if (account) cta = t.buy;

  return (
    <section
      id="al"
      className="rounded-[var(--radius-xl)] border border-border bg-elevated p-5 shadow-[var(--shadow)] sm:p-7"
    >
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">
            {t.kicker}
          </p>
          <h2 className="mt-1 font-display text-2xl text-fg">{t.buyCta}</h2>
          <p className="mt-1 text-[11px] text-subtle">{t.chainBadge}</p>
        </div>
        <span
          className={
            saleOpened === true
              ? "rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent"
              : "rounded-full bg-surface px-3 py-1 text-xs font-medium text-muted"
          }
        >
          {closed ? t.saleClosed : saleOpened === true ? t.open : t.pending}
        </span>
      </div>

      {account ? (
        <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-muted">
          <Wallet className="size-4 text-accent" />
          <span className="text-fg">{shortAddr(account)}</span>
          {bal !== null && (
            <span>
              {t.usdgBal}: {fmtUsdg(bal)}
            </span>
          )}
        </div>
      ) : null}

      <p className="text-sm text-muted">{t.payWith}</p>
      <div className="mt-2 grid grid-cols-4 gap-2">
        {ASSETS.map((a) => (
          <button
            key={a}
            type="button"
            aria-pressed={asset === a}
            onClick={() => setAsset(a)}
            className={
              asset === a
                ? "h-11 rounded-[var(--radius-md)] border border-accent bg-accent/15 text-sm font-medium text-fg"
                : "h-11 rounded-[var(--radius-md)] border border-border bg-surface text-sm text-muted"
            }
          >
            {a}
          </button>
        ))}
      </div>
      {account && payBal !== null && asset !== "USDG" && (
        <p className="mt-2 text-xs text-subtle">
          {t.payBal}: {fmtToken(payBal, payDecimals, asset === "ETH" ? 4 : 2)} {asset}
        </p>
      )}
      {asset === "ETH" && !hasUsdg && (
        <a
          className="mt-2 inline-block text-xs text-accent hover:underline"
          href={UNISWAP_ETH_USDG}
          target="_blank"
          rel="noreferrer"
        >
          {t.openUniswap}
        </a>
      )}

      <label className="mt-4 block text-sm text-muted">
        {t.amount}
        <input
          inputMode="numeric"
          value={kaiInput}
          onChange={(e) => setKaiInput(e.target.value.replace(/[^\d]/g, ""))}
          className="mt-2 h-12 w-full rounded-[var(--radius-md)] border border-border bg-bg px-4 font-mono text-lg text-fg outline-none ring-ring focus:ring-2"
        />
      </label>
      {belowMin && <p className="mt-2 text-sm text-warn">{t.belowMin}</p>}

      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-[var(--radius-md)] bg-surface p-3">
          <dt className="text-subtle">{t.est}</dt>
          <dd className="mt-1 font-mono text-fg">{pay > 0n ? `${fmtUsdg(pay)} USDG` : "—"}</dd>
        </div>
        <div className="rounded-[var(--radius-md)] bg-surface p-3">
          <dt className="text-subtle">{t.unit}</dt>
          <dd className="mt-1 font-mono text-fg">${priceUsd(ROUNDS[0].priceMicroUsd).toFixed(3)}</dd>
        </div>
      </dl>

      <p className="mt-3 text-xs text-subtle">
        {t.cap}: {formatInt(WALLET_CAP_KAI, locale)} KAI
        {bought !== null && bought > 0n ? ` · ${t.yourBought}: ${fmtToken(bought, 18, 0)}` : ""}
      </p>

      {!account ? (
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          <Button
            className="w-full"
            size="lg"
            disabled={busy}
            onClick={() => void onConnect()}
          >
            {busy && <Loader2 className="size-4 animate-spin" />}
            {mobile ? QR_CONNECT[lang] : cta}
          </Button>
          <Button
            className="w-full"
            size="lg"
            variant="outline"
            disabled={busy}
            onClick={() => void onConnectQr()}
          >
            {QR_CONNECT[lang]}
          </Button>
        </div>
      ) : (
        <Button
          className="mt-5 w-full"
          size="lg"
          disabled={busy || waiting || closed || belowMin || kaiWhole <= 0n}
          onClick={() => {
            if (waiting || closed) return;
            void onApproveOrBuy();
          }}
        >
          {busy && <Loader2 className="size-4 animate-spin" />}
          {cta}
        </Button>
      )}

      {mobile && !account && <p className="mt-3 text-sm text-muted">{m.hint}</p>}
      {waiting && <p className="mt-3 text-sm text-muted">{t.saleWaitHint}</p>}
      {err && <p className="mt-3 text-sm text-danger">{err}</p>}
      {msg && <p className="mt-3 text-sm text-ok">{msg}</p>}
      <p className="mt-4 break-all font-mono text-[11px] text-subtle">{PRESALE}</p>
    </section>
  );
}
