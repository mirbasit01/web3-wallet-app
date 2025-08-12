import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { useWeb3React } from "@web3-react/core";
import { setupNetwork } from "utils/wallet";
import useAuth from "hook/useAuth";
import { toast } from "react-toastify";
import useWeb3 from 'hook/useWeb3';



function Sidebar(props) {
  const history = useHistory();
  const sidebar = useRef(null); 
  const [brandName, setBrandName] = useState(""); 
  const [show, setShow] = useState(false); 
  const web3 = useWeb3();
  const [balance, setBalance] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [loading, setloading] = useState(false)
  const { login, logout } = useAuth();
  let { account, chainId } = useWeb3React();






  // const handleLogOut = () => {
  //   localStorage.clear();
  //   history.push("/login");
  // }

  // ============================  WEB3   ============================ //

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





  useEffect(() => {
    if (account) {
      web3.eth.getBalance(account).then(balance => {
        setBalance(parseFloat(web3.utils.fromWei(balance, 'ether')).toFixed(6));
      });
    }
  }, [account, web3]);

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
      <div style={{
        background: 'black',
        color: 'white',
        padding: '30px'
      }}>
        <div className="logout">
          {account ?
            <button className="btn-connect"
              onClick={logoutHandle}>
              Disconnected  Wallet </button>
            : (
              <button className="btn-connect" onClick={handleShow}>
                Connect Wallet
              </button>
            )}
          {/* <button className="btn-logout" onClick={handleLogOut}
                  style={{
                    marginTop: '40px'
                  }}
                >
                  
                  Log Out
                </button> */}
        </div>

        <p>{balance}</p>
        <p>
          {account}
        </p>
        <p>{chainId}</p>

      </div>


      {/* Modal for user */}
      <Modal className='investmodal ' show={show} onHide={handleClose} centered>
        <Modal.Header className='modal-headerchld' closeButton>
          <Modal.Title> Connect Wallet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="connectwalletmodalbody" >
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
