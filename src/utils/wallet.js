// // Set of helper functions to facilitate wallet setup

// /**
//  * Prompt the user to add BSC as a network on Metamask, or switch to BSC if the wallet is on a different network
//  * @returns {boolean} true if the setup succeeded, false otherwise
//  */
// export const setupNetwork = async () => {
//     const provider = (window).ethereum
//     if (provider) {
//         const chainId = parseInt(process.env.REACT_APP_CHAIN_ID, 10)
//         // const chainId = 4
//         try {
//             await provider.request({
//                 method: 'wallet_switchEthereumChain',
//                 params: [
//                     {
//                         chainId: `0x${chainId.toString(16)}`,
//                         // chainName: 'Sepolia Testnet',
//                         // nativeCurrency: {
//                         //   name: 'SepoliaETH',
//                         //   symbol: 'SepoliaETH',
//                         //   decimals: 18,
//                         // },
//                         // rpcUrls: [nodes],
//                         // blockExplorerUrls: ['https://ethereum-sepolia.rpc.subquery.network/public'],
//                     },
//                 ],
//             })
//             return true
//         } catch (error) {
//             console.error(error)
//             return false
//         }
//     } else {
//         console.error("Can't setup the BSC network on metamask because window.ethereum is undefined")
//         return false
//     }
// }
// /**
//  * Prompt the user to add a custom token to metamask
//  * @param tokenAddress
//  * @param tokenSymbol
//  * @param tokenDecimals
//  * @param tokenImage
//  * @returns {boolean} true if the token has been added, false otherwise
//  */
// export const registerToken = async (
//     tokenAddress,
//     tokenSymbol,
//     tokenDecimals,
//     tokenImage,
// ) => {
//     const tokenAdded = await (window).ethereum.request({
//         method: 'wallet_watchAsset',
//         params: {
//             type: 'ERC20',
//             options: {
//                 address: tokenAddress,
//                 symbol: tokenSymbol,
//                 decimals: tokenDecimals,
//                 image: tokenImage,
//             },
//         },
//     })

//     return tokenAdded
// }

import { toast } from "react-toastify";

/**
 * Set up Binance Smart Chain (BNB) network on MetaMask
 * @param {number} chainId - The chain ID to set up (e.g., 56 for BNB Mainnet)
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
export const setupNetwork = async () => {
  const provider = window.ethereum;
  const chainId = process.env.REACT_APP_CHAIN_ID;
  const rpcUrl = process.env.REACT_APP_NODE_1 || "https://bsc.drpc.org";
  

  console.log("chainnnnnnnn idddd : ", chainId);

  if (!provider) {
    console.error(
      "MetaMask is not installed or `window.ethereum` is undefined."
    );
    toast.error("Metasm is not installed or `window.ethereum` is undefined");
    return false;
  }

  const networkParams = {
    // chainId: `0x${chainId.toString(16)}`, // Convert chainId to hexadecimal
    chainId: `0x${parseInt(chainId, 10).toString(16)}`, // Convert chainId to hexadecimal
    chainName: "Binance Smart Chain Mainnet",
    nativeCurrency: {
      name: "Binance Coin",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: [rpcUrl],
    blockExplorerUrls: ["https://bscscan.com"],
  };

  try {
    // Attempt to switch to the Binance Smart Chain network
    await provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: networkParams.chainId }],
    });
    return true;
  } catch (error) {
    if (error.code === 4902) {
      // Network not found, add it
      try {
        await provider.request({
          method: "wallet_addEthereumChain",
          params: [networkParams],
        });
        return true;
      } catch (addError) {
        console.error("Failed to add Binance Smart Chain network:", addError);
        toast.error(
          "Failed to add Binance Smart Chain network, try adding it in wallet manually"
        );
      }
    } else {
      console.error("Failed to switch to Binance Smart Chain network:", error);
      toast.error(
        "Failed to switch to Binance Smart Chain network, try switching it in wallet manually"
      );
    }
  }

  return false;
};
