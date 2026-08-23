import type { Lang } from "./copy";

export type VestCopy = {
  title: string;
  lead: string;
  tgeWait: string;
  tgeOn: string;
  purchased: string;
  vested: string;
  claimed: string;
  claimable: string;
  next: string;
  claim: string;
  none: string;
  addToken: string;
  schedule: string;
  ok: string;
};

const en: VestCopy = {
  title: "Vesting",
  lead: "Presale KAI is claimed, not airdropped. 15% at TGE, the rest over 18 months of 30 days. Connect to see your schedule.",
  tgeWait: "TGE is not active. Nothing is claimable yet. Your purchase is recorded on-chain.",
  tgeOn: "TGE is active.",
  purchased: "Purchased",
  vested: "Unlocked",
  claimed: "Claimed",
  claimable: "Ready to claim",
  next: "Next unlock",
  claim: "Claim KAI",
  none: "Nothing to claim",
  addToken: "Add KAI to wallet",
  schedule: "15% at TGE · remaining 85% linear over 18 × 30 days",
  ok: "Claim confirmed",
};

export const vestCopy: Record<Lang, VestCopy> = {
  en,
  tr: {
    title: "Hak ediş",
    lead: "Ön satış KAI’si cüzdana otomatik gelmez; çekilir. TGE’de %15, kalan 18 × 30 günde doğrusal. Cüzdanı bağla, takvimi gör.",
    tgeWait: "TGE henüz açık değil. Çekim yok. Alımın zincirde kayıtlı.",
    tgeOn: "TGE açık.",
    purchased: "Satın alınan",
    vested: "Açılan",
    claimed: "Çekilen",
    claimable: "Çekilebilir",
    next: "Sonraki açılım",
    claim: "KAI çek",
    none: "Çekilecek miktar yok",
    addToken: "KAI’yi cüzdana ekle",
    schedule: "TGE’de %15 · kalan %85, 18 × 30 günde doğrusal",
    ok: "Çekim onaylandı",
  },
  de: { ...en, title: "Vesting", tgeWait: "TGE noch nicht aktiv. Kauf ist on-chain erfasst.", claim: "KAI abrufen" },
  es: { ...en, title: "Vesting", tgeWait: "TGE aún no activo. La compra está en cadena.", claim: "Reclamar KAI" },
  fr: { ...en, title: "Vesting", tgeWait: "TGE pas encore actif. L’achat est enregistré on-chain.", claim: "Réclamer KAI" },
  it: { ...en, title: "Vesting", tgeWait: "TGE non ancora attivo. L’acquisto è on-chain.", claim: "Riscuoti KAI" },
  pt: { ...en, title: "Vesting", tgeWait: "TGE ainda não ativo. A compra está on-chain.", claim: "Resgatar KAI" },
  ru: { ...en, title: "Вестинг", tgeWait: "TGE ещё не активен. Покупка записана в сети.", claim: "Забрать KAI" },
};
