// // import React, { useState, useEffect, useRef } from "react";
// // import { Link, NavLink, useHistory } from "react-router-dom";
// // import { Modal } from "react-bootstrap";
// // import { useWeb3React } from "@web3-react/core";
// // import { setupNetwork } from "utils/wallet";
// // import useAuth from "hook/useAuth";
// // import { toast } from "react-toastify";
// // import useWeb3 from 'hook/useWeb3';



// // function Sidebar(props) {
// //   const history = useHistory();
// //   const sidebar = useRef(null); 
// //    const [show, setShow] = useState(false); 
// //   const web3 = useWeb3();
// //   const [balance, setBalance] = useState('');
// //   const handleClose = () => setShow(false);
// //   const handleShow = () => setShow(true);
// //   const [loading, setloading] = useState(false)
// //   const { login, logout } = useAuth();
// //   let { account, chainId } = useWeb3React();

// //   // const handleLogOut = () => {
// //   //   localStorage.clear();
// //   //   history.push("/login");
// //   // }

// //   // ============================  WEB3   ============================ //

// //   // const checkwalletisconnected = async () => {

// //   // }


// //   // useEffect(() => {
// //   //   checkwalletisconnected();

// //   // }, [])

// //   const connectMetaMask1 = async () => {
// //     if (account) {
// //       const connectorId = window.localStorage.getItem("connectorId");
// //       await logout(connectorId);
// //       localStorage.removeItem("connectorId");
// //       localStorage.removeItem("flag");
// //     } else {

// //       // let res = await setupNetwork();
// //       // console.log(res, "res in setupNetwork");

// //       // if (res) {
// //       login("injected");
// //       localStorage.setItem("connectorId", "injected");
// //       localStorage.setItem("flag", "true");
// //       handleClose();
// //       // }
// //     }
// //   };
// //   const trustWallet = async () => {
// //     if (account) {
// //       await logout("walletconnect");
// //       localStorage.clear();
// //       handleClose();
// //     } else {
// //       try {
// //         handleClose();
// //         login("walletconnect");
// //         localStorage.setItem("connectorId", "walletconnect");
// //         localStorage.setItem("flag", "true");
// //       } catch (err) {
// //         console.log("eerr", err);
// //       }
// //     }
// //   };

// //   const logoutHandle = async () => {
// //     const connectorId = window.localStorage.getItem("connectorId");
// //     await logout(connectorId);
// //     localStorage.removeItem("connectorId");
// //     localStorage.removeItem("flag");
// //     // window.location.reload();

// //   };
// //   console.log(account, 'account')





// //   useEffect(() => {
// //     if (account) {
// //       web3.eth.getBalance(account).then(balance => {
// //         setBalance(parseFloat(web3.utils.fromWei(balance, 'ether')).toFixed(6));
// //       });
// //     }
// //   }, [account, web3]);

// //   // useEffect(()npm  => {
// //   //   // Update the timer every second
// //   //   if (chainId != 11155111) {
// //   //     setupNetwork(11155111);
// //   //   }
// //   // }, [chainId]);
// //   // useEffect(() => {
// //   //   setSearch(""); // Clear the search value when location changes
// //   // }, [location.pathname]);
// //   // ============================  WEB3   ============================ //




// //   const handleLogOut = () => {
// //     setloading(true);
// //     setTimeout(() => {
// //       localStorage.clear();
// //       // localStorage?.removeItem("token");
// //       toast.success("Logged out successfully!");
// //       history.push("/login");
// //       setloading(false);
// //     }, 2000);
// //   };




// //   return (
// //     <>
// //       <div style={{
// //         background: 'black',
// //         color: 'white',
// //         padding: '30px'
// //       }}>
// //         <div className="">
// //           {account ?
// //             <button className=""
// //               onClick={logoutHandle}>
// //               Disconnected  Wallet </button>
// //             : (
// //               <button className="btn-connect" onClick={handleShow}>
// //                 Connect Wallet
// //               </button>
// //             )}
// //           {/* <button className="btn-logout" onClick={handleLogOut}
// //                   style={{
// //                     marginTop: '40px'
// //                   }}
// //                 >
                  
// //                   Log Out
// //                 </button> */}
// //         </div>

// //         <p>{balance}</p>
// //         <p>
// //           {account}
// //         </p>
// //         <p>{chainId}</p>

// //       </div>


