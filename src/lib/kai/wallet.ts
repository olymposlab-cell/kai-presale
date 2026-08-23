import {
  createPublicClient,
  createWalletClient,
  custom,
  formatUnits,
  http,
  parseUnits,
  type Address,
  type Chain,
  type Hex,
} from "viem";
import {
  ERC20_ABI,
  KAI_TOKEN,
  PRESALE,
  PRESALE_ABI,
  ROBINHOOD_CHAIN_ID,
  USDG,
  robinhood,
} from "./chain";
import { WALLET_CAP_WEI } from "./economics";

export type EthereumProvider = {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on?: (ev: string, cb: (...a: unknown[]) => void) => void;
  removeListener?: (ev: string, cb: (...a: unknown[]) => void) => void;
};

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

let injectedOrWc: EthereumProvider | undefined;

export function getEthereum(): EthereumProvider | undefined {
  if (typeof window === "undefined") return undefined;
  if (window.ethereum) return window.ethereum;
  return injectedOrWc;
}

export function usingWalletConnect() {
  return Boolean(injectedOrWc) && !window.ethereum;
}

export function setEthereumProvider(p: EthereumProvider | undefined) {
  injectedOrWc = p;
}

/** wagmi docs sample — replace with Reown cloud ID if QR is rate-limited. */
export const WC_PROJECT_ID =
  (import.meta.env.VITE_WALLETCONNECT_PROJECT_ID as string | undefined)?.trim() ||
  "34252b5566c3046e99050e52a9a4c7e9";

export async function connectWalletConnect(): Promise<Address> {
  const { EthereumProvider } = await import("@walletconnect/ethereum-provider");
  const existing = injectedOrWc as { disconnect?: () => Promise<void> } | undefined;
  if (existing?.disconnect) {
    try {
      await existing.disconnect();
    } catch {
      /* ignore */
    }
  }
  const provider = await EthereumProvider.init({
    projectId: WC_PROJECT_ID,
    chains: [1],
    optionalChains: [1, ROBINHOOD_CHAIN_ID],
    rpcMap: {
      1: "https://ethereum-rpc.publicnode.com",
      [ROBINHOOD_CHAIN_ID]: "https://rpc.mainnet.chain.robinhood.com",
    },
    showQrModal: true,
    methods: [
      "eth_sendTransaction",
      "personal_sign",
      "eth_signTypedData_v4",
      "wallet_switchEthereumChain",
      "wallet_addEthereumChain",
    ],
    events: ["chainChanged", "accountsChanged"],
    qrModalOptions: {
      themeMode: "dark",
      enableExplorer: true,
      explorerRecommendedWalletIds: [
        "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",
        "4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0",
        "1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369",
      ],
    },
    metadata: {
      name: "KindredHQ KAI",
      description: "KAI presale on Robinhood Chain",
      url: typeof window !== "undefined" ? window.location.origin : "https://presale.kindredhq.io",
      icons: ["https://presale.kindredhq.io/favicon.svg"],
    },
  });
  const connected = provider.connect();
  const timed = new Promise<never>((_, reject) => {
    window.setTimeout(() => reject(new Error("TIMEOUT")), 90_000);
  });
  await Promise.race([connected, timed]);
  injectedOrWc = provider as unknown as EthereumProvider;
  let accs = provider.accounts as string[] | undefined;
  if (!accs?.length) {
    accs = (await provider.request({ method: "eth_requestAccounts" })) as string[];
  }
  if (!accs?.[0]) throw new Error("NO_ACCOUNT");
  try {
    await switchRobinhood(provider as unknown as EthereumProvider);
  } catch {
    /* MetaMask will be asked again on approve/buy */
  }
  return accs[0] as Address;
}

export const publicClient = createPublicClient({
  chain: robinhood,
  transport: http("https://rpc.mainnet.chain.robinhood.com"),
});

export async function connectWallet(): Promise<Address> {
  const eth = getEthereum();
  if (!eth) throw new Error("NO_WALLET");
  const accs = (await eth.request({ method: "eth_requestAccounts" })) as string[];
  if (!accs?.[0]) throw new Error("NO_ACCOUNT");
  await ensureChain(eth);
  return accs[0] as Address;
}

export async function readWalletChain(eth: EthereumProvider) {
  const id = (await eth.request({ method: "eth_chainId" })) as string;
  return Number.parseInt(id, 16);
}

