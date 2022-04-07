import { AssetTransfersCategory, createAlchemyWeb3 } from "@alch/alchemy-web3";
import { getAddressFromEns, getTokenB } from "./ethersFuncs";

interface TransactionList {
  [key: string]: TokenInfo;
}

interface TokenInfo {
  asset: string | null;
  address: string | null;
  decimals: string | null;
}

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
  const nfts = await res;
  console.log(nfts);
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
  if (address) {
    const tokenMetadata = await web3.alchemy.getTokenMetadata(
      "0xdac17f958d2ee523a2206206994597c13d831ec7"
    );
    console.log(tokenMetadata);
    return tokenMetadata;
  }
};

export const getTokenBalanceAL = async (
  address: string,
  tokenList: string[]
) => {
  const addr = await getAddressFromEns(address);
  console.log("addr-al:", addr);
  console.log("token", tokenList);
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
    console.log(data.result);
    // const bal = data.result.tokenBalances[0].tokenBalance;
    // let balance = ethers.BigNumber.from(bal).toString();
    // console.log("Balance", balance);
    // return data;
  }
};

export const getTokenInfo = async (address: string) => {
  const tokenList = (await getTransactionHistory(address)) as string[];
  const addr = (await getAddressFromEns(address)) as string;
  if (addr) {
    // const balances = await getTokenBalances(addr, tokenList);
    // console.log(balances);
    const balances = await getTokenBalanceAL(addr, tokenList);
  }
};
