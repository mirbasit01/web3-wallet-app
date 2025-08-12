import { useWeb3React } from "@web3-react/core";
import { useEffect, useRef, useState } from "react";
import Web3 from "web3";
import { getWeb3NoAccount } from "../utils/web3";

const useWeb3 = () => {
  const { provider, connector } = useWeb3React();
  // console.log(provider);
  
  const refEth = useRef(provider);
  const [web3, setWeb3] = useState(
  provider ? new Web3(connector?.provider) : getWeb3NoAccount()
  );

  useEffect(() => {
    if (provider !== refEth.current) {
      try {
        setWeb3(provider ? new Web3(connector?.provider) : getWeb3NoAccount());
        refEth.current = provider;
        // console.log("Web3 updated", web3);
      } catch (e) {
        console.error("Failed to update Web3", e);
      }
    }
  }, [provider, connector]);
  return web3;
};


export default useWeb3;