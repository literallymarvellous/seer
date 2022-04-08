import { ethers } from "ethers";

const etherscanProvider = new ethers.providers.EtherscanProvider(
  "homestead",
  process.env.NEXT_PUBLIC_ETHERSCAN
);

/**
 * Resolves an ENS name to an address
 * @param name ens name
 * @returns resolved address
 */
export const getResolver = async (name: string) => {
  try {
    const resolver = await etherscanProvider.getResolver(name);
    return resolver;
  } catch (e) {
    return null;
  }
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
};

export const hextoBigNumber = (hex: string) => {
  let num = ethers.BigNumber.from(hex).toString();
  return num;
};
