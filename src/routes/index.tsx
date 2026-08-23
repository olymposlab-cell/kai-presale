import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BuyPanel } from "@/components/kai/buy-panel";
import { SiteFooter, SiteHeader } from "@/components/kai/site-shell";
import { copy, type Lang } from "@/lib/kai/copy";
import {
  ALLOCATION,
  KAI_SUPPLY,
  ROUNDS,
  SELLABLE_PRESALE,
  formatInt,
  priceUsd,
} from "@/lib/kai/economics";
import { KAI_TOKEN, PRESALE, USDG, shortAddr } from "@/lib/kai/chain";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [lang, setLang] = useState<Lang>("tr");
  const t = copy[lang];
  const locale = lang === "tr" ? "tr-TR" : "en-US";

  return (
    <div id="top" className="min-h-dvh">
      <SiteHeader lang={lang} onToggleLang={() => setLang(lang === "tr" ? "en" : "tr")} />

      <main className="mx-auto grid max-w-5xl gap-10 px-4 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-12 lg:py-16">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
            {t.kicker} · {t.everyone}
          </p>
          <div className="kai-orb mt-6" />
          <h1 className="mt-6 font-display text-[clamp(2.1rem,5vw,3.4rem)] leading-[1.12] tracking-[-0.03em] text-fg">
            {t.heroTitle}
          </h1>
          <p className="mt-4 max-w-[42ch] text-base text-muted sm:text-lg">{t.heroBody}</p>

          <ol className="mt-10 space-y-4">
            <li className="rounded-[var(--radius-lg)] border border-border bg-elevated p-4">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-subtle">01</p>
              <p className="mt-1 font-medium text-fg">{t.step1}</p>
              <p className="mt-1 text-sm text-muted">{t.step1d}</p>
            </li>
            <li className="rounded-[var(--radius-lg)] border border-border bg-elevated p-4">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-subtle">02</p>
              <p className="mt-1 font-medium text-fg">{t.step2}</p>
              <p className="mt-1 text-sm text-muted">{t.step2d}</p>
            </li>
            <li className="rounded-[var(--radius-lg)] border border-border bg-elevated p-4">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-subtle">03</p>
              <p className="mt-1 font-medium text-fg">{t.step3}</p>
              <p className="mt-1 text-sm text-muted">{t.step3d}</p>
            </li>
          </ol>
        </div>

        <div className="lg:sticky lg:top-20">
          <BuyPanel lang={lang} />
        </div>
      </main>

      <section id="turlar" className="border-t border-border py-14">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="font-display text-3xl text-fg">{t.rounds}</h2>
          <p className="mt-2 max-w-[60ch] text-muted">{t.roundsLead}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {ROUNDS.map((r) => (
              <article
                key={r.n}
                className="rounded-[var(--radius-lg)] border border-border bg-elevated p-5"
              >
                <p className="text-xs uppercase tracking-[0.14em] text-subtle">
                  {lang === "tr" ? `Tur ${r.n}` : `Round ${r.n}`}
                </p>
                <p className="mt-2 font-display text-2xl text-accent">
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
            {t.supply} · {lang === "tr" ? "Satılabilir ön satış" : "Sellable presale"}{" "}
            {formatInt(SELLABLE_PRESALE, locale)} KAI
          </p>
          <div className="mt-6 overflow-hidden rounded-[var(--radius-lg)] border border-border">
            <table className="w-full text-left text-sm">
              <tbody>
                {ALLOCATION.map((row) => (
                  <tr key={row.key} className="border-t border-border first:border-t-0">
                    <th className="bg-elevated px-4 py-3 font-medium text-fg">
                      {lang === "tr" ? row.tr : row.en}
                    </th>
                    <td className="px-4 py-3 font-mono text-muted">
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
          <h2 className="font-display text-3xl text-fg">{t.contracts}</h2>
          <ul className="mt-4 space-y-2 font-mono text-xs text-muted sm:text-sm">
            <li>
              Presale {shortAddr(PRESALE)}
            </li>
            <li>
              KAI {shortAddr(KAI_TOKEN)}
            </li>
            <li>
              USDG {shortAddr(USDG)}
            </li>
          </ul>
        </div>
      </section>

      <SiteFooter lang={lang} />
    </div>
  );
}
