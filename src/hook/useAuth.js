 

import { toast } from "react-toastify";
import { connectorsByName } from "../utils/web3React";
import { setupNetwork } from "../utils/wallet";
import Web3 from "web3";

const useAuth = () => {
  
  // const login = async (connectorId) => {
  //   const connector = connectorsByName[connectorId];
  //   const chainId = process.env.REACpenvT_APP_CHAIN_ID;
  //   if (connector) {
  //     try {
  //       await connector.activate(chainId);
  //       window.localStorage.setItem("connectorId", connectorId);
  //       console.log("Connected successfully");
  //     } catch (error) {
  //       console.error("Connection failed", error);
  //     }
  //   } else {
  //     console.error("Invalid connector ID");
  //   }
  // };
const login = async (connectorId) => {
  const connector = connectorsByName[connectorId];
  const chainId = process.env.REACT_APP_CHAIN_ID;

  if (connector) {
    try {
      await connector.activate(chainId);
      window.localStorage.setItem("connectorId", connectorId);
      console.log("Connected successfully");

      // Wrap connector.provider with Web3
      const web3 = new Web3(connector.provider);

      // Get accounts
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        console.log("Connected Account:", accounts[0]);
      } else {
        console.warn("No accounts found");
      }

      // Example: Get current chain ID
      const currentChainId = await web3.eth.getChainId();
      console.log("Connected Chain ID:", currentChainId);

      // Example: Sign a message (web3 alternative to "signer")
      const message = "Hello from web3!";
      const signature = await web3.eth.personal.sign(message, accounts[0], "");
      console.log("Signature:", signature);
      window.localStorage.setItem("Signature", signature);


    } catch (error) {
      console.error("Connection failed", error);
    }
  } else {
    console.error("Invalid connector ID");
  }
};
  // const logout = async () => {
  //   const connectorID = window.localStorage.getItem("connectorId");
  //   const connector = connectorsByName[connectorID];
  //   const costumnetwork = await connector.getItem('costumnetwork');
  //   console.log("costumnetwork", costumnetwork)
  //   if (costumnetwork) {
  //     window.localStorage.removeItem('costumnetwork');
  //     console.log('costumnetwork removed')
  //   }
  //   if (connector) {
  //     try {
  //       if (connector?.deactivate) {
  //         await connector.deactivate();
  //       } else {
  //         await connector.resetState();
  //       }
  //       console.log("Wallet disconnected successfully");
  //       toast.success("Wallet disconnected successfully");
  //     } catch (error) {
  //       console.error("Error during wallet disconnection:", error);
  //       toast.error("Error during wallet disconnection", error);
  //     }
  //   } else {
  //     console.error("Invalid connector");
  //     toast.error("Invalid connector");
  //   }
  // };


  const logout = async () => {
    const connectorID = window.localStorage.getItem("connectorId");

    if (!connectorID) {
      console.error("No connector ID found in localStorage");
      toast.error("No connector ID found in localStorage");
      return;
    }

    const connector = connectorsByName[connectorID];
    if (!connector) {
      console.error("Invalid connector");
      toast.error("Invalid connector");
      return;
    }

    const costumnetwork = window.localStorage.getItem("costumnetwork");
    console.log("costumnetwork", costumnetwork);

    if (costumnetwork) {
      window.localStorage.removeItem("costumnetwork");
      console.log("costumnetwork removed");
    }

    try {
      if (connector.deactivate) {
        await connector.deactivate();
      } else {
        await connector.resetState();
      }
      console.log("Wallet disconnected successfully");
      toast.success("Wallet disconnected successfully");
      // window.location.reload(); // Reload the page after logout
      window.localStorage.removeItem("connectorId");
    } catch (error) {
      console.error("Error during wallet disconnection:", error);
      toast.error("Error during wallet disconnection", error);
    }
  };

  return { login, logout };
};

export default useAuth;
