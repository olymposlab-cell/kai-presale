import { copy, LANGS, type Lang } from "@/lib/kai/copy";
import { proofs } from "@/lib/kai/whitepaper";
import { Button } from "@/components/ui/button";

export function SiteHeader({
  lang,
  onLang,
}: {
  lang: Lang;
  onLang: (l: Lang) => void;
}) {
  const t = copy[lang];
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-bg/85 backdrop-blur-md">
      <div className="border-b border-border bg-surface/60">
        <div className="mx-auto flex h-8 max-w-5xl items-center justify-between px-4 text-[11px] tracking-[0.08em] text-subtle">
          <span className="text-accent">{t.chainBadge}</span>
          <span className="hidden sm:inline">{t.footerChain}</span>
        </div>
      </div>
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 px-4">
        <a href="/" className="flex shrink-0 items-center gap-2">
          <span className="kai-orb-sm" />
          <span className="font-display text-lg tracking-tight text-fg">{t.brand}</span>
        </a>
        <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
          <a href="/whitepaper" className="hover:text-fg">
            {t.wpNav}
          </a>
          <a href="/vesting" className="whitespace-nowrap hover:text-fg">
            {t.vestNav}
          </a>
          <a href="/#kanit" className="hover:text-fg">
            {proofs[lang].nav}
          </a>
          <a href="https://kindredhq.io" className="hover:text-fg">
            {t.product}
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <label className="sr-only" htmlFor="kai-lang">
            Language
          </label>
          <select
            id="kai-lang"
            value={lang}
            onChange={(e) => onLang(e.target.value as Lang)}
            className="h-9 max-w-[8.5rem] rounded-[var(--radius-xs)] border border-border bg-surface px-2 text-xs text-fg outline-none ring-ring focus:ring-2"
          >
            {LANGS.map((l) => (
              <option key={l.id} value={l.id}>
                {l.native}
              </option>
            ))}
          </select>
          <Button size="sm" asChild>
            <a href="/#al">{t.buyCta}</a>
          </Button>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return (
    <footer className="border-t border-border py-10 text-sm text-muted">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 sm:flex-row sm:items-center sm:justify-between">
        <p>
          {t.brand} · {t.footerChain}
        </p>
        <p className="flex flex-wrap gap-4">
          <a className="hover:text-fg" href="/whitepaper">
            {t.wpNav}
          </a>
          <a className="hover:text-fg" href="/vesting">
            {t.vestNav}
          </a>
          <a className="hover:text-fg" href="/#kanit">
            {t.tokenomics}
          </a>
          <a className="hover:text-fg" href="https://kindredhq.io">
            {t.product}
          </a>
        </p>
      </div>
    </footer>
  );
}
