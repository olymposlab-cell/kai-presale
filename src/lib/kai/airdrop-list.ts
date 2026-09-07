import { getAddress, type Address, type Hex } from "viem";
import { airdropLeaf, merkleProof, merkleRoot } from "./airdrop-merkle";

/** Whole KAI, not wei. Community bucket cap is 80,901,699. */
export type AirdropRow = { wallet: Address; kai: bigint };

export const AIRDROP_RECIPIENTS: AirdropRow[] = [
  // Add { wallet: "0x…", kai: 1000n } then push. Root updates on the site;
  // treasury must call setRoot on the airdrop contract with AIRDROP_ROOT.
];

function sortedLeaves() {
  const rows = AIRDROP_RECIPIENTS.map((r) => ({
    wallet: getAddress(r.wallet),
    kai: r.kai,
    amountWei: r.kai * 10n ** 18n,
  })).sort((a, b) => (a.wallet.toLowerCase() < b.wallet.toLowerCase() ? -1 : 1));
  const leaves = rows.map((r) => airdropLeaf(r.wallet, r.amountWei));
  return { rows, leaves };
}

export function airdropRoot(): Hex {
  return merkleRoot(sortedLeaves().leaves);
}

export function airdropFor(wallet: string): { amountWei: bigint; kai: bigint; proof: Hex[] } | null {
  if (!wallet) return null;
  let addr: Address;
  try {
    addr = getAddress(wallet);
  } catch {
    return null;
  }
  const { rows, leaves } = sortedLeaves();
  const index = rows.findIndex((r) => r.wallet === addr);
  if (index < 0) return null;
  return {
    amountWei: rows[index].amountWei,
    kai: rows[index].kai,
    proof: merkleProof(leaves, index),
  };
}
