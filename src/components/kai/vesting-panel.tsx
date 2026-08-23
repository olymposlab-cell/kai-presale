import { useEffect, useState } from "react";
import type { Address } from "viem";
import { Button } from "@/components/ui/button";
import { KAI_TOKEN, VESTING, explorerToken, shortAddr } from "@/lib/kai/chain";
import { copy, type Lang } from "@/lib/kai/copy";
import { PRESALE_TGE_PCT, PRESALE_VEST_MONTHS } from "@/lib/kai/economics";
import { vestCopy } from "@/lib/kai/vest-copy";
import {
  claimVested,
  connectWallet,
  fmtToken,
  getEthereum,
  readPurchased,
  readVesting,
} from "@/lib/kai/wallet";

const MONTH = 30 * 24 * 60 * 60;

export function VestingPanel({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const v = vestCopy[lang];
  const [account, setAccount] = useState<Address | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [purchased, setPurchased] = useState(0n);
  const [tgeOn, setTgeOn] = useState(false);
  const [tgeTs, setTgeTs] = useState(0n);
  const [claimedAmt, setClaimedAmt] = useState(0n);
  const [claimableAmt, setClaimableAmt] = useState(0n);

  async function load(addr: Address) {
    const [p, vest] = await Promise.all([readPurchased(addr), readVesting(addr)]);
    setPurchased(p);
    setTgeOn(vest.tgeOn);
    setTgeTs(vest.tgeTs);
    setClaimedAmt(vest.claimedAmt);
    setClaimableAmt(vest.claimableAmt);
  }

  useEffect(() => {
    if (!account) return;
    void load(account).catch(() => setErr(t.txFail));
  }, [account]);

  async function onConnect() {
    setErr(null);
    setBusy(true);
    try {
      const a = await connectWallet();
      setAccount(a);
    } catch {
      setErr(t.noWallet);
    } finally {
      setBusy(false);
    }
  }

  async function onClaim() {
    if (!account) return;
    const eth = getEthereum();
    if (!eth) {
      setErr(t.noWallet);
      return;
    }
    setBusy(true);
    setErr(null);
    setMsg(null);
    try {
      await claimVested(eth, account);
      setMsg(v.ok);
      await load(account);
    } catch (e) {
      const raw = e instanceof Error ? e.message : "";
      if (raw.includes("User rejected") || raw.includes("denied")) setErr(t.txFail);
      else setErr(raw ? `${t.txFail}: ${raw.slice(0, 100)}` : t.txFail);
    } finally {
      setBusy(false);
    }
  }

  async function onAddToken() {
    const eth = getEthereum();
    if (!eth) return;
    try {
      await eth.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: { address: KAI_TOKEN, symbol: "KAI", decimals: 18 },
        } as never,
      });
    } catch {
      /* ignore */
    }
  }

  const tgeUnlock = (purchased * BigInt(PRESALE_TGE_PCT)) / 100n;
  const now = Math.floor(Date.now() / 1000);
  const elapsed = tgeOn && tgeTs > 0n ? Math.min(PRESALE_VEST_MONTHS, Math.floor((now - Number(tgeTs)) / MONTH)) : 0;
  const nextTs =
    tgeOn && elapsed < PRESALE_VEST_MONTHS ? Number(tgeTs) + (elapsed + 1) * MONTH : null;
  const vestedNow = tgeOn ? claimedAmt + claimableAmt : 0n;

  return (
    <div className="rounded-[var(--radius-lg)] border border-border bg-elevated p-5 sm:p-6">
      <h2 className="font-display text-2xl text-fg">{v.title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">{v.lead}</p>
      <p className="mt-2 text-xs text-subtle">{v.schedule}</p>

      {!account ? (
        <Button className="mt-6 w-full" onClick={() => void onConnect()} disabled={busy}>
          {t.connect}
        </Button>
      ) : (
        <>
          <p className="mt-4 font-mono text-xs text-subtle">{shortAddr(account)}</p>
          <p className={`mt-2 text-sm ${tgeOn ? "text-ok" : "text-muted"}`}>{tgeOn ? v.tgeOn : v.tgeWait}</p>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-[var(--radius-md)] border border-border bg-surface p-3">
              <dt className="text-xs text-subtle">{v.purchased}</dt>
              <dd className="mt-1 font-mono tabular-nums text-fg">{fmtToken(purchased, 18, 0)} KAI</dd>
            </div>
            <div className="rounded-[var(--radius-md)] border border-border bg-surface p-3">
              <dt className="text-xs text-subtle">TGE {PRESALE_TGE_PCT}%</dt>
              <dd className="mt-1 font-mono tabular-nums text-fg">{fmtToken(tgeUnlock, 18, 0)} KAI</dd>
            </div>
            <div className="rounded-[var(--radius-md)] border border-border bg-surface p-3">
              <dt className="text-xs text-subtle">{v.vested}</dt>
              <dd className="mt-1 font-mono tabular-nums text-fg">{fmtToken(vestedNow, 18, 2)} KAI</dd>
            </div>
            <div className="rounded-[var(--radius-md)] border border-border bg-surface p-3">
              <dt className="text-xs text-subtle">{v.claimed}</dt>
              <dd className="mt-1 font-mono tabular-nums text-fg">{fmtToken(claimedAmt, 18, 2)} KAI</dd>
            </div>
            <div className="col-span-2 rounded-[var(--radius-md)] border border-accent/35 bg-surface p-3">
              <dt className="text-xs text-subtle">{v.claimable}</dt>
              <dd className="mt-1 font-mono text-lg tabular-nums text-fg">{fmtToken(claimableAmt, 18, 2)} KAI</dd>
            </div>
          </dl>
          {tgeOn ? (
            <p className="mt-3 text-xs text-subtle">
              {elapsed}/{PRESALE_VEST_MONTHS}
              {nextTs ? ` · ${v.next}: ${new Date(nextTs * 1000).toISOString().slice(0, 10)}` : ""}
            </p>
          ) : null}
          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <Button className="flex-1" disabled={busy || !tgeOn || claimableAmt === 0n} onClick={() => void onClaim()}>
              {busy ? "…" : claimableAmt === 0n ? v.none : v.claim}
            </Button>
            <Button variant="outline" onClick={() => void onAddToken()}>
              {v.addToken}
            </Button>
          </div>
        </>
      )}
      {err ? <p className="mt-3 text-sm text-danger">{err}</p> : null}
      {msg ? <p className="mt-3 text-sm text-ok">{msg}</p> : null}
      <p className="mt-4 font-mono text-[11px] text-subtle">
        <a className="hover:text-fg" href={explorerToken(VESTING)}>
          Vesting {shortAddr(VESTING)}
        </a>
      </p>
    </div>
  );
}
