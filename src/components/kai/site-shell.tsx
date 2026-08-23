import { copy, type Lang } from "@/lib/kai/copy";
import { Button } from "@/components/ui/button";

export function SiteHeader({
  lang,
  onToggleLang,
}: {
  lang: Lang;
  onToggleLang: () => void;
}) {
  const t = copy[lang];
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 px-4">
        <a href="#top" className="flex items-center gap-2">
          <span className="kai-orb-sm" />
          <span className="font-display text-lg tracking-tight text-fg">{t.brand}</span>
        </a>
        <nav className="hidden items-center gap-5 text-sm text-muted sm:flex">
          <a href="#al" className="hover:text-fg">
            {t.buyCta}
          </a>
          <a href="#turlar" className="hover:text-fg">
            {t.rounds}
          </a>
          <a href="#tokenomi" className="hover:text-fg">
            {t.tokenomics}
          </a>
          <a href="https://kindredhq.io" className="hover:text-fg">
            {t.product}
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onToggleLang}>
            {t.lang}
          </Button>
          <Button size="sm" asChild>
            <a href="#al">{t.buyCta}</a>
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
        <p>{t.brand}</p>
        <a href="https://kindredhq.io" className="hover:text-fg">
          kindredhq.io
        </a>
      </div>
    </footer>
  );
}