// //       {/* Modal for user */}
// //       <Modal className='investmodal ' show={show} onHide={handleClose} centered>
// //         <Modal.Header className='modal-headerchld' closeButton>
// //           <Modal.Title> Connect Wallet</Modal.Title>
// //         </Modal.Header>
// //         <Modal.Body>
// //           <div className="connectwalletmodalbody" >
// //             <div className="walletcoonectmodalwallet" onClick={connectMetaMask1}>
// //               <img src="/assets/dashboard/metamask 2.png" alt="" className="img-fluid" />
// //               <a>Metamask</a>
// //             </div>
// //             <div className="walletcoonectmodalwallet" onClick={trustWallet}>
// //               <img src="/assets/dashboard/walletconnect.png" alt="" />
// //               <a>WalletConnect</a>
// //             </div>
// //           </div>


// //         </Modal.Body>

// //       </Modal>

// //     </>
// //   );
// // }

// // export default Sidebar;
import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { useWeb3React } from "@web3-react/core";
import { setupNetwork } from "utils/wallet";
import useAuth from "hook/useAuth";
import { toast } from "react-toastify";
import useWeb3 from 'hook/useWeb3';
import './WalletSidebar.css';
import Tokensendtransfer from "components/SendToken/Tokensendtransfer";
import TokenBalance from "components/Balance/TokenBalance";
import Getsalldata from "components/dataFetcher/Getsalldata";

function WalletConnect() {
  const history = useHistory();
  const sidebar = useRef(null); 
  const [show, setShow] = useState(false); 
  const web3 = useWeb3();
  const [balance, setBalance] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [loading, setloading] = useState(false);
  const [connectingWallet, setConnectingWallet] = useState('');
  const { login, logout } = useAuth();
  let { account, chainId } = useWeb3React();

  // Toast configuration without icons
  const toastConfig = {
    icon: false,
    hideProgressBar: true,
    closeButton: true,
    autoClose: 3000,
    position: "top-right"
  }; 

  const connectMetaMask1 = async () => {
    if (account) {
      const connectorId = window.localStorage.getItem("connectorId");
      await logout(connectorId);
      localStorage.removeItem("connectorId");
      localStorage.removeItem("flag");
    } else {
      setConnectingWallet('metamask');
      try {
        login("injected");
        localStorage.setItem("connectorId", "injected");
        localStorage.setItem("flag", "true");
        handleClose();
        
        // Option 1: Toast without icon
        toast.success("MetaMask connected successfully!", toastConfig);
        
        // Option 2: No toast at all (comment out above line)
        // console.log("MetaMask connected successfully!");
        
      } catch (error) {
        toast.error("Failed to connect MetaMask", toastConfig);
      } finally {
        setConnectingWallet('');
      }
    }
  };

  const trustWallet = async () => {
    if (account) {
      await logout("walletconnect");
      localStorage.clear();
      handleClose();
    } else {
      setConnectingWallet('walletconnect');
      try {
        handleClose();
        login("walletconnect");
        localStorage.setItem("connectorId", "walletconnect");
        localStorage.setItem("flag", "true");
        
        // Option 1: Toast without icon
        toast.success("WalletConnect connected successfully!", toastConfig);
        
        // Option 2: No toast at all
        // console.log("WalletConnect connected successfully!");
        
      } catch (err) {
        console.log("Error connecting wallet:", err);
        toast.error("Failed to connect wallet", toastConfig);
      } finally {
        setConnectingWallet('');
      }
    }
  };

  const logoutHandle = async () => {
    const connectorId = window.localStorage.getItem("connectorId");
    await logout(connectorId);
    localStorage.removeItem("connectorId");
    localStorage.removeItem("flag");
    
    // Option 1: Toast without icon
    toast.success("Wallet disconnected successfully!", toastConfig);
    
    // Option 2: No toast at all
    // console.log("Wallet disconnected successfully!");
  };

  useEffect(() => {
    if (account) {
      web3.eth.getBalance(account).then(balance => {
        setBalance(parseFloat(web3.utils.fromWei(balance, 'ether')).toFixed(6));
      });
    }
  }, [account, web3]);

  const handleLogOut = () => {
    setloading(true);
    setTimeout(() => {
      localStorage.clear();
      toast.success("Logged out successfully!", toastConfig);
      history.push("/login");
      setloading(false);
    }, 2000);
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <>
      <div className="wallet-sidebar">
        <div className="wallet-header">
          <h2 className="wallet-title text-glow">
           Web3 Wallet
          </h2>
          
          {account && (
            <div className="connection-status">
              <div className="status-dot"></div>
              Connected
            </div>
          )}
        </div>

        <div className="wallet-actions">
          {account ? (
            <button 
              className="btn-disconnect"
              onClick={logoutHandle}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading-spinner"></span>
                  Disconnecting...
                </>
              ) : (
                <>🔌 Disconnect Wallet</>
              )}
            </button>
          ) : (
            <button 
              className="btn-connect" 
              onClick={handleShow}
              disabled={loading}
            >
              🔗 Connect Wallet
            </button>
          )}
        </div>

        {account && (
          <div className="wallet-info">
            <div className="info-item">
              <span className="info-label">💰 Balance</span>
              <span className="info-value balance-highlight">
                {balance} ETH
              </span>
            </div>
            
            <div className="info-item">
              <span className="info-label">📍 Address</span>
              <span className="info-value truncate-address">
                {formatAddress(account)}
                {/* {account} */}
              </span>
            </div>
            
            <div className="info-item">
              <span className="info-label">🔗 Chain ID</span>
              <span className="info-value">
                {chainId}
              </span>
            </div>
          </div>
        )}
      </div>


      <div className='writecontract'>
       

      </div>
 <TokenBalance/>

 <Tokensendtransfer/>