export async function ensureChainId(
  eth: EthereumProvider,
  chainId: number,
  meta: {
    chainId: Hex;
    chainName: string;
    rpcUrls: string[];
    nativeCurrency: { name: string; symbol: string; decimals: number };
    blockExplorerUrls?: string[];
  },
) {
  const id = (await eth.request({ method: "eth_chainId" })) as string;
  if (Number.parseInt(id, 16) === chainId) return;
  try {
    await eth.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: meta.chainId }],
    });
  } catch (err) {
    const e = err as { code?: number; message?: string };
    if (e.code === 4902 || /unrecognized|not added|unknown/i.test(e.message ?? "")) {
      await eth.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: meta.chainId,
            chainName: meta.chainName,
            rpcUrls: meta.rpcUrls,
            nativeCurrency: meta.nativeCurrency,
            blockExplorerUrls: meta.blockExplorerUrls ?? ["https://robinhoodchain.blockscout.com"],
          },
        ],
      });
      await eth.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: meta.chainId }],
      });
    } else {
      throw err;
    }
  }
}

export async function ensureChain(eth: EthereumProvider) {
  await ensureChainId(eth, ROBINHOOD_CHAIN_ID, {
    chainId: "0x1237",
    chainName: "Robinhood Chain",
    rpcUrls: ["https://rpc.mainnet.chain.robinhood.com"],
    nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
    blockExplorerUrls: ["https://robinhoodchain.blockscout.com"],
  });
}

/** WalletConnect sessions start on Ethereum; force Robinhood before any send. */
export async function switchRobinhood(eth: EthereumProvider) {
  const wc = eth as EthereumProvider & { setDefaultChain?: (id: string) => void };
  try {
    await ensureChain(eth);
  } catch {
    /* still try setDefaultChain */
  }
  wc.setDefaultChain?.(`eip155:${ROBINHOOD_CHAIN_ID}`);
  const id = await readWalletChain(eth);
  if (id !== ROBINHOOD_CHAIN_ID) throw new Error("WRONG_CHAIN");
}

export function walletClient(eth: EthereumProvider, account: Address, chain: Chain = robinhood) {
  return createWalletClient({
    account,
    chain,
    transport: custom(eth),
  });
}

export async function readTokenSupply() {
  return publicClient.readContract({
    address: KAI_TOKEN,
    abi: ERC20_ABI,
    functionName: "totalSupply",
  });
}

export async function readTokenHasNoOwner() {
  try {
    await publicClient.call({ to: KAI_TOKEN, data: "0x8da5cb5b" as Hex });
    return false;
  } catch {
    return true;
  }
}

export async function readSaleOpened() {
  try {
    return await publicClient.readContract({
      address: PRESALE,
      abi: PRESALE_ABI,
      functionName: "saleOpened",
    });
  } catch {
    return null;
  }
}

export async function readSaleClosed() {
  try {
    return await publicClient.readContract({
      address: PRESALE,
      abi: PRESALE_ABI,
      functionName: "saleClosed",
    });
  } catch {
    return null;
  }
}

export async function readQuote(kaiWei: bigint) {
  return publicClient.readContract({
    address: PRESALE,
    abi: PRESALE_ABI,
    functionName: "quote",
    args: [kaiWei],
  });
}

export async function readUsdg(address: Address) {
  const [bal, allowance] = await Promise.all([
    publicClient.readContract({
      address: USDG,
      abi: ERC20_ABI,
      functionName: "balanceOf",
      args: [address],
    }),
    publicClient.readContract({
      address: USDG,
      abi: ERC20_ABI,
      functionName: "allowance",
      args: [address, PRESALE],
    }),
  ]);
  return { bal, allowance };
}

export async function readPurchased(address: Address) {
  return publicClient.readContract({
    address: PRESALE,
    abi: PRESALE_ABI,
    functionName: "purchasedByWallet",
    args: [address],
  });
}

export async function approveUsdg(eth: EthereumProvider, account: Address, amount: bigint) {
  await switchRobinhood(eth);
  const wc = walletClient(eth, account);
  const hash = await wc.writeContract({
    address: USDG,
    abi: ERC20_ABI,
    functionName: "approve",
    args: [PRESALE, amount],
    account,
    chain: robinhood,
  });
  await publicClient.waitForTransactionReceipt({ hash });
  return hash;
}

export async function buyKai(
  eth: EthereumProvider,
  account: Address,
  kaiWei: bigint,
  maxPayment: bigint,
) {
  await switchRobinhood(eth);
  const wc = walletClient(eth, account);
  const hash = await wc.writeContract({
    address: PRESALE,
    abi: PRESALE_ABI,
    functionName: "purchaseExactKAI",
    args: [kaiWei, maxPayment, WALLET_CAP_WEI, "0x" as Hex],
    account,
    chain: robinhood,
  });
  await publicClient.waitForTransactionReceipt({ hash });
  return hash;
}

export function kaiToWei(whole: bigint) {
  return parseUnits(whole.toString(), 18);
}

export function fmtToken(wei: bigint, decimals = 18, digits = 2) {
  const n = Number(formatUnits(wei, decimals));
  return n.toLocaleString(undefined, { maximumFractionDigits: digits });
}

export function fmtUsdg(micro: bigint) {
  const n = Number(formatUnits(micro, 6));
  return n.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
