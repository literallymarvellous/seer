import {
  AssetTransfersCategory,
  createAlchemyWeb3,
  TokenBalancesResponse,
  TokenMetadataResponse,
} from "@alch/alchemy-web3";
import { getAddressFromEns } from "./ethersFuncs";

const web3 = createAlchemyWeb3(
  `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY}`
);

/**
 * Get nfts owned by an address
 * @param address - 20 byte address or ens name
 */
export const getNFTs = async (address: string) => {
  const res = await web3.alchemy.getNfts({
    owner: address,
    // pageKey: "474fd443-8f83-4d0a-b8e0-3ab7ec965cd9",
  });
  return res.ownedNfts;
};

export const getTransactionHistory = async (nameOrAddress: string) => {
  const address = await getAddressFromEns(nameOrAddress);

  if (address) {
    const txs = await web3.alchemy.getAssetTransfers({
      fromBlock: "0x0",
      toBlock: "latest",
      category: [AssetTransfersCategory.ERC20],
      fromAddress: address,
    });
    let tokenList: string[] = [];
    txs.transfers.map((tx) => {
      if (
        tx.rawContract.address &&
        !tokenList.includes(tx.rawContract.address)
      ) {
        tokenList.push(tx.rawContract.address);
      }
    });
    return tokenList;
  }
};

export const getTokenMetadata = async (address: string) => {
  const tokenMetadata = await web3.alchemy.getTokenMetadata(address);
  return tokenMetadata;
};

export const getTokenMetaDatas = async (tokenList: string[]) => {
  let metadataList: (TokenMetadataResponse | undefined)[] = [];
  tokenList.forEach(async (token) => {
    const meta = await getTokenMetadata(token);
    metadataList.push(meta);
  });
  return metadataList;
};

export const getTokenBalanceAL = async (
  address: string,
  tokenList: string[]
) => {
  const addr = await getAddressFromEns(address);
  if (addr) {
    let raw = JSON.stringify({
      jsonrpc: "2.0",
      method: "alchemy_getTokenBalances",
      headers: {
        "Content-Type": "application/json",
      },
      params: [addr, tokenList],
      id: 42,
    });

    let requestOptions: RequestInit = {
      method: "POST",
      body: raw,
      redirect: "follow",
    };

    const res = await fetch(
      `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY}`,
      requestOptions
    );
    const data = await res.json();
    return data;
  }
};

export const getTokenBalances = async (address: string) => {
  const tokenList = (await getTransactionHistory(address)) as string[];
  const addr = await getAddressFromEns(address);
  if (addr && tokenList.length > 0) {
    const balances = await getTokenBalanceAL(addr, tokenList);
    return balances.result.tokenBalances;
  }
};

export const getAllMetaData = async (address: string) => {
  const tokenList = (await getTransactionHistory(address)) as string[];
  const metadatas = await getTokenMetaDatas(tokenList);
  return metadatas;
};
