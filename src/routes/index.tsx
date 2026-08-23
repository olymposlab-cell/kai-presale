import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BuyPanel } from "@/components/kai/buy-panel";
import { SiteFooter, SiteHeader } from "@/components/kai/site-shell";
import { ALLOC_KEYS, KPI_PRESALE, copy, isLang, localeOf, type Lang } from "@/lib/kai/copy";
import {
  ALLOCATION,
  KAI_SUPPLY,
  ROUNDS,
  SELLABLE_PRESALE,
  formatInt,
  priceUsd,
} from "@/lib/kai/economics";
import { KAI_TOKEN, PRESALE, USDG, explorerToken, shortAddr } from "@/lib/kai/chain";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [lang, setLang] = useState<Lang>("tr");
  const t = copy[lang];
  const locale = localeOf(lang);

  useEffect(() => {
    const saved = localStorage.getItem("kai-lang");
    if (saved && isLang(saved)) setLang(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("kai-lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div id="top" className="min-h-dvh">
      <SiteHeader lang={lang} onLang={setLang} />

      <main className="mx-auto grid max-w-5xl gap-10 px-4 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-12 lg:py-16">
        <div>
          <p className="inline-flex items-center rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-accent">
            {t.chainBadge}
          </p>
          <p className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-subtle">
            {t.kicker} · {t.everyone}
          </p>
          <div className="kai-orb mt-6" />
          <h1 className="mt-6 font-display text-[clamp(2.1rem,5vw,3.4rem)] leading-[1.12] tracking-[-0.03em] text-fg">
            {t.heroTitle}
          </h1>
          <p className="mt-3 max-w-[46ch] text-base text-muted">{t.heroTagline}</p>
          <p className="mt-3 max-w-[46ch] text-base text-muted sm:text-lg">{t.heroBody}</p>
          <p className="mt-4 max-w-[46ch] text-sm text-subtle">{t.chainHint}</p>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              [t.supply, formatInt(KAI_SUPPLY, locale)],
              [KPI_PRESALE[lang], formatInt(SELLABLE_PRESALE, locale)],
              [t.rounds, "4"],
              ["$", `$${priceUsd(ROUNDS[0].priceMicroUsd).toFixed(3)}`],
            ].map(([label, value]) => (
              <div key={String(label)} className="rounded-[var(--radius-md)] border border-border bg-elevated p-3">
                <p className="text-[11px] uppercase tracking-[0.12em] text-subtle">{label}</p>
                <p className="mt-1 font-mono text-sm tabular-nums text-fg">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:sticky lg:top-24">
          <BuyPanel lang={lang} />
        </div>
      </main>

      <section id="genel" className="border-t border-border py-14">
        <div className="mx-auto grid max-w-5xl gap-6 px-4 md:grid-cols-3">
          {[
            [t.whatHq, t.whatHqBody],
            [t.whatKai, t.whatKaiBody],
            [t.whyToken, t.whyTokenBody],
          ].map(([title, body]) => (
            <article key={title} className="rounded-[var(--radius-lg)] border border-border bg-elevated p-5">
              <h2 className="font-display text-xl text-fg">{title}</h2>
              <p className="mt-2 text-sm text-muted">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-border py-14">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="font-display text-3xl text-fg">{t.utilityTitle}</h2>
          <p className="mt-2 max-w-[60ch] text-muted">{t.utilityLead}</p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {[t.util1, t.util2, t.util3, t.util4].map((item) => (
              <li key={item} className="rounded-[var(--radius-md)] border border-border bg-elevated px-4 py-3 text-sm text-muted">
                {item}
              </li>
            ))}
          </ul>
          <h3 className="mt-10 font-display text-xl text-fg">{t.proofTitle}</h3>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-muted sm:grid-cols-4">
            {[t.proof1, t.proof2, t.proof3, t.proof4].map((item) => (
              <li key={item} className="rounded-[var(--radius-md)] bg-surface px-3 py-2">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="yol" className="border-t border-border py-14">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="font-display text-3xl text-fg">{t.roadmap}</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              [t.rmNow, t.rmNowD],
              [t.rmNext, t.rmNextD],
              [t.rmThen, t.rmThenD],
              [t.rmLater, t.rmLaterD],
            ].map(([title, body]) => (
              <article key={title} className="rounded-[var(--radius-lg)] border border-border bg-elevated p-5">
                <h3 className="font-medium text-fg">{title}</h3>
                <p className="mt-2 text-sm text-muted">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="turlar" className="border-t border-border py-14">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="font-display text-3xl text-fg">{t.rounds}</h2>
          <p className="mt-2 max-w-[60ch] text-muted">{t.roundsLead}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {ROUNDS.map((r) => (
              <article key={r.n} className="rounded-[var(--radius-lg)] border border-border bg-elevated p-5">
                <p className="text-xs uppercase tracking-[0.14em] text-subtle">
                  {t.rounds} {r.n}
                </p>
                <p className="mt-2 font-display text-2xl tabular-nums text-accent">
                  ${priceUsd(r.priceMicroUsd).toFixed(3)}
                </p>
                <p className="mt-1 font-mono text-sm text-muted">
                  {formatInt(r.cap, locale)} KAI
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="tokenomi" className="border-t border-border py-14">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="font-display text-3xl text-fg">{t.tokenomics}</h2>
          <p className="mt-3 font-display text-2xl text-accent sm:text-3xl">
            {formatInt(KAI_SUPPLY, locale)} KAI
          </p>
          <p className="mt-1 text-sm text-muted">
            {t.supply} · {formatInt(SELLABLE_PRESALE, locale)} KAI
          </p>
          <p className="mt-2 text-sm text-subtle">{t.supplyLine}</p>
          <div className="mt-6 overflow-hidden rounded-[var(--radius-lg)] border border-border">
            <table className="w-full text-left text-sm">
              <tbody>
                {ALLOCATION.map((row, i) => (
                  <tr key={row.key} className="border-t border-border first:border-t-0">
                    <th className="bg-elevated px-4 py-3 font-medium text-fg">{t[ALLOC_KEYS[i]]}</th>
                    <td className="px-4 py-3 font-mono tabular-nums text-muted">
                      {(row.bp / 100).toFixed(row.bp % 100 === 0 ? 0 : 1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-muted">{t.tge}</p>
          <p className="text-sm text-muted">{t.teamVest}</p>
        </div>
      </section>

      <section className="border-t border-border py-14">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="font-display text-3xl text-fg">{t.how}</h2>
          <ol className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              ["01", t.step1, t.step1d],
              ["02", t.step2, t.step2d],
              ["03", t.step3, t.step3d],
            ].map(([n, title, body]) => (
              <li key={n} className="rounded-[var(--radius-lg)] border border-border bg-elevated p-4">
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-subtle">{n}</p>
                <p className="mt-1 font-medium text-fg">{title}</p>
                <p className="mt-1 text-sm text-muted">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-border py-14">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="font-display text-3xl text-fg">{t.contracts}</h2>
          <p className="mt-2 text-sm text-subtle">{t.chainHint}</p>
          <ul className="mt-4 space-y-2 font-mono text-xs text-muted sm:text-sm">
            <li>
              <a className="hover:text-fg" href={explorerToken(PRESALE)}>
                Presale {shortAddr(PRESALE)}
              </a>
            </li>
            <li>
              <a className="hover:text-fg" href={explorerToken(KAI_TOKEN)}>
                KAI {shortAddr(KAI_TOKEN)}
              </a>
            </li>
            <li>
              <a className="hover:text-fg" href={explorerToken(USDG)}>
                USDG {shortAddr(USDG)}
              </a>
            </li>
          </ul>
        </div>
      </section>

      <SiteFooter lang={lang} />
    </div>
  );
}
