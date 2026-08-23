import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BuyPanel } from "@/components/kai/buy-panel";
import { SiteFooter, SiteHeader } from "@/components/kai/site-shell";
import { ALLOC_KEYS, copy, detectLang, localeOf, type Lang } from "@/lib/kai/copy";
import {
  ALLOCATION,
  KAI_SUPPLY,
  ROUNDS,
  SELLABLE_PRESALE,
  formatInt,
  priceUsd,
} from "@/lib/kai/economics";
import { KAI_TOKEN, PRESALE, USDG, explorerToken, shortAddr } from "@/lib/kai/chain";
import { proofs } from "@/lib/kai/whitepaper";
import { readTokenHasNoOwner, readTokenSupply } from "@/lib/kai/wallet";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const t = copy[lang];
  const locale = localeOf(lang);

  useEffect(() => {
    setLang(detectLang());
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  function onLang(next: Lang) {
    localStorage.setItem("kai-lang-user", next);
    setLang(next);
  }

  return (
    <div id="top" className="min-h-dvh">
      <SiteHeader lang={lang} onLang={onLang} />

      <main className="mx-auto grid max-w-5xl gap-10 px-4 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-12 lg:py-16">
        <div>
          <p className="inline-flex items-center rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[11px] font-medium text-accent">
            {t.chainBadge}
          </p>
          <p className="mt-4 text-xs font-medium uppercase tracking-[0.16em] text-subtle">
            {t.kicker} · {t.everyone}
          </p>
          <div className="kai-orb mt-6" />
          <h1 className="mt-6 font-display text-[clamp(2.15rem,5.2vw,3.55rem)] leading-[1.12] tracking-[-0.03em] text-fg">
            {t.heroTitle}
          </h1>
          <p className="mt-4 max-w-[38ch] font-display text-xl leading-snug text-fg">{t.heroTagline}</p>
          <p className="mt-4 max-w-[48ch] text-base leading-relaxed text-muted sm:text-lg">{t.heroBody}</p>
          <p className="mt-5 inline-flex items-center rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-accent">
            {t.utilBadge}
          </p>
          <p className="mt-3 max-w-[48ch] text-sm leading-relaxed text-muted">{t.utilBanner}</p>
          <p className="mt-2">
            <a href="/whitepaper" className="text-sm text-accent hover:underline">
              {t.wpNav} →
            </a>
          </p>

          <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[
              [t.kpiSupply, formatInt(KAI_SUPPLY, locale)],
              [t.kpiPresale, formatInt(SELLABLE_PRESALE, locale)],
              [t.kpiRounds, "4"],
              [t.kpiPrice, `$${priceUsd(ROUNDS[0].priceMicroUsd).toFixed(3)}`],
            ].map(([label, value]) => (
              <div key={label} className="kai-kpi min-w-0 overflow-hidden rounded-[var(--radius-md)] border border-border bg-elevated p-2.5 sm:p-3">
                <p className="kai-kpi-label text-subtle">{label}</p>
                <p className="mt-1.5 break-all font-mono text-xs tabular-nums text-fg sm:text-sm">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:sticky lg:top-24">
          <BuyPanel lang={lang} />
        </div>
      </main>

      <section id="genel" className="border-t border-border py-14">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="font-display text-3xl text-fg">{t.contrastTitle}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <article className="rounded-[var(--radius-lg)] border border-border bg-surface p-6">
              <p className="text-xs uppercase tracking-[0.14em] text-subtle">{t.contrastThemT}</p>
              <p className="mt-3 text-base leading-relaxed text-muted">{t.contrastThem}</p>
            </article>
            <article className="rounded-[var(--radius-lg)] border border-accent/35 bg-elevated p-6">
              <p className="text-xs uppercase tracking-[0.14em] text-accent">{t.contrastUsT}</p>
              <p className="mt-3 text-base leading-relaxed text-fg">{t.contrastUs}</p>
            </article>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              [t.whatHq, t.whatHqBody],
              [t.whatKai, t.whatKaiBody],
              [t.whyToken, t.whyTokenBody],
            ].map(([title, body]) => (
              <article key={title} className="rounded-[var(--radius-lg)] border border-border bg-elevated p-5">
                <h3 className="font-display text-xl text-fg">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="gelecek" className="border-t border-border py-14">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="font-display text-3xl text-fg">{t.futureTitle}</h2>
          <p className="mt-3 max-w-[62ch] text-base leading-relaxed text-muted">{t.futureLead}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              [t.futHealthT, t.futHealth],
              [t.futCareT, t.futCare],
              [t.futKaiT, t.futKai],
            ].map(([title, body]) => (
              <article key={title} className="rounded-[var(--radius-lg)] border border-border bg-elevated p-5">
                <h3 className="font-display text-xl text-fg">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="katil" className="border-t border-border py-14">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="font-display text-3xl text-fg">{t.whyJoinTitle}</h2>
          <p className="mt-3 max-w-[62ch] text-base leading-relaxed text-muted">{t.whyJoinLead}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              [t.join1T, t.join1],
              [t.join2T, t.join2],
              [t.join3T, t.join3],
            ].map(([title, body]) => (
              <article key={title} className="rounded-[var(--radius-lg)] border border-border bg-elevated p-5">
                <h3 className="font-medium text-fg">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
              </article>
            ))}
          </div>
          <a
            href="#al"
            className="mt-8 inline-flex h-12 items-center rounded-[var(--radius-md)] bg-accent px-6 text-sm font-medium text-accent-foreground"
          >
            {t.buyCta}
          </a>
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
                <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
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
                  {t.kpiRounds} {r.n}
                </p>
                <p className="mt-2 font-display text-2xl tabular-nums text-accent">
                  ${priceUsd(r.priceMicroUsd).toFixed(3)}
                </p>
                <p className="mt-1 font-mono text-sm text-muted">{formatInt(r.cap, locale)} KAI</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="tokenomi" className="border-t border-border py-14">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="font-display text-3xl text-fg">{t.tokenomics}</h2>
          <p className="mt-3 font-display text-2xl tabular-nums text-accent sm:text-3xl">
            {formatInt(KAI_SUPPLY, locale)} KAI
          </p>
          <p className="mt-2 max-w-[60ch] text-sm text-muted">{t.supplyLine}</p>
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

      <OnchainProofs lang={lang} locale={locale} />

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

function OnchainProofs({ lang, locale }: { lang: Lang; locale: string }) {
  const p = proofs[lang];
  const [supply, setSupply] = useState<bigint | null>(null);
  const [noOwner, setNoOwner] = useState<boolean | null>(null);

  useEffect(() => {
    let alive = true;
    void Promise.all([readTokenSupply(), readTokenHasNoOwner()]).then(([s, o]) => {
      if (!alive) return;
      setSupply(s);
      setNoOwner(o);
    });
    return () => {
      alive = false;
    };
  }, []);

  const supplyWhole = supply !== null ? supply / 10n ** 18n : null;
  const supplyOk = supplyWhole === KAI_SUPPLY;

  return (
    <section id="kanit" className="border-t border-border py-14">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="font-display text-3xl text-fg">{p.title}</h2>
        <p className="mt-3 max-w-[62ch] text-base leading-relaxed text-muted">{p.lead}</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <article className="rounded-[var(--radius-lg)] border border-border bg-elevated p-5">
            <p className="text-xs uppercase tracking-[0.12em] text-subtle">{p.liveSupply}</p>
            <p className="mt-2 font-mono text-lg tabular-nums text-fg">
              {supplyWhole === null ? "…" : `${formatInt(supplyWhole, locale)} KAI`}
            </p>
            <p className="mt-1 text-sm text-ok">{supplyOk ? "totalSupply() = 1 618 033 988" : ""}</p>
          </article>
          <article className="rounded-[var(--radius-lg)] border border-border bg-elevated p-5">
            <p className="text-xs uppercase tracking-[0.12em] text-subtle">{p.liveOwner}</p>
            <p className="mt-2 text-base text-fg">
              {noOwner === null ? "…" : noOwner ? p.liveOwnerNo : p.liveOwnerYes}
            </p>
          </article>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {p.items.map((item) => (
            <article key={item.t} className="rounded-[var(--radius-lg)] border border-border bg-elevated p-5">
              <h3 className="font-medium text-fg">{item.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.b}</p>
            </article>
          ))}
        </div>
        <article className="mt-4 rounded-[var(--radius-lg)] border border-accent/35 bg-elevated p-5">
          <h3 className="font-medium text-fg">{p.teamT}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{p.team}</p>
        </article>
        <p className="mt-6 text-sm text-subtle">{p.verify}</p>
        <ul className="mt-2 space-y-1 font-mono text-xs text-muted">
          <li>
            <a className="hover:text-fg" href={p.tokenLink}>
              KAI {shortAddr(KAI_TOKEN)}
            </a>
          </li>
          <li>
            <a className="hover:text-fg" href={p.saleLink}>
              Presale {shortAddr(PRESALE)}
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
