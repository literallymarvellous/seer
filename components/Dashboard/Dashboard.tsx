import { Nft, TokenBalance, TokenMetadataResponse } from "@alch/alchemy-web3";
import { useEffect, useState } from "react";
import { useRenders } from "../../hooks/useRenders";
import { getAllMetaData, getNFTs, getTokenBalances } from "../../utils/alchemy";
import { getEthBalance } from "../../utils/ethersFuncs";
import { NftGrid } from "../NftGrid";

type DashboardProps = {
  address: string;
};

export const Dashboard = ({ address }: DashboardProps) => {
  const [nfts, setNFTs] = useState<Nft[]>([]);
  const [tokenBalances, setTokenBalances] = useState<TokenBalance[]>([]);
  const [metadata, setMetadata] = useState<
    (TokenMetadataResponse | undefined)[]
  >([]);
  const [pageKey, setPageKey] = useState("");

  useEffect(() => {
    getNFTs(address).then((res) => {
      console.log(res);
      setNFTs((p) => [...res.ownedNfts]);
      if (res.pageKey) {
        setPageKey(res.pageKey);
      } else {
        setPageKey("");
      }
    });
    getTokenBalances(address).then((res) => setTokenBalances(res));
    getAllMetaData(address).then((res) => setMetadata(res));
  }, [address]);

  return (
    <div>
      {/* <NftGrid nfts={nfts} /> */}
      hey
    </div>
  );
};
