export const KAI_SUPPLY = 1_618_033_988n;
export const SELLABLE_PRESALE = 242_705_096n;
export const WALLET_CAP_KAI = 5_000_000n;
export const WALLET_CAP_WEI = WALLET_CAP_KAI * 10n ** 18n;
export const MIN_USD = 1;
export const PRESALE_TGE_PCT = 15;
export const PRESALE_VEST_MONTHS = 18;

export type Round = {
  n: number;
  cap: bigint;
  priceMicroUsd: bigint;
};

export const ROUNDS: Round[] = [
  { n: 1, cap: 48_541_019n, priceMicroUsd: 14_000n },
  { n: 2, cap: 48_541_019n, priceMicroUsd: 18_000n },
  { n: 3, cap: 64_721_359n, priceMicroUsd: 22_000n },
  { n: 4, cap: 80_901_699n, priceMicroUsd: 26_000n },
];

export type AllocKey =
  | "presale"
  | "eco"
  | "treasury"
  | "liquidity"
  | "marketing"
  | "team"
  | "community"
  | "advisors";

export const ALLOCATION: { key: AllocKey; bp: number; tr: string; en: string }[] = [
  { key: "presale", bp: 1500, tr: "Ön satış", en: "Presale" },
  { key: "eco", bp: 2800, tr: "Ekosistem ve Kai ödülleri", en: "Ecosystem & Kai rewards" },
  { key: "treasury", bp: 2000, tr: "Hazine / ürün", en: "Treasury / product" },
  { key: "liquidity", bp: 1500, tr: "Likidite", en: "Liquidity" },
  { key: "marketing", bp: 1000, tr: "Pazarlama", en: "Marketing" },
  { key: "team", bp: 500, tr: "Ekip", en: "Team" },
  { key: "community", bp: 500, tr: "Topluluk", en: "Community" },
  { key: "advisors", bp: 200, tr: "Danışmanlar", en: "Advisors" },
];

export function formatInt(n: bigint | number, locale: string) {
  return new Intl.NumberFormat(locale).format(typeof n === "bigint" ? Number(n) : n);
}

export function priceUsd(micro: bigint) {
  return Number(micro) / 1_000_000;
}

/** Local quote across rounds starting at sold=0 (display only). */
export function estimateUsdg(kaiWhole: bigint): bigint {
  let remaining = kaiWhole;
  let costMicro = 0n;
  for (const r of ROUNDS) {
    if (remaining <= 0n) break;
    const take = remaining > r.cap ? r.cap : remaining;
    costMicro += take * r.priceMicroUsd;
    remaining -= take;
  }
  return costMicro;
}

export function kaiFromUsd(usd: number, priceMicro: bigint): bigint {
  const micro = BigInt(Math.round(usd * 1_000_000));
  return micro / priceMicro;
}
