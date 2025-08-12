import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Web3ReactProvider } from "@web3-react/core";
//  import "./app.scss";

import {hooks as walletConnectV2Hooks, walletConnectV2,} from "./connectors/walletConnectV2.js";
import { hooks as metaMaskHooks, metaMask } from "./connectors/metaMask";
 import { UserProvider } from "contexts/UserContext";
  // import { getLibrary } from "hooks/useLibrary";
 
const connectors = [
  [walletConnectV2, walletConnectV2Hooks],
  [metaMask, metaMaskHooks],
];


ReactDOM.render(

<UserProvider>
   <Web3ReactProvider connectors={connectors}>
    <App />
  </Web3ReactProvider>
  </UserProvider>
    ,

  document.getElementById("root")
);
