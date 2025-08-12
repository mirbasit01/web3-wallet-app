// import random from "lodash/random";
import Web3 from "web3";
import getRpcUrl from "./getRpcUrl";

// // Array of available nodes to connect to
// export const nodes = [
//   process.env.REACT_APP_NODE_1,
//   process.env.REACT_APP_NODE_2,
//   process.env.REACT_APP_NODE_3,
// ];
// export const nodes = ["https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161", "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161", "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"]
const getWeb3NoAccount = () => {
  return web3NoAccount;
};
const INFURA_API_KEY = "4eec8c85be644684bf8717dc31ed465e"

// const getNodeUrl = () => {
//   const randomIndex = random(0, nodes.length - 1);
//   return nodes[randomIndex];
// };
// getRpcUrl() || "https://default-rpc-url.com";
const RPC_URL = (`https://sepolia.infura.io/v3/${INFURA_API_KEY}`)
const httpProvider = new Web3.providers.HttpProvider(RPC_URL, {
  timeout: 10000,
});
const web3NoAccount = new Web3(httpProvider);

export { getWeb3NoAccount };
// export default getNodeUrl;
