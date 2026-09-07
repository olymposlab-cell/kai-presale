import { useEffect, useState } from "react";
import type { Address } from "viem";
import { Button } from "@/components/ui/button";
import { AIRDROP, AIRDROP_LIVE, explorerToken, shortAddr } from "@/lib/kai/chain";
import { airdropFor } from "@/lib/kai/airdrop-list";
import { dropCopy } from "@/lib/kai/airdrop-copy";
import { copy, type Lang } from "@/lib/kai/copy";
import { formatInt } from "@/lib/kai/economics";
import { claimAirdrop, connectWallet, getEthereum, readAirdropClaimed } from "@/lib/kai/wallet";

export function AirdropPanel({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const d = dropCopy[lang];
  const locale = lang === "en" ? "en-US" : undefined;
  const [account, setAccount] = useState<Address | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [already, setAlready] = useState(false);

  const row = account ? airdropFor(account) : null;

  useEffect(() => {
    if (!account || !AIRDROP_LIVE) return;
    void readAirdropClaimed(account).then(setAlready).catch(() => setAlready(false));
  }, [account]);

  async function onConnect() {
    setErr(null);
    setBusy(true);
    try {
      setAccount(await connectWallet());
    } catch {
      setErr(t.noWallet);
    } finally {
      setBusy(false);
    }
  }

  async function onClaim() {
    if (!account || !row) return;
    const eth = getEthereum();
    if (!eth) {
      setErr(t.noWallet);
      return;
    }
    setBusy(true);
    setErr(null);
    setMsg(null);
    try {
      await claimAirdrop(eth, account, row.amountWei, row.proof);
      setAlready(true);
      setMsg(d.ok);
    } catch (e) {
      const raw = e instanceof Error ? e.message : "";
      if (raw === "AIRDROP_OFF") setErr(d.wait);
      else if (raw.includes("User rejected") || raw.includes("denied")) setErr(t.txFail);
      else setErr(raw ? `${t.txFail}: ${raw.slice(0, 100)}` : t.txFail);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-[var(--radius-lg)] border border-border bg-elevated p-5 sm:p-6">
      <h2 className="font-display text-2xl text-fg">{d.title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">{d.lead}</p>
      <p className="mt-2 text-xs text-subtle">{d.cap}</p>

      {!AIRDROP_LIVE ? <p className="mt-4 text-sm text-muted">{d.wait}</p> : null}

      {!account ? (
        <Button className="mt-6 w-full" onClick={() => void onConnect()} disabled={busy}>
          {d.connect}
        </Button>
      ) : (
        <>
          <p className="mt-4 font-mono text-xs text-subtle">{shortAddr(account)}</p>
          {row ? (
            <div className="mt-4 rounded-[var(--radius-md)] border border-accent/35 bg-surface p-4">
              <p className="text-xs uppercase tracking-[0.12em] text-subtle">{already ? d.claimed : d.eligible}</p>
              <p className="mt-1 font-mono text-2xl tabular-nums text-fg">
                {formatInt(row.kai, locale ?? "en-US")} KAI
              </p>
              <Button className="mt-4 w-full" disabled={busy || already || !AIRDROP_LIVE} onClick={() => void onClaim()}>
                {busy ? "…" : already ? d.claimed : d.claim}
              </Button>
            </div>
          ) : (
            <p className="mt-4 text-sm text-muted">{d.none}</p>
          )}
        </>
      )}
      {err ? <p className="mt-3 text-sm text-danger">{err}</p> : null}
      {msg ? <p className="mt-3 text-sm text-ok">{msg}</p> : null}
      {AIRDROP_LIVE ? (
        <p className="mt-4 font-mono text-[11px] text-subtle">
          <a className="hover:text-fg" href={explorerToken(AIRDROP)}>
            Airdrop {shortAddr(AIRDROP)}
          </a>
        </p>
      ) : null}
    </div>
  );
}
