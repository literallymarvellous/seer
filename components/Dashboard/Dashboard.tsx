import {
  GetNftMetadataResponse,
  TokenBalance,
  TokenMetadataResponse,
} from "@alch/alchemy-web3";
import React, { useEffect, useState } from "react";
import { useRenders } from "../../hooks/useRenders";
import { getAllMetaData, getNFTs, getTokenBalances } from "../../utils/alchemy";
import { getEthBalance } from "../../utils/ethersFuncs";

type DashboardProps = {
  address: string;
};

export const Dashboard = ({ address }: DashboardProps) => {
  const [nfts, setNFTs] = useState<GetNftMetadataResponse>([]);
  const [tokenBalances, setTokenBalances] = useState<TokenBalance[]>([]);
  const [metadata, setMetadata] = useState<
    (TokenMetadataResponse | undefined)[]
  >([]);

  useEffect(() => {
    getNFTs(address).then((res) => setNFTs((p) => [...res]));
    getTokenBalances(address).then((res) => setTokenBalances(res));
    getAllMetaData(address).then((res) => setMetadata(res));
  }, [address]);

  return (
    <div>
      <div>{address}</div>
    </div>
  );
};
