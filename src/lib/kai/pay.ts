import {
  createPublicClient,
  http,
  type Address,
  type Chain,
  type Hex,
} from "viem";
import { arbitrum, base, bsc, mainnet, polygon } from "viem/chains";
import { ERC20_ABI, ROBINHOOD_CHAIN_ID, USDG, robinhood } from "./chain";
import {
  type EthereumProvider,
  ensureChainId,
  walletClient,
} from "./wallet";

export type PayAsset = "USDG" | "ETH" | "USDT" | "USDC";

export const NATIVE = "0x0000000000000000000000000000000000000000" as const;

const USDT: Record<number, Address> = {
  1: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  56: "0x55d398326f99059fF775485246999027B3197955",
  137: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
  42161: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
  8453: "0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2",
};

const USDC: Record<number, Address> = {
  1: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  10: "0x0b2C639c533813f4Aa9D7836CAf62653d097Ff85",
  137: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
  42161: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
  8453: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
};

const RPC: Record<number, string> = {
  1: "https://cloudflare-eth.com",
  56: "https://bsc-dataseed.binance.org",
  137: "https://polygon-rpc.com",
  8453: "https://mainnet.base.org",
  42161: "https://arb1.arbitrum.io/rpc",
  [ROBINHOOD_CHAIN_ID]: "https://rpc.mainnet.chain.robinhood.com",
};

const CHAINS: Record<number, Chain> = {
  1: mainnet,
  56: bsc,
  137: polygon,
  8453: base,
  42161: arbitrum,
  [ROBINHOOD_CHAIN_ID]: robinhood,
};

export const CHAIN_META: Record<
  number,
  { chainId: Hex; chainName: string; rpcUrls: string[]; nativeCurrency: { name: string; symbol: string; decimals: number } }
> = {
  1: {
    chainId: "0x1",
    chainName: "Ethereum",
    rpcUrls: [RPC[1]],
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  },
  56: {
    chainId: "0x38",
    chainName: "BNB Smart Chain",
    rpcUrls: [RPC[56]],
    nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
  },
  137: {
    chainId: "0x89",
    chainName: "Polygon",
    rpcUrls: [RPC[137]],
    nativeCurrency: { name: "POL", symbol: "POL", decimals: 18 },
  },
  8453: {
    chainId: "0x2105",
    chainName: "Base",
    rpcUrls: [RPC[8453]],
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  },
  42161: {
    chainId: "0xa4b1",
    chainName: "Arbitrum One",
    rpcUrls: [RPC[42161]],
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  },
  [ROBINHOOD_CHAIN_ID]: {
    chainId: "0x1237",
    chainName: "Robinhood Chain",
    rpcUrls: [RPC[ROBINHOOD_CHAIN_ID]],
    nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
  },
};

export function chainFor(id: number): Chain {
  return CHAINS[id] ?? robinhood;
}

export function clientFor(id: number) {
  return createPublicClient({
    chain: chainFor(id),
    transport: http(RPC[id] ?? RPC[ROBINHOOD_CHAIN_ID]),
  });
}

export function resolveRoute(asset: PayAsset, walletChain: number) {
  if (asset === "USDG") {
    return { fromChain: ROBINHOOD_CHAIN_ID, fromToken: USDG as Address, decimals: 6 };
  }
  if (asset === "ETH") {
    return { fromChain: ROBINHOOD_CHAIN_ID, fromToken: NATIVE as Address, decimals: 18 };
  }
  const table = asset === "USDT" ? USDT : USDC;
  if (table[walletChain]) {
    return { fromChain: walletChain, fromToken: table[walletChain], decimals: 6 };
  }
  return { fromChain: 1, fromToken: table[1], decimals: 6 };
}

type LifiQuote = {
  estimate?: { toAmount?: string; fromAmount?: string; toAmountUSD?: string };
  action?: { fromAmount?: string };
  transactionRequest?: { to: Address; data: Hex; value?: string; chainId?: number };
};

export async function lifiQuote(args: {
  fromChain: number;
  fromToken: string;
  fromAmount: bigint;
  fromAddress: Address;
}): Promise<LifiQuote> {
  const q = new URLSearchParams({
    fromChain: String(args.fromChain),
    toChain: String(ROBINHOOD_CHAIN_ID),
    fromToken: args.fromToken,
    toToken: USDG,
    fromAmount: args.fromAmount.toString(),
    fromAddress: args.fromAddress,
  });
  const res = await fetch(`https://li.quest/v1/quote?${q}`);
  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { message?: string };
    throw new Error(body.message ?? "QUOTE_FAIL");
  }
  return (await res.json()) as LifiQuote;
}

export async function quoteCovering(args: {
  fromChain: number;
  fromToken: string;
  decimals: number;
  neededUsdg: bigint;
  fromAddress: Address;
}) {
  const probe =
    args.decimals === 18 ? 3_000_000_000_000_000n : 5_000_000n;
  const sample = await lifiQuote({
    fromChain: args.fromChain,
    fromToken: args.fromToken,
    fromAmount: probe,
    fromAddress: args.fromAddress,
  });
  const got = BigInt(sample.estimate?.toAmount ?? "0");
  if (got === 0n) throw new Error("QUOTE_FAIL");
  const fromAmount = (args.neededUsdg * probe * 112n) / (got * 100n);
  return lifiQuote({
    fromChain: args.fromChain,
    fromToken: args.fromToken,
    fromAmount: fromAmount === 0n ? probe : fromAmount,
    fromAddress: args.fromAddress,
  });
}

export async function readPayBalance(asset: PayAsset, address: Address, walletChain: number) {
  const route = resolveRoute(asset, walletChain);
  const client = clientFor(route.fromChain);
  if (route.fromToken === NATIVE) {
    return { ...route, bal: await client.getBalance({ address }) };
  }
  const bal = await client.readContract({
    address: route.fromToken,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: [address],
  });
  return { ...route, bal };
}

export async function sendLifiTx(
  eth: EthereumProvider,
  account: Address,
  quote: LifiQuote,
  fromChain: number,
) {
  const req = quote.transactionRequest;
  if (!req) throw new Error("NO_TX");
  const meta = CHAIN_META[fromChain];
  if (!meta) throw new Error("UNSUPPORTED_CHAIN");
  await ensureChainId(eth, fromChain, meta);
  const wc = walletClient(eth, account, chainFor(fromChain));
  const hash = await wc.sendTransaction({
    account,
    chain: chainFor(fromChain),
    to: req.to,
    data: req.data,
    value: BigInt(req.value ?? "0"),
  });
  const client = clientFor(fromChain);
  await client.waitForTransactionReceipt({ hash });
  return hash;
}

export async function waitBridge(txHash: string, fromChain: number) {
  if (fromChain === ROBINHOOD_CHAIN_ID) return;
  const started = Date.now();
  while (Date.now() - started < 180_000) {
    const q = new URLSearchParams({
      txHash,
      fromChain: String(fromChain),
      toChain: String(ROBINHOOD_CHAIN_ID),
    });
    const res = await fetch(`https://li.quest/v1/status?${q}`);
    if (res.ok) {
      const d = (await res.json()) as { status?: string };
      if (d.status === "DONE") return;
      if (d.status === "FAILED") throw new Error("BRIDGE_FAIL");
    }
    await new Promise((r) => setTimeout(r, 4000));
  }
  throw new Error("BRIDGE_TIMEOUT");
}