<Getsalldata/>




      {/* Enhanced Modal */}
      <Modal 
        className="wallet-connect-modal" 
        show={show} 
        onHide={handleClose} 
        centered
        size="md"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            🔗 Connect Your Wallet
          </Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          <div className="wallet-options">
            <div 
              className="wallet-option" 
              onClick={connectMetaMask1}
              style={{ opacity: connectingWallet && connectingWallet !== 'metamask' ? 0.5 : 1 }}
            >
              {connectingWallet === 'metamask' ? (
                <div className="loading-spinner"></div>
              ) : (
                <img 
                  src="/assets/dashboard/metamask 2.png" 
                  alt="MetaMask" 
                  className="wallet-icon"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.textContent = '🦊';
                    e.target.nextSibling.style.width = '48px';
                    e.target.nextSibling.style.height = '48px';
                    e.target.nextSibling.style.display = 'flex';
                    e.target.nextSibling.style.alignItems = 'center';
                    e.target.nextSibling.style.justifyContent = 'center';
                    e.target.nextSibling.style.fontSize = '24px';
                    e.target.nextSibling.style.backgroundColor = '#f6851b';
                    e.target.nextSibling.style.borderRadius = '8px';
                  }}
                />
              )}
              <div style={{ display: 'none' }}></div>
              <div>
                <p className="wallet-name">
                  {connectingWallet === 'metamask' ? 'Connecting...' : 'MetaMask'}
                </p>
                <p className="wallet-description">Connect using MetaMask wallet</p>
              </div>
            </div>
            
            <div 
              className="wallet-option" 
              onClick={trustWallet}
              style={{ opacity: connectingWallet && connectingWallet !== 'walletconnect' ? 0.5 : 1 }}
            >
              {connectingWallet === 'walletconnect' ? (
                <div className="loading-spinner"></div>
              ) : (
                <img 
                  src="/assets/dashboard/walletconnect.png" 
                  alt="WalletConnect" 
                  className="wallet-icon"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.textContent = '🔗';
                    e.target.nextSibling.style.width = '48px';
                    e.target.nextSibling.style.height = '48px';
                    e.target.nextSibling.style.display = 'flex';
                    e.target.nextSibling.style.alignItems = 'center';
                    e.target.nextSibling.style.justifyContent = 'center';
                    e.target.nextSibling.style.fontSize = '24px';
                    e.target.nextSibling.style.backgroundColor = '#3b99fc';
                    e.target.nextSibling.style.borderRadius = '8px';
                  }}
                />
              )}
              <div style={{ display: 'none' }}></div>
              <div>
                <p className="wallet-name">
                  {connectingWallet === 'walletconnect' ? 'Connecting...' : 'WalletConnect'}
                </p>
                <p className="wallet-description">Scan with WalletConnect to connect</p>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <p style={{ color: '#8892b0', fontSize: '0.9rem' }}>
              New to Ethereum wallets? 
              <span style={{ color: '#00d4ff', marginLeft: '0.25rem', cursor: 'pointer' }}>
                Learn more
              </span>
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default WalletConnect;