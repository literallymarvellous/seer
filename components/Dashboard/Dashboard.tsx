import React, { useEffect } from "react";
import { useRenders } from "../../hooks/useRenders";
import {
  getNFTs,
  getTokenBalanceAL,
  getTokenInfo,
  getTransactionHistory,
} from "../../utils/alchemy";
import { getEthBalance, getTokenB } from "../../utils/ethersFuncs";

type DashboardProps = {
  address: string;
};

export const Dashboard = ({ address }: DashboardProps) => {
  useRenders("dashboard");

  useEffect(() => {
    // getResolver();
    // getAvatar();
    // getNFTs(address);
    // getTokenBalance(address);
    // getEthBalance(address);
    // getTransactionHistory(address);
    // getTokenBalances(address);
    getTokenInfo(address);
    // getTokenBalanceAL(address);
    // getTokenB(address);
  }, [address]);

  return (
    <div>
      <div>{address}</div>
    </div>
  );
};
