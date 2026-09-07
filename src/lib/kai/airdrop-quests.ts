export type QuestId = "x" | "app" | "paper" | "buy";

export type Quest = {
  id: QuestId;
  pts: number;
  href: string;
  verify: "attest" | "chain";
};

export const QUESTS: Quest[] = [
  { id: "x", pts: 20, href: "https://x.com/KindredHQ_io", verify: "attest" },
  { id: "app", pts: 50, href: "https://kindredhq.io", verify: "attest" },
  { id: "paper", pts: 10, href: "/whitepaper", verify: "attest" },
  { id: "buy", pts: 40, href: "/#al", verify: "chain" },
];

export const QUEST_MAX = QUESTS.reduce((s, q) => s + q.pts, 0);

const key = (wallet: string) => `kai-airdrop-q:${wallet.toLowerCase()}`;

export function loadAttested(wallet: string): QuestId[] {
  try {
    const raw = localStorage.getItem(key(wallet));
    const parsed = raw ? (JSON.parse(raw) as string[]) : [];
    return parsed.filter((id): id is QuestId => QUESTS.some((q) => q.id === id && q.verify === "attest"));
  } catch {
    return [];
  }
}

export function saveAttested(wallet: string, ids: QuestId[]) {
  localStorage.setItem(key(wallet), JSON.stringify([...new Set(ids)]));
}
