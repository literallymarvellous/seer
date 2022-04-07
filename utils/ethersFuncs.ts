import { ethers } from "ethers";

const etherscanProvider = new ethers.providers.EtherscanProvider(
  "homestead",
  process.env.NEXT_PUBLIC_ETHERSCAN
);

const infuraProvider = new ethers.providers.InfuraProvider("homestead", {
  projectId: process.env.NEXT_PUBLIC_INFURA_ID,
  projectSecret: process.env.NEXT_PUBLIC_INFURA_SECRET,
});

/**
 * Resolves an ENS name to an address
 * @param name ens name
 * @returns resolved address
 */
export const getResolver = async (name: string) => {
  const resolver = await etherscanProvider.getResolver(name);
  return resolver;
};

/**
 * Get ens avatar
 * @param name ens name
 * @returns avatar of ens name
 */
export const getAvatar = async (name: string) => {
  const avatar = await etherscanProvider.getAvatar(name);
  return avatar;
};

/**
 * Get ens name from 20 byte address
 * @param address 20 byte address
 * @returns ens name
 */
export const getEnsFromAddress = async (address: string) => {
  const ens = await etherscanProvider.getAvatar(address);
  return ens;
};
/**
 * Get 20 byte address from enms name
 * @param name ens name
 * @returns 20 byte address
 */
export const getAddressFromEns = async (name: string) => {
  const addr = await etherscanProvider.resolveName(name);
  return addr;
};

/**
 * Get ether balance of an address
 * @param address 20 byte address or ens name
 */
export const getEthBalance = async (address: string) => {
  const res = await etherscanProvider.getBalance(address);
  console.log(ethers.utils.formatEther(res));
};

export const getTokenB = async (address: string, contractAddress?: string) => {
  const addr = await getAddressFromEns(address);
  let hash = ethers.utils.id("balanceOf(address)");
  hash = hash.slice(0, 10);
  console.log(addr);
  console.log(hash);
  if (addr) {
    try {
      const res = await infuraProvider.call({
        from: addr,
        to: "0xD5525D397898e5502075Ea5E830d8914f6F0affe",
        // to: contractAddress,
        data: hash,
      });
      console.log("BN", res);
      let num = ethers.BigNumber.from(res).toString();
      console.log(num);
      // return num;
    } catch (e) {
      console.log(e);
    }
  }
};

export const hextoBigNumber = (hex: string) => {
  let num = ethers.BigNumber.from(hex).toString();
  return num;
};
