import React from 'react'
 // import "./app.scss";
import { ToastContainer } from "react-toastify";
import WalletConnect from 'wallet/WalletConnect';
 
const App = () => {
  return (
    
    <>
      <ToastContainer
        autoClose={5000}
        style={{ fontSize: 12, fontWeight: 300 }}
        theme="light"
        position="top-right"
      />
      <WalletConnect/>
     </>
  )
}

export default App