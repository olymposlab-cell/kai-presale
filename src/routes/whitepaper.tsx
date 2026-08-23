import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteFooter, SiteHeader } from "@/components/kai/site-shell";
import { copy, detectLang, type Lang } from "@/lib/kai/copy";
import { whitepaper } from "@/lib/kai/whitepaper";

export const Route = createFileRoute("/whitepaper")({ component: WhitepaperPage });

function WhitepaperPage() {
  const [lang, setLang] = useState<Lang>("en");
  const t = copy[lang];
  const w = whitepaper[lang];

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
    <div className="min-h-dvh">
      <SiteHeader lang={lang} onLang={onLang} />
      <article className="mx-auto max-w-3xl px-4 py-12">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">{w.kicker}</p>
        <h1 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] text-fg">{w.title}</h1>
        <p className="mt-4 text-base leading-relaxed text-muted">{w.intro}</p>

        <section className="mt-10">
          <h2 className="font-display text-2xl text-fg">{w.utilT}</h2>
          <p className="mt-3 leading-relaxed text-muted">{w.util}</p>
        </section>
        <section className="mt-10 rounded-[var(--radius-lg)] border border-accent/35 bg-elevated p-5">
          <h2 className="font-display text-2xl text-fg">{w.notT}</h2>
          <p className="mt-3 leading-relaxed text-muted">{w.not}</p>
        </section>
        <section className="mt-10">
          <h2 className="font-display text-2xl text-fg">{w.useT}</h2>
          <ul className="mt-4 space-y-2 text-muted">
            {w.use.map((item) => (
              <li key={item} className="rounded-[var(--radius-md)] border border-border bg-surface px-4 py-3 text-sm">
                {item}
              </li>
            ))}
          </ul>
        </section>
        <section className="mt-10">
          <h2 className="font-display text-2xl text-fg">{w.productT}</h2>
          <p className="mt-3 leading-relaxed text-muted">{w.product}</p>
        </section>
        <section className="mt-10">
          <h2 className="font-display text-2xl text-fg">{w.chainT}</h2>
          <p className="mt-3 leading-relaxed text-muted">{w.chain}</p>
        </section>
        <section className="mt-10">
          <h2 className="font-display text-2xl text-fg">{w.tokT}</h2>
          <p className="mt-3 leading-relaxed text-muted">{w.tok}</p>
        </section>
        <section className="mt-10">
          <h2 className="font-display text-2xl text-fg">{w.futureT}</h2>
          <p className="mt-3 leading-relaxed text-muted">{w.future}</p>
        </section>
        <p className="mt-12 text-sm text-subtle">{w.close}</p>
        <p className="mt-8">
          <a href="/#al" className="inline-flex h-12 items-center rounded-[var(--radius-md)] bg-accent px-6 text-sm font-medium text-accent-foreground">
            {t.buyCta}
          </a>
        </p>
      </article>
      <SiteFooter lang={lang} />
    </div>
  );
}
