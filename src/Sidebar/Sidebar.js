import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
 import { Modal } from "react-bootstrap";
 import { useWeb3React } from "@web3-react/core";
import { setupNetwork } from "utils/wallet";
import useAuth from "hook/useAuth";
import { toast } from "react-toastify";
 

// import { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';

// Declare the component
function Sidebar(props) {
  const history = useHistory();
  const sidebar = useRef(null); // Reference for sidebar
  const [brandName, setBrandName] = useState(""); // State for brand name
  const [show, setShow] = useState(false); // Modal state

  // console.log(useData);
  // console.log(user);

 
  // Handle modal show and close
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [loading, setloading] = useState(false)

 

  // const handleLogOut = () => {
  //   localStorage.clear();
  //   history.push("/login");
  // }

  // ============================  WEB3   ============================ //
  const { login, logout } = useAuth();
  let { account, chainId } = useWeb3React();
  // const checkwalletisconnected = async () => {

  // }


  // useEffect(() => {
  //   checkwalletisconnected();

  // }, [])

  const connectMetaMask1 = async () => {
    if (account) {
      const connectorId = window.localStorage.getItem("connectorId");
      await logout(connectorId);
      localStorage.removeItem("connectorId");
      localStorage.removeItem("flag");
    } else {

      // let res = await setupNetwork();
      // console.log(res, "res in setupNetwork");

      // if (res) {
      login("injected");
      localStorage.setItem("connectorId", "injected");
      localStorage.setItem("flag", "true");
      handleClose();
      // }
    }
  };
  const trustWallet = async () => {
    if (account) {
      await logout("walletconnect");
      localStorage.clear();
      handleClose();
    } else {
      try {
        handleClose();
        login("walletconnect");
        localStorage.setItem("connectorId", "walletconnect");
        localStorage.setItem("flag", "true");
      } catch (err) {
        console.log("eerr", err);
      }
    }
  };

  const logoutHandle = async () => {
    const connectorId = window.localStorage.getItem("connectorId");
    await logout(connectorId);
    localStorage.removeItem("connectorId");
    localStorage.removeItem("flag");
    window.location.reload();
  };
  console.log(account, 'account')

  const openKYC = () => {
    if (account) {
      window.open("https://in.sumsub.com/websdk/p/sbx_uni_0QqOEO6d80eZs07V", "_blank");

    } else {
      toast.error('Please connect your account first.')
    }
  };

  

  // useEffect(()npm  => {
  //   // Update the timer every second
  //   if (chainId != 11155111) {
  //     setupNetwork(11155111);
  //   }
  // }, [chainId]);
  // useEffect(() => {
  //   setSearch(""); // Clear the search value when location changes
  // }, [location.pathname]);
  // ============================  WEB3   ============================ //


 

  const handleLogOut = () => {
    setloading(true);
    setTimeout(() => {
      localStorage.clear();
      // localStorage?.removeItem("token");
      toast.success("Logged out successfully!");
      history.push("/login");
      setloading(false);
    }, 2000);
  };


 
 
  return (
    <>
     <div>
        <div className="logout">
                {account ? <button className="btn-connect" onClick={logoutHandle}>
                  Disconnected  Wallet         </button> : (
                  <button className="btn-connect" onClick={handleShow}>
                    Connect Wallet 
                  </button>
                )}
                <button className="btn-logout" onClick={handleLogOut}
                  style={{
                    marginTop: '40px'
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path opacity="0.2" d="M19.25 4.8125V17.1875C19.25 17.5522 19.1051 17.9019 18.8473 18.1598C18.5894 18.4176 18.2397 18.5625 17.875 18.5625H4.125V3.4375H17.875C18.2397 3.4375 18.5894 3.58237 18.8473 3.84023C19.1051 4.09809 19.25 4.44783 19.25 4.8125Z" fill="white" />
                    <path d="M10.3125 18.5625C10.3125 18.7448 10.2401 18.9197 10.1111 19.0486C9.9822 19.1776 9.80734 19.25 9.625 19.25H4.125C3.94266 19.25 3.7678 19.1776 3.63886 19.0486C3.50993 18.9197 3.4375 18.7448 3.4375 18.5625V3.4375C3.4375 3.25516 3.50993 3.0803 3.63886 2.95136C3.7678 2.82243 3.94266 2.75 4.125 2.75H9.625C9.80734 2.75 9.9822 2.82243 10.1111 2.95136C10.2401 3.0803 10.3125 3.25516 10.3125 3.4375C10.3125 3.61984 10.2401 3.7947 10.1111 3.92364C9.9822 4.05257 9.80734 4.125 9.625 4.125H4.8125V17.875H9.625C9.80734 17.875 9.9822 17.9474 10.1111 18.0764C10.2401 18.2053 10.3125 18.3802 10.3125 18.5625ZM19.7364 10.5136L16.2989 7.07609C16.1699 6.94709 15.9949 6.87462 15.8125 6.87462C15.6301 6.87462 15.4551 6.94709 15.3261 7.07609C15.1971 7.2051 15.1246 7.38006 15.1246 7.5625C15.1246 7.74494 15.1971 7.9199 15.3261 8.04891L17.5905 10.3125H9.625C9.44266 10.3125 9.2678 10.3849 9.13886 10.5139C9.00993 10.6428 8.9375 10.8177 8.9375 11C8.9375 11.1823 9.00993 11.3572 9.13886 11.4861C9.2678 11.6151 9.44266 11.6875 9.625 11.6875H17.5905L15.3261 13.9511C15.1971 14.0801 15.1246 14.2551 15.1246 14.4375C15.1246 14.6199 15.1971 14.7949 15.3261 14.9239C15.4551 15.0529 15.6301 15.1254 15.8125 15.1254C15.9949 15.1254 16.1699 15.0529 16.2989 14.9239L19.7364 11.4864C19.8003 11.4226 19.851 11.3467 19.8856 11.2633C19.9202 11.1798 19.938 11.0903 19.938 11C19.938 10.9097 19.9202 10.8202 19.8856 10.7367C19.851 10.6533 19.8003 10.5774 19.7364 10.5136Z" fill="white" />
                  </svg>
                  Log Out
                </button>
              </div>

     </div>


      {/* Modal for user */}
      <Modal className='investmodal ' show={show} onHide={handleClose} centered>
        <Modal.Header className='modal-headerchld' closeButton>
          <Modal.Title> Connect Wallet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="connectwalletmodalbody">
            <div className="walletcoonectmodalwallet" onClick={connectMetaMask1}>
              <img src="/assets/dashboard/metamask 2.png" alt="" className="img-fluid" />
              <a>Metamask</a>
            </div>
            <div className="walletcoonectmodalwallet" onClick={trustWallet}>
              <img src="/assets/dashboard/walletconnect.png" alt="" />
              <a>WalletConnect</a>
            </div>
          </div>


        </Modal.Body>

      </Modal>

    </>
  );
}

export default Sidebar;
