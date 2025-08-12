import { useEffect } from "react";
import useAuth from "./useAuth";
import { connectorsByName } from "../utils/web3React";

const ConnectorNames = {
  Injected: "injected",
  WalletConnect: "walletconnect",
  BSC: "bsc",
};

const useEagerConnect = () => {
  const { login } = useAuth();

  useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (connectorId && connectorId !== ConnectorNames.BSC) {
      connectorsByName[connectorId].connectEagerly();
    }
  }, [login]);
};

export default useEagerConnect;
