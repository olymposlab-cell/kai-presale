import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteFooter, SiteHeader } from "@/components/kai/site-shell";
import { VestingPanel } from "@/components/kai/vesting-panel";
import { copy, detectLang, type Lang } from "@/lib/kai/copy";

export const Route = createFileRoute("/vesting")({ component: VestingPage });

function VestingPage() {
  const [lang, setLang] = useState<Lang>("en");
  const t = copy[lang];

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
      <main className="mx-auto max-w-xl px-4 py-12">
        <VestingPanel lang={lang} />
        <p className="mt-6 text-center text-sm text-muted">
          <a href="/#al" className="text-accent hover:underline">
            {t.buyCta} →
          </a>
        </p>
      </main>
      <SiteFooter lang={lang} />
    </div>
  );
}
