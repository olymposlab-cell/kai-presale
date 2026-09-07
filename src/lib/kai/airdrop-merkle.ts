import { concat, encodeAbiParameters, keccak256, type Address, type Hex } from "viem";

export function airdropLeaf(wallet: Address, amountWei: bigint): Hex {
  const inner = keccak256(
    encodeAbiParameters(
      [
        { type: "address" },
        { type: "uint256" },
      ],
      [wallet, amountWei],
    ),
  );
  return keccak256(inner);
}

function hashPair(a: Hex, b: Hex): Hex {
  return BigInt(a) < BigInt(b) ? keccak256(concat([a, b])) : keccak256(concat([b, a]));
}

export function merkleRoot(leaves: Hex[]): Hex {
  if (leaves.length === 0) return `0x${"00".repeat(32)}`;
  let layer = [...leaves];
  while (layer.length > 1) {
    const next: Hex[] = [];
    for (let i = 0; i < layer.length; i += 2) {
      if (i + 1 === layer.length) next.push(layer[i]);
      else next.push(hashPair(layer[i], layer[i + 1]));
    }
    layer = next;
  }
  return layer[0];
}

export function merkleProof(leaves: Hex[], index: number): Hex[] {
  const proof: Hex[] = [];
  let layer = [...leaves];
  let i = index;
  while (layer.length > 1) {
    const isRight = i % 2 === 1;
    const pair = isRight ? i - 1 : i + 1;
    if (pair < layer.length) proof.push(layer[pair]);
    const next: Hex[] = [];
    for (let k = 0; k < layer.length; k += 2) {
      if (k + 1 === layer.length) next.push(layer[k]);
      else next.push(hashPair(layer[k], layer[k + 1]));
    }
    layer = next;
    i = Math.floor(i / 2);
  }
  return proof;
}
