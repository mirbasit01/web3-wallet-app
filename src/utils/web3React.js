import { Web3Provider } from "@ethersproject/providers";
import { walletConnectV2 } from "../connectors/walletConnectV2";
import { metaMask } from "../connectors/metaMask";

const ConnectorNames = {
  Injected: "injected",
  WalletConnect: "walletconnect",
};

export const connectorsByName = {
  [ConnectorNames.Injected]: metaMask,
  [ConnectorNames.WalletConnect]: walletConnectV2,
};

export const getLibraryForSign = (provider) => {
  const library = new Web3Provider(provider);
  console.log("library", library);
  return library;
};

export const getLibrary = (provider) => {
  return provider;
};
