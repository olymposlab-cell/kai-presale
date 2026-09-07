import { defineChain, type Abi } from "viem";

export const ROBINHOOD_CHAIN_ID = 4663;

export const robinhood = defineChain({
  id: ROBINHOOD_CHAIN_ID,
  name: "Robinhood Chain",
  nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.mainnet.chain.robinhood.com"] },
  },
});

export const PRESALE = "0xA42e7A60Ad3F9dCbCb7F903055249Df01920f81B" as const;
export const KAI_TOKEN = "0x6e4083dA6dcc81CCd229BfA123Be785db9Dd40FA" as const;
export const USDG = "0x5fc5360D0400a0Fd4f2af552ADD042D716F1d168" as const;
export const TREASURY = "0x5039eDfA2AC9f7D075f38395936634829e9cf8ce" as const;
export const VESTING = "0x089fA287b118f5F9522eA664972FAac267bF2c47" as const;
/** Set after Safe deploys contracts/KaiAirdrop.sol (owner = TREASURY). */
export const AIRDROP = "0x58f7A9f9120eE04AF4283a29E645084388808108" as const;
export const AIRDROP_LIVE = AIRDROP !== "0x0000000000000000000000000000000000000000";

export const PRESALE_ABI = [
  {
    type: "function",
    name: "quote",
    stateMutability: "view",
    inputs: [{ name: "kaiAmount", type: "uint256" }],
    outputs: [{ name: "payment", type: "uint256" }],
  },
  {
    type: "function",
    name: "saleOpened",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "bool" }],
  },
  {
    type: "function",
    name: "saleClosed",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "bool" }],
  },
  {
    type: "function",
    name: "totalSold",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256" }],
  },
  {
    type: "function",
    name: "purchasedByWallet",
    stateMutability: "view",
    inputs: [{ type: "address" }],
    outputs: [{ type: "uint256" }],
  },
  {
    type: "function",
    name: "purchaseExactKAI",
    stateMutability: "nonpayable",
    inputs: [
      { name: "kaiAmount", type: "uint256" },
      { name: "maxPayment", type: "uint256" },
      { name: "maxAllocation", type: "uint256" },
      { name: "proof", type: "bytes" },
    ],
    outputs: [],
  },
] as const satisfies Abi;

export const VESTING_ABI = [
  { type: "function", name: "tgeActivated", stateMutability: "view", inputs: [], outputs: [{ type: "bool" }] },
  { type: "function", name: "tgeTimestamp", stateMutability: "view", inputs: [], outputs: [{ type: "uint64" }] },
  {
    type: "function",
    name: "claimed",
    stateMutability: "view",
    inputs: [{ type: "address" }],
    outputs: [{ type: "uint256" }],
  },
  {
    type: "function",
    name: "claimable",
    stateMutability: "view",
    inputs: [{ type: "address" }],
    outputs: [{ type: "uint256" }],
  },
  {
    type: "function",
    name: "vestedAmount",
    stateMutability: "view",
    inputs: [
      { type: "address" },
      { type: "uint256" },
    ],
    outputs: [{ type: "uint256" }],
  },
  { type: "function", name: "claim", stateMutability: "nonpayable", inputs: [], outputs: [] },
] as const satisfies Abi;

export const AIRDROP_ABI = [
  { type: "function", name: "root", stateMutability: "view", inputs: [], outputs: [{ type: "bytes32" }] },
  {
    type: "function",
    name: "claimed",
    stateMutability: "view",
    inputs: [{ type: "address" }],
    outputs: [{ type: "bool" }],
  },
  {
    type: "function",
    name: "claim",
    stateMutability: "nonpayable",
    inputs: [
      { name: "amount", type: "uint256" },
      { name: "proof", type: "bytes32[]" },
    ],
    outputs: [],
  },
] as const satisfies Abi;

export const ERC20_ABI = [
  {
    type: "function",
    name: "balanceOf",
    stateMutability: "view",
    inputs: [{ type: "address" }],
    outputs: [{ type: "uint256" }],
  },
  {
    type: "function",
    name: "allowance",
    stateMutability: "view",
    inputs: [{ type: "address" }, { type: "address" }],
    outputs: [{ type: "uint256" }],
  },
  {
    type: "function",
    name: "approve",
    stateMutability: "nonpayable",
    inputs: [
      { type: "address", name: "spender" },
      { type: "uint256", name: "amount" },
    ],
    outputs: [{ type: "bool" }],
  },
  {
    type: "function",
    name: "decimals",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint8" }],
  },
  {
    type: "function",
    name: "totalSupply",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256" }],
  },
  {
    type: "function",
    name: "name",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "string" }],
  },
  {
    type: "function",
    name: "symbol",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "string" }],
  },
] as const satisfies Abi;

export function shortAddr(a: string) {
  return `${a.slice(0, 6)}…${a.slice(-4)}`;
}

export function explorerToken(addr: string) {
  return `https://explorer.mainnet.chain.robinhood.com/address/${addr}`;
}
