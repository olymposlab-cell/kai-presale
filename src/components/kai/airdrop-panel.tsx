import { useEffect, useMemo, useState } from "react";
import type { Address } from "viem";
import { Button } from "@/components/ui/button";
import { AIRDROP, AIRDROP_LIVE, explorerToken, shortAddr } from "@/lib/kai/chain";
import { AIRDROP_RECIPIENTS, airdropFor } from "@/lib/kai/airdrop-list";
import { dropCopy } from "@/lib/kai/airdrop-copy";
import { QUEST_MAX, QUESTS, loadAttested, saveAttested, type QuestId } from "@/lib/kai/airdrop-quests";
import { copy, type Lang } from "@/lib/kai/copy";
import { formatInt } from "@/lib/kai/economics";
import {
  claimAirdrop,
  connectWallet,
  getEthereum,
  readAirdropClaimed,
  readPurchased,
} from "@/lib/kai/wallet";

export function AirdropPanel({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const d = dropCopy[lang];
  const locale = lang === "en" ? "en-US" : "en-US";
  const [account, setAccount] = useState<Address | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [already, setAlready] = useState(false);
  const [attested, setAttested] = useState<QuestId[]>([]);
  const [bought, setBought] = useState(false);

  const listOpen = AIRDROP_RECIPIENTS.length > 0;
  const row = account ? airdropFor(account) : null;

  const done = useMemo(() => {
    const s = new Set<QuestId>(attested);
    if (bought) s.add("buy");
    return s;
  }, [attested, bought]);

  const pts = QUESTS.filter((q) => done.has(q.id)).reduce((n, q) => n + q.pts, 0);

  useEffect(() => {
    if (!account) return;
    setAttested(loadAttested(account));
    void readPurchased(account)
      .then((v) => setBought(v > 0n))
      .catch(() => setBought(false));
    if (!AIRDROP_LIVE) return;
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

  function mark(id: QuestId) {
    if (!account) return;
    const next = [...new Set([...attested, id])];
    setAttested(next);
    saveAttested(account, next);
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

      {!account ? (
        <Button className="mt-6 w-full" onClick={() => void onConnect()} disabled={busy}>
          {d.connect}
        </Button>
      ) : (
        <p className="mt-4 font-mono text-xs text-subtle">{shortAddr(account)}</p>
      )}

      {account ? (
        <section className="mt-6">
          <div className="flex items-end justify-between gap-3">
            <div>
              <h3 className="font-display text-lg text-fg">{d.quests}</h3>
              <p className="mt-1 text-sm text-muted">{d.questLead}</p>
            </div>
            <p className="shrink-0 font-mono text-sm tabular-nums text-fg">
              {d.points} {pts}/{QUEST_MAX}
            </p>
          </div>
          <ul className="mt-4 space-y-3">
            {QUESTS.map((q) => {
              const on = done.has(q.id);
              const copyQ = d.task[q.id];
              return (
                <li key={q.id} className="rounded-[var(--radius-md)] border border-border bg-surface p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm text-fg">{copyQ.t}</p>
                      <p className="mt-1 text-xs text-muted">{copyQ.b}</p>
                    </div>
                    <span className="font-mono text-xs tabular-nums text-subtle">+{q.pts}</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" asChild>
                      <a href={q.href} target={q.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                        {d.open}
                      </a>
                    </Button>
                    {on ? (
                      <span className="self-center text-xs text-ok">{q.verify === "chain" ? d.chainOk : d.done}</span>
                    ) : q.verify === "attest" ? (
                      <Button size="sm" onClick={() => mark(q.id)}>
                        {d.mark}
                      </Button>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      <p className="mt-6 text-sm text-muted">{d.wait}</p>

      {listOpen && account && row ? (
        <div className="mt-4 rounded-[var(--radius-md)] border border-accent/35 bg-surface p-4">
          <p className="text-xs uppercase tracking-[0.12em] text-subtle">{already ? d.claimed : d.eligible}</p>
          <p className="mt-1 font-mono text-2xl tabular-nums text-fg">{formatInt(row.kai, locale)} KAI</p>
          <Button className="mt-4 w-full" disabled={busy || already || !AIRDROP_LIVE} onClick={() => void onClaim()}>
            {busy ? "…" : already ? d.claimed : d.claim}
          </Button>
        </div>
      ) : null}

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
