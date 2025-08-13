import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useHistory, useLocation } from "react-router-dom";
import "./style.scss";
import { Nav } from "reactstrap";
import PerfectScrollbar from "perfect-scrollbar";
import routes from "routes.js";
import { Modal } from "react-bootstrap";
// import useAuth from "hooks/useAuth";
import { useWeb3React } from "@web3-react/core";
import { setupNetwork } from "utils/wallet";
import useAuth from "hook/useAuth";
import axios from "axios";

// import { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';

// Declare the component
function Sidebar(props, { userId }) {
    const history = useHistory();
    const sidebar = useRef(null); // Reference for sidebar
    const [brandName, setBrandName] = useState(""); // State for brand name
    const [show, setShow] = useState(false); // Modal state

    // console.log(useData);
    // console.log(user);

    const router = useLocation();

    // Handle modal show and close
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Initialize PerfectScrollbar for Windows platform
    useEffect(() => {
        let ps;
        if (navigator.platform.indexOf("Win") > -1) {
            ps = new PerfectScrollbar(sidebar.current, {
                suppressScrollX: true,
                suppressScrollY: false,
            });
        }
        return () => {
            if (ps) {
                ps.destroy(); // Cleanup when the component is unmounted
            }
        };
    }, []);

    // Get the brand name based on the current route
    const getBrand = () => {
        routes.forEach((prop) => {
            if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
                setBrandName(prop.name);
            }
        });
    };

    useEffect(() => {
        getBrand();
    }, []); // Only call once after the first render

    // Toggle sidebar visibility
    const openSidebar = () => {
        document.documentElement.classList.toggle("nav-open");
    };

    const handleLogOut = () => {
        localStorage.clear();
        history.push("/login");
    }

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
    };
    console.log(account, 'account')



    // useEffect(() => {
    //   // Update the timer every second
    //   if (chainId != 11155111) {
    //     setupNetwork(11155111);
    //   }
    // }, [chainId]);
    // useEffect(() => {
    //   setSearch(""); // Clear the search value when location changes
    // }, [location.pathname]);
    // ============================  WEB3   ============================ //



    const [kycLink, setKycLink] = useState(null);

    // Function to fetch KYC link from Sumsub API
    const fetchKYCLink = async () => {
        const API_KEY = "your_sumsub_api_key"; // Replace with your API key
        const API_URL = `https://api.sumsub.com/applicants/-;externalUserId=${userId}/one-time-access`;

        try {
            const response = await axios.post(API_URL, {}, {
                headers: {
                    "X-App-Token": API_KEY,
                    "Content-Type": "application/json"
                }
            });

            setKycLink(response.data.url);
            window.open(response.data.url, "_blank"); // Open KYC link in new tab
        } catch (error) {
            console.error("Error fetching KYC link:", error);
            alert("Failed to generate KYC link. Please try again.");
        }
    };

    const [kycStatus, setKycStatus] = useState("Not Verified");

    const fetchKYCStatus = async () => {
        const API_URL = `https://api.sumsub.com/resources/applicants/-;externalUserId=${userId}/status`;

        try {
            const response = await axios.get(API_URL, {
                headers: {
                    "X-App-Token": API_KEY
                }
            });

            setKycStatus(response.data.reviewStatus); // Status: "pending", "approved", "rejected"
        } catch (error) {
            console.error("Error fetching KYC status:", error);
        }
    };

    // Call fetchKYCStatus when Sidebar loads
    useEffect(() => {
        fetchKYCStatus();
    }, []);

    return (
        <>
            <div
                className="sidebar"
                data-color={props.bgColor}
                data-active-color={props.activeColor}
            >
                <div className="logo for-mobilesidebar-sm">
                    <Link to="/clinic/dashboard" className="simple-text logo-mini">
                        <div className="logo-img text-left">
                            <img src="\logo.svg" alt="react-logo" className="logoimg" />
                        </div>
                    </Link>
                    <img
                        src="/assets/images/Close.svg"
                        alt="img"
                        className="img-fluid img-close d-none"
                        onClick={openSidebar}
                    />
                </div>
                <div className="mblnavbtns d-none">
                    <div className="inputdiv">
                        <input
                            type="text"
                            id="fname"
                            name="fname"
                            className="inputnavvv"
                            placeholder="Search "
                        />
                        {/* <img className='imgwhitesearch' src='\assets\Searchwhite.svg' alt='search' /> */}

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            className="imgwhitesearch"
                        >
                            <path
                                d="M8.25 14.25C11.5637 14.25 14.25 11.5637 14.25 8.25C14.25 4.93629 11.5637 2.25 8.25 2.25C4.93629 2.25 2.25 4.93629 2.25 8.25C2.25 11.5637 4.93629 14.25 8.25 14.25Z"
                                stroke="#7E7E7E"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M15.75 15.7498L12.4875 12.4873"
                                stroke="#7E7E7E"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </div>
                    <button className="navcommonbtn" onClick={handleShow}>
                        Connect Wallet
                    </button>
                    <button className="whitebtn" onClick={handleShow}>
                        <div className="whitebtnimg">
                            <img
                                src=""
                                alt="btninnerimg"
                                className="btninnerimg"
                            />
                        </div>
                        <p className="btninnerpara">
                            sbycy
                        </p>
                    </button>
                </div>
                <div className="sidebar-wrapper" ref={sidebar}>
                    <Nav>


                        <li>
                            <NavLink
                                to="/admin/dashbord"
                                className={({ isActive }) =>
                                    `nav-link ${isActive ? "active" : ""}`
                                }

                            >
                                <div className="fstdivmain">
                                    <div className="inersecdiv">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="iconns">
                                            <path d="M7.24 2H5.34C3.15 2 2 3.15 2 5.33V7.23C2 9.41 3.15 10.56 5.33 10.56H7.23C9.41 10.56 10.56 9.41 10.56 7.23V5.33C10.57 3.15 9.42 2 7.24 2Z" fill="#3E3E3E" />
                                            <path d="M18.6699 2H16.7699C14.5899 2 13.4399 3.15 13.4399 5.33V7.23C13.4399 9.41 14.5899 10.56 16.7699 10.56H18.6699C20.8499 10.56 21.9999 9.41 21.9999 7.23V5.33C21.9999 3.15 20.8499 2 18.6699 2Z" fill="#3E3E3E" />
                                            <path d="M18.6699 13.4301H16.7699C14.5899 13.4301 13.4399 14.5801 13.4399 16.7601V18.6601C13.4399 20.8401 14.5899 21.9901 16.7699 21.9901H18.6699C20.8499 21.9901 21.9999 20.8401 21.9999 18.6601V16.7601C21.9999 14.5801 20.8499 13.4301 18.6699 13.4301Z" fill="#3E3E3E" />
                                            <path d="M7.24 13.4301H5.34C3.15 13.4301 2 14.5801 2 16.7601V18.6601C2 20.8501 3.15 22.0001 5.33 22.0001H7.23C9.41 22.0001 10.56 20.8501 10.56 18.6701V16.7701C10.57 14.5801 9.42 13.4301 7.24 13.4301Z" fill="#3E3E3E" />
                                        </svg>
                                        <p>Dashboard</p>
                                    </div>

                                </div>
                            </NavLink>
                        </li>

                        <li>


                            <NavLink
                                to="/admin/buy"
                                className={({ isActive }) =>
                                    `nav-link ${isActive ? "active" : ""}`
                                }
                            >
                                <div className="fstdivmain">
                                    <div className="inersecdiv">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16 12.75H12.75V16C12.75 16.41 12.41 16.75 12 16.75C11.59 16.75 11.25 16.41 11.25 16V12.75H8C7.59 12.75 7.25 12.41 7.25 12C7.25 11.59 7.59 11.25 8 11.25H11.25V8C11.25 7.59 11.59 7.25 12 7.25C12.41 7.25 12.75 7.59 12.75 8V11.25H16C16.41 11.25 16.75 11.59 16.75 12C16.75 12.41 16.41 12.75 16 12.75Z" fill="#3E3E3E" />
                                        </svg>
                                        <p>Buy</p>
                                    </div>

                                </div>
                            </NavLink>
                        </li>
                        <li>


                            <NavLink
                                to="/admin/sell"
                                className={({ isActive }) =>
                                    `nav-link ${isActive ? "active" : ""}`
                                }
                            >
                                <div className="fstdivmain">
                                    <div className="inersecdiv">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="iconns">
                                            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17.25 12.33C17.25 12.74 16.91 13.08 16.5 13.08C16.09 13.08 15.75 12.74 15.75 12.33V9.31L8.03 17.03C7.88 17.18 7.69 17.25 7.5 17.25C7.31 17.25 7.12 17.18 6.97 17.03C6.68 16.74 6.68 16.26 6.97 15.97L14.69 8.25H11.67C11.26 8.25 10.92 7.91 10.92 7.5C10.92 7.09 11.26 6.75 11.67 6.75H16.5C16.91 6.75 17.25 7.09 17.25 7.5V12.33Z" fill="#3E3E3E" />
                                        </svg>

                                        <p>Sell</p>
                                    </div>

                                </div>
                            </NavLink>
                        </li>

                        {/* <button
            style={{marginTop: '20px'}}
              className="navcommonbtn"
              // onClick={handleShow}
            >
              KYC 

            </button> */}
                        <button onClick={fetchKYCLink} style={{ padding: "10px 20px", background: "blue", color: "white", border: "none", cursor: "pointer" }}>
                            Verify KYC
                        </button>

                        {/* queckodevelper@11 */}


                        <p style={{ color: 'white', marginTop: '20px' }}> KYC Status: {kycStatus}</p>


                    </Nav>
                    <div className="logout">
                        {account ? <button className="btn-connect" onClick={logoutHandle}>
                            Disconnected  Wallet         </button> : (
                            <button className="btn-connect" onClick={handleShow}>
                                Connect Wallet
                            </button>
                        )}
                    </div>
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
 


///////////////////////////////////////////////


import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useHistory, useLocation } from "react-router-dom";
import "./style.scss";
import { Nav } from "reactstrap";
import PerfectScrollbar from "perfect-scrollbar";
// Removed unused import 'routes' if not actually used for dynamic routes here
import { Modal } from "react-bootstrap";
import { useWeb3React } from "@web3-react/core";
// import { setupNetwork } from "utils/wallet"; // Keep if used
import useAuth from "hook/useAuth"; // Ensure this path is correct
import { toast } from "react-toastify";
import Loader from "hook/loader"; // Ensure this path is correct


function Sidebar(props) {
    const history = useHistory();
    const sidebar = useRef(null);
    // Removed brandName state and related useEffect/getBrand if not used elsewhere
    const [show, setShow] = useState(false);
    const [loading, setloading] = useState(false); // For app logout loader

    const location = useLocation(); // Changed from router to location

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // --- Read User Role ---
    const userRole = localStorage.getItem('userRole'); // Read role directly on render

    // --- Perfect Scrollbar ---
    useEffect(() => {
        let ps;
        if (navigator.platform.indexOf("Win") > -1 && sidebar.current) { // Added check for sidebar.current
            ps = new PerfectScrollbar(sidebar.current, {
                suppressScrollX: true,
                suppressScrollY: false,
            });
        }
        return () => {
            if (ps) {
                ps.destroy();
            }
        };
    }, []); // Empty dependency array ensures it runs once on mount

    // Toggle sidebar visibility (mobile)
    const openSidebar = () => {
        document.documentElement.classList.toggle("nav-open");
    };

    // ============================  WEB3   ============================ //
    const { login, logout } = useAuth();
    let { account, chainId } = useWeb3React(); // Keep chainId if needed for network checks

    // --- Web3 Wallet Connection/Disconnection ---
    const connectMetaMask1 = async () => {
        // No need to disconnect here, the button logic handles it
        if (!account) {
            try {
                // let res = await setupNetwork(); // Uncomment if network setup is needed
                // if (res) {
                setloading(true); // Show loader during connection attempt
                await login("injected");
                localStorage.setItem("connectorId", "injected");
                localStorage.setItem("flag", "true"); // Consider if 'flag' is still needed
                handleClose(); // Close modal on success
                // }
            } catch (err) {
                console.error("Metamask connection error:", err);
                toast.error("Failed to connect Metamask.");
            } finally {
                setloading(false);
            }
        } else {
            // Wallet is already connected, handle accordingly (maybe show address or disconnect option)
            toast.info("Metamask is already connected.");
            handleClose();
        }
    };

    const trustWallet = async () => {
        if (!account) {
            try {
                setloading(true);
                handleClose(); // Close modal before attempting connection
                await login("walletconnect");
                localStorage.setItem("connectorId", "walletconnect");
                localStorage.setItem("flag", "true");
            } catch (err) {
                console.error("WalletConnect error:", err);
                toast.error("Failed to connect with WalletConnect.");
            } finally {
                setloading(false);
            }
        } else {
            toast.info("Wallet is already connected.");
            handleClose();
        }
    };

    // Specific function to handle ONLY wallet disconnection
    const handleWalletDisconnect = async () => {
        const connectorId = window.localStorage.getItem("connectorId");
        if (connectorId && logout) { // Check if logout function exists
            try {
                setloading(true); // Indicate activity
                await logout(connectorId);
                localStorage.removeItem("connectorId");
                localStorage.removeItem("flag");
                toast.success("Wallet disconnected.");
            } catch (error) {
                console.error("Wallet disconnect error:", error);
                toast.error("Failed to disconnect wallet.");
            } finally {
                setloading(false);
            }
        } else {
            toast.info("No wallet connected or logout unavailable.");
        }
    };
    // --- End Web3 Wallet ---


    // --- KYC ---
    const openKYC = () => {
        if (account) {
            // Use the correct KYC link
            window.open("https://in.sumsub.com/websdk/p/sbx_uni_0QqOEO6d80eZs07V", "_blank");
        } else {
            toast.error('Please connect your wallet first to start KYC.'); // Changed message slightly
        }
    };
    // --- End KYC ---


    // --- Application Logout ---
    const handleAppLogout = () => {
        setloading(true); // Show loader

        // No need for setTimeout unless you want an artificial delay
        // Clear wallet connection state *first* if desired, though wallet disconnect is separate now
        // await handleWalletDisconnect(); // Optional: disconnect wallet on app logout

        // Clear application session data
        localStorage.removeItem('userRole');
        localStorage.removeItem('authToken'); // Use the key you stored the token with
        localStorage.removeItem('KeepLoggedIn');
        // localStorage.clear(); // Use if you want to clear everything

        toast.success("Logged out successfully!");
        history.push("/login"); // Redirect to the main login page
        setloading(false); // Stop loader (might happen after redirect starts)

    };
    // --- End Application Logout ---


    if (loading) {
        return <Loader />; // Show loader during logout or wallet connection
    }

    return (
        <>
            <div
                className="sidebar"
                data-color={props.bgColor}
                data-active-color={props.activeColor}
            >
                {/* Logo and Mobile Header */}
                <div className="logo for-mobilesidebar-sm">
                    {/* Conditional Link based on role? Or always to user dashboard? */}
                    <Link to={userRole === 'super_admin' ? "/admin/fund" : "/admin/dashbord"} className="simple-text logo-mini">
                        <div className="logo-img text-left">
                            <img src="\logo.svg" alt="react-logo" className="logoimg" />
                        </div>
                    </Link>
                    <img
                        src="/assets/images/Close.svg"
                        alt="Close" // Improved alt text
                        className="img-fluid img-close d-none" // d-none hides it initially? Check CSS
                        onClick={openSidebar}
                    />
                </div>

                {/* Mobile Nav - Needs state management if search/wallet connect is functional here */}
                <div className="mblnavbtns d-none">
                    {/* ... mobile search and buttons ... */}
                    {/* These likely need proper state and handlers if they are meant to be functional */}
                </div>


                <div className="sidebar-wrapper" ref={sidebar}>
                    <Nav>

                        {/* == Conditional Links == */}

                        {/* --- User Specific Links --- */}
                        {userRole === 'user' && (
                            <>
                                <li>
                                    <NavLink
                                        to="/admin/dashbord" // User Dashboard Route
                                        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                                    >
                                        <div className="fstdivmain">
                                            <div className="inersecdiv">
                                                {/* Dashboard SVG */}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="iconns">
                                                    <path d="M7.24 2H5.34C3.15 2 2 3.15 2 5.33V7.23C2 9.41 3.15 10.56 5.33 10.56H7.23C9.41 10.56 10.56 9.41 10.56 7.23V5.33C10.57 3.15 9.42 2 7.24 2Z" fill="#3E3E3E" />
                                                    <path d="M18.6699 2H16.7699C14.5899 2 13.4399 3.15 13.4399 5.33V7.23C13.4399 9.41 14.5899 10.56 16.7699 10.56H18.6699C20.8499 10.56 21.9999 9.41 21.9999 7.23V5.33C21.9999 3.15 20.8499 2 18.6699 2Z" fill="#3E3E3E" />
                                                    <path d="M18.6699 13.4301H16.7699C14.5899 13.4301 13.4399 14.5801 13.4399 16.7601V18.6601C13.4399 20.8401 14.5899 21.9901 16.7699 21.9901H18.6699C20.8499 21.9901 21.9999 20.8401 21.9999 18.6601V16.7601C21.9999 14.5801 20.8499 13.4301 18.6699 13.4301Z" fill="#3E3E3E" />
                                                    <path d="M7.24 13.4301H5.34C3.15 13.4301 2 14.5801 2 16.7601V18.6601C2 20.8501 3.15 22.0001 5.33 22.0001H7.23C9.41 22.0001 10.56 20.8501 10.56 18.6701V16.7701C10.57 14.5801 9.42 13.4301 7.24 13.4301Z" fill="#3E3E3E" />
                                                </svg>
                                                <p>Dashboard</p>
                                            </div>
                                        </div>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/admin/buy" // User Buy Route
                                        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                                    >
                                        <div className="fstdivmain">
                                            <div className="inersecdiv">
                                                {/* Buy SVG */}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16 12.75H12.75V16C12.75 16.41 12.41 16.75 12 16.75C11.59 16.75 11.25 16.41 11.25 16V12.75H8C7.59 12.75 7.25 12.41 7.25 12C7.25 11.59 7.59 11.25 8 11.25H11.25V8C11.25 7.59 11.59 7.25 12 7.25C12.41 7.25 12.75 7.59 12.75 8V11.25H16C16.41 11.25 16.75 11.59 16.75 12C16.75 12.41 16.41 12.75 16 12.75Z" fill="#3E3E3E" />
                                                </svg>
                                                <p>Buy</p>
                                            </div>
                                        </div>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/admin/sell" // User Sell Route
                                        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                                    >
                                        <div className="fstdivmain">
                                            <div className="inersecdiv">
                                                {/* Sell SVG */}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="iconns">
                                                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17.25 12.33C17.25 12.74 16.91 13.08 16.5 13.08C16.09 13.08 15.75 12.74 15.75 12.33V9.31L8.03 17.03C7.88 17.18 7.69 17.25 7.5 17.25C7.31 17.25 7.12 17.18 6.97 17.03C6.68 16.74 6.68 16.26 6.97 15.97L14.69 8.25H11.67C11.26 8.25 10.92 7.91 10.92 7.5C10.92 7.09 11.26 6.75 11.67 6.75H16.5C16.91 6.75 17.25 7.09 17.25 7.5V12.33Z" fill="#3E3E3E" />
                                                </svg>
                                                <p>Sell</p>
                                            </div>
                                        </div>
                                    </NavLink>
                                </li>

                                {/* User KYC Button - Placed within user-specific section */}
                                <li>
                                    <button onClick={openKYC} className="navcommonbtn" style={{ width: 'calc(100% - 30px)', margin: '10px 15px' }}>
                                        Start KYC
                                    </button>
                                </li>
                            </>
                        )}

                        {/* --- Admin Specific Link --- */}
                        {userRole === 'super_admin' && (
                            <li>
                                <NavLink
                                    to="/admin/fund" // Admin Fund Route
                                    className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                                >
                                    <div className="fstdivmain">
                                        <div className="inersecdiv">
                                            {/* Fund SVG */}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <g clipPath="url(#clip0_341_2190)">
                                                    <path d="M6.51505 4.26562H11.7661C12.5181 2.58028 13.8404 1.21748 13.8515 1.19531C14.0624 0.998438 14.1187 0.703125 14.0062 0.435938C13.8937 0.16875 13.6406 0 13.3594 0C12.0937 0 11.4047 0.45 10.8562 0.815625C10.364 1.15312 9.98436 1.40625 9.14061 1.40625C8.29686 1.40625 7.91717 1.15312 7.42498 0.815625C6.87654 0.45 6.18748 0 4.92186 0C4.64061 0 4.38748 0.16875 4.27498 0.435938C4.16248 0.703125 4.21873 0.998438 4.42967 1.19531C4.44078 1.21748 5.76308 2.58028 6.51505 4.26562Z" fill="#EAB721" />
                                                    <path d="M14.1094 21.8906V23.2969C14.1094 23.6852 14.4242 24 14.8125 24H23.2969C23.6852 24 24 23.6852 24 23.2969V21.8906C24 21.5023 23.6852 21.1875 23.2969 21.1875H14.8125C14.4242 21.1875 14.1094 21.5023 14.1094 21.8906Z" fill="#EAB721" />
                                                    <path d="M24 19.0781V17.6719C24 17.2836 23.6852 16.9688 23.2969 16.9688H14.8125C14.4242 16.9688 14.1094 17.2836 14.1094 17.6719V19.0781C14.1094 19.4664 14.4242 19.7812 14.8125 19.7812H23.2969C23.6852 19.7812 24 19.4664 24 19.0781Z" fill="#EAB721" />
                                                    <path d="M14.0203 11.3719C12.6422 10.0219 11.5172 8.87813 11.2922 7.07812H11.9531C12.3469 7.07812 12.6562 6.76875 12.6562 6.375C12.6562 5.98125 12.3469 5.67188 11.9531 5.67188H6.32812C5.93437 5.67188 5.625 5.98125 5.625 6.375C5.625 6.76875 5.93437 7.07812 6.32812 7.07812H6.98906C6.76406 8.87813 5.63906 10.0219 4.26094 11.3719C2.26406 13.3266 0 15.5484 0 20.625C0.028125 22.4813 1.61719 24 3.51562 24H12.7856C12.7069 23.7792 12.6562 23.5444 12.6562 23.2969V17.6719C12.6562 16.5089 13.6027 15.5625 14.7656 15.5625H17.2842C16.4334 13.7391 15.1716 12.5016 14.0203 11.3719ZM9.14062 15.5625C10.3038 15.5625 11.25 16.5087 11.25 17.6719C11.25 18.5873 10.6604 19.3605 9.84375 19.6517V20.4844C9.84375 20.873 9.52927 21.1875 9.14062 21.1875C8.75198 21.1875 8.4375 20.873 8.4375 20.4844V19.6517C7.62084 19.3605 7.03125 18.5873 7.03125 17.6719C7.03125 17.2832 7.34573 16.9688 7.73438 16.9688C8.12302 16.9688 8.4375 17.2832 8.4375 17.6719C8.4375 18.0598 8.75269 18.375 9.14062 18.375C9.52856 18.375 9.84375 18.0598 9.84375 17.6719C9.84375 17.2839 9.52856 16.9688 9.14062 16.9688C7.97747 16.9688 7.03125 16.0225 7.03125 14.8594C7.03125 13.9439 7.62084 13.1708 8.4375 12.8795V12.0469C8.4375 11.6582 8.75198 11.3438 9.14062 11.3438C9.52927 11.3438 9.84375 11.6582 9.84375 12.0469V12.8795C10.6604 13.1707 11.25 13.9439 11.25 14.8594C11.25 15.248 10.9355 15.5625 10.5469 15.5625C10.1582 15.5625 9.84375 15.248 9.84375 14.8594C9.84375 14.4714 9.52856 14.1562 9.14062 14.1562C8.75269 14.1562 8.4375 14.4714 8.4375 14.8594C8.4375 15.2473 8.75269 15.5625 9.14062 15.5625Z" fill="#EAB721" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_341_2190">
                                                        <rect width="24" height="24" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                            <p>Fund</p>
                                        </div>
                                    </div>
                                </NavLink>
                            </li>
                        )}

                        {/* Moved KYC Button for User Role Above */}
                        {/* Consider if Admin needs KYC button too? */}
                        {/* {userRole === 'super_admin' && (
                 <li>
                   <button onClick={openKYC} className="navcommonbtn" style={{ width: 'calc(100% - 30px)', margin: '10px 15px' }}>
                       Start KYC (Admin)
                   </button>
                 </li>
             )} */}

                    </Nav>

                    {/* App Logout Button - Always visible if logged in (role exists) */}
                    {userRole && (
                        <button className="btn-logout" onClick={handleAppLogout} style={{ marginTop: '40px' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                <path opacity="0.2" d="M19.25 4.8125V17.1875C19.25 17.5522 19.1051 17.9019 18.8473 18.1598C18.5894 18.4176 18.2397 18.5625 17.875 18.5625H4.125V3.4375H17.875C18.2397 3.4375 18.5894 3.58237 18.8473 3.84023C19.1051 4.09809 19.25 4.44783 19.25 4.8125Z" fill="white" />
                                <path d="M10.3125 18.5625C10.3125 18.7448 10.2401 18.9197 10.1111 19.0486C9.9822 19.1776 9.80734 19.25 9.625 19.25H4.125C3.94266 19.25 3.7678 19.1776 3.63886 19.0486C3.50993 18.9197 3.4375 18.7448 3.4375 18.5625V3.4375C3.4375 3.25516 3.50993 3.0803 3.63886 2.95136C3.7678 2.82243 3.94266 2.75 4.125 2.75H9.625C9.80734 2.75 9.9822 2.82243 10.1111 2.95136C10.2401 3.0803 10.3125 3.25516 10.3125 3.4375C10.3125 3.61984 10.2401 3.7947 10.1111 3.92364C9.9822 4.05257 9.80734 4.125 9.625 4.125H4.8125V17.875H9.625C9.80734 17.875 9.9822 17.9474 10.1111 18.0764C10.2401 18.2053 10.3125 18.3802 10.3125 18.5625ZM19.7364 10.5136L16.2989 7.07609C16.1699 6.94709 15.9949 6.87462 15.8125 6.87462C15.6301 6.87462 15.4551 6.94709 15.3261 7.07609C15.1971 7.2051 15.1246 7.38006 15.1246 7.5625C15.1246 7.74494 15.1971 7.9199 15.3261 8.04891L17.5905 10.3125H9.625C9.44266 10.3125 9.2678 10.3849 9.13886 10.5139C9.00993 10.6428 8.9375 10.8177 8.9375 11C8.9375 11.1823 9.00993 11.3572 9.13886 11.4861C9.2678 11.6151 9.44266 11.6875 9.625 11.6875H17.5905L15.3261 13.9511C15.1971 14.0801 15.1246 14.2551 15.1246 14.4375C15.1246 14.6199 15.1971 14.7949 15.3261 14.9239C15.4551 15.0529 15.6301 15.1254 15.8125 15.1254C15.9949 15.1254 16.1699 15.0529 16.2989 14.9239L19.7364 11.4864C19.8003 11.4226 19.851 11.3467 19.8856 11.2633C19.9202 11.1798 19.938 11.0903 19.938 11C19.938 10.9097 19.9202 10.8202 19.8856 10.7367C19.851 10.6533 19.8003 10.5774 19.7364 10.5136Z" fill="white" />
                            </svg>
                            Log Out
                        </button>
                    )}

                    {/* Wallet Connect/Disconnect Button */}
                    <div className="logout"> {/* Consider renaming this class */}
                        {account ? (
                            <button className="btn-connect" onClick={handleWalletDisconnect}>
                                Disconnect Wallet
                                {/* Optionally show part of the address: ` (${account.substring(0, 6)}...${account.substring(account.length - 4)})` */}
                            </button>
                        ) : (
                            <button className="btn-connect" onClick={handleShow}>
                                Connect Wallet
                            </button>
                        )}
                    </div>

                </div>
            </div>

            {/* Connect Wallet Modal */}
            <Modal className='investmodal ' show={show} onHide={handleClose} centered>
                <Modal.Header className='modal-headerchld' closeButton>
                    <Modal.Title> Connect Wallet</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="connectwalletmodalbody">
                        <div className="walletcoonectmodalwallet" onClick={connectMetaMask1}>
                            <img src="/assets/dashboard/metamask 2.png" alt="Metamask Logo" className="img-fluid" />
                            <a>Metamask</a>
                        </div>
                        <div className="walletcoonectmodalwallet" onClick={trustWallet}>
                            <img src="/assets/dashboard/walletconnect.png" alt="WalletConnect Logo" />
                            <a>WalletConnect</a>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Sidebar;













///////////////////////////////////////////////////////////////////////

import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useHistory, useLocation } from "react-router-dom";
import "./style.scss";
import { Nav } from "reactstrap";
import PerfectScrollbar from "perfect-scrollbar";
// import routes from "routes.js"; // Routes might not be needed if navigation is purely role-based now
import { Modal } from "react-bootstrap";
import { useWeb3React } from "@web3-react/core";
// import { setupNetwork } from "utils/wallet"; // Keep if network switching is used
import useAuth from "hook/useAuth";
import { toast } from "react-toastify";
import Loader from "hook/loader";

// Declare the component
function Sidebar(props) {
    const history = useHistory();
    const sidebar = useRef(null);
    // const [brandName, setBrandName] = useState(""); // Probably not needed anymore
    const [show, setShow] = useState(false);
    const location = useLocation();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [loading, setloading] = useState(false);

    // Read role directly on render
    const userRole = localStorage.getItem('userRole');

    // Initialize PerfectScrollbar
    useEffect(() => {
        let ps;
        if (navigator.platform.indexOf("Win") > -1 && sidebar.current) {
            ps = new PerfectScrollbar(sidebar.current, {
                suppressScrollX: true,
                suppressScrollY: false,
            });
        }
        return () => {
            if (ps) {
                ps.destroy();
            }
        };
    }, []);

    // Toggle sidebar visibility
    const openSidebar = () => {
        document.documentElement.classList.toggle("nav-open");
    };

    // ============================  WEB3   ============================ //
    const { login, logout } = useAuth();
    let { account, chainId } = useWeb3React();

    const connectMetaMask1 = async () => {
        if (!account) {
            try {
                login("injected");
                localStorage.setItem("connectorId", "injected");
                localStorage.setItem("flag", "true");
                handleClose();
            } catch (error) {
                console.error("Metamask connection failed:", error);
                toast.error("Failed to connect Metamask.");
                handleClose();
            }
        } else {
            handleClose();
        }
    };

    const trustWallet = async () => {
        if (!account) {
            try {
                login("walletconnect");
                localStorage.setItem("connectorId", "walletconnect");
                localStorage.setItem("flag", "true");
                handleClose();
            } catch (err) {
                console.error("WalletConnect connection failed:", err);
                toast.error("Failed to connect with WalletConnect.");
                handleClose();
            }
        } else {
            handleClose();
        }
    };

    const logoutHandle = async () => {
        try {
            const connectorId = window.localStorage.getItem("connectorId");
            if (connectorId) {
                await logout(connectorId);
            }
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            localStorage.removeItem("connectorId");
            localStorage.removeItem("flag");
            // Update UI state if needed, account should become null via useWeb3React
            toast.info("Wallet disconnected.");
        }
    };
    // ============================  /WEB3   ============================ //


    const handleLogOut = () => {
        setloading(true);
        setTimeout(async () => {
            if (account) {
                await logoutHandle(); // Disconnect wallet first
            }
            localStorage.removeItem("token");
            localStorage.removeItem("userRole");
            // Avoid localStorage.clear() if other items need persistence
            toast.success("Logged out successfully!");
            history.push("/login");
            // No need to manually stop loading here, component will unmount/redirect
        }, 1500);
    };

    // Determine logo link based on role
    const getLogoLinkTarget = () => {
        if (userRole === 'super_admin') {
            return "/admin/fund";
        } else if (userRole === 'content_admin') {
            return "/admin/dashboard"; // Default for content_admin
        }
        return "/login"; // Fallback if no role or unknown role
    };
    const logoLinkTarget = getLogoLinkTarget();


    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <div
                className="sidebar"
                data-color={props.bgColor}
                data-active-color={props.activeColor}
            >
                {/* Logo Section */}
                <div className="logo for-mobilesidebar-sm">
                    <Link to={logoLinkTarget} className="simple-text logo-mini">
                        <div className="logo-img text-left">
                            {/* Make sure the logo path is correct relative to the public folder */}
                            <img src="/logo.svg" alt="react-logo" className="logoimg" />
                        </div>
                    </Link>
                    {/* Close button for mobile */}
                    <img
                        src="/assets/images/Close.svg" // Ensure path is correct
                        alt="Close sidebar"
                        className="img-fluid img-close d-none"
                        onClick={openSidebar}
                    />
                </div>

                {/* Mobile Nav Buttons - Simplified */}
                <div className="mblnavbtns d-none">
                    {/* Wallet Button */}
                    {account ? (
                        <button className="navcommonbtn whitebtn" onClick={logoutHandle}>
                            <p className="btninnerpara">Disconnect</p>
                        </button>
                    ) : (
                        <button className="navcommonbtn" onClick={handleShow}>
                            Connect Wallet
                        </button>
                    )}
                </div>

                {/* Sidebar Navigation Wrapper */}
                <div className="sidebar-wrapper" ref={sidebar}>
                    <Nav>

                        {/* == CONDITIONAL NAVIGATION BASED ON ROLE == */}

                        {/* --- Links for content_admin --- */}
                        {userRole === 'content_admin' && (
                            <>
                                <li>
                                    <NavLink
                                        to="/admin/dashboard"
                                        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                                    >
                                        <div className="fstdivmain">
                                            <div className="inersecdiv">
                                                {/* Dashboard SVG */}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="iconns">
                                                    <path d="M7.24 2H5.34C3.15 2 2 3.15 2 5.33V7.23C2 9.41 3.15 10.56 5.33 10.56H7.23C9.41 10.56 10.56 9.41 10.56 7.23V5.33C10.57 3.15 9.42 2 7.24 2Z" fill="currentColor" />
                                                    <path d="M18.6699 2H16.7699C14.5899 2 13.4399 3.15 13.4399 5.33V7.23C13.4399 9.41 14.5899 10.56 16.7699 10.56H18.6699C20.8499 10.56 21.9999 9.41 21.9999 7.23V5.33C21.9999 3.15 20.8499 2 18.6699 2Z" fill="currentColor" />
                                                    <path d="M18.6699 13.4301H16.7699C14.5899 13.4301 13.4399 14.5801 13.4399 16.7601V18.6601C13.4399 20.8401 14.5899 21.9901 16.7699 21.9901H18.6699C20.8499 21.9901 21.9999 20.8401 21.9999 18.6601V16.7601C21.9999 14.5801 20.8499 13.4301 18.6699 13.4301Z" fill="currentColor" />
                                                    <path d="M7.24 13.4301H5.34C3.15 13.4301 2 14.5801 2 16.7601V18.6601C2 20.8501 3.15 22.0001 5.33 22.0001H7.23C9.41 22.0001 10.56 20.8501 10.56 18.6701V16.7701C10.57 14.5801 9.42 13.4301 7.24 13.4301Z" fill="currentColor" />
                                                </svg>
                                                <p>Dashboard</p>
                                            </div>
                                        </div>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/admin/buy"
                                        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                                    >
                                        <div className="fstdivmain">
                                            <div className="inersecdiv">
                                                {/* Buy SVG */}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16 12.75H12.75V16C12.75 16.41 12.41 16.75 12 16.75C11.59 16.75 11.25 16.41 11.25 16V12.75H8C7.59 12.75 7.25 12.41 7.25 12C7.25 11.59 7.59 11.25 8 11.25H11.25V8C11.25 7.59 11.59 7.25 12 7.25C12.41 7.25 12.75 7.59 12.75 8V11.25H16C16.41 11.25 16.75 11.59 16.75 12C16.75 12.41 16.41 12.75 16 12.75Z" fill="currentColor" />
                                                </svg>
                                                <p>Buy</p>
                                            </div>
                                        </div>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/admin/sell"
                                        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                                    >
                                        <div className="fstdivmain">
                                            <div className="inersecdiv">
                                                {/* Sell SVG */}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="iconns">
                                                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17.25 12.33C17.25 12.74 16.91 13.08 16.5 13.08C16.09 13.08 15.75 12.74 15.75 12.33V9.31L8.03 17.03C7.88 17.18 7.69 17.25 7.5 17.25C7.31 17.25 7.12 17.18 6.97 17.03C6.68 16.74 6.68 16.26 6.97 15.97L14.69 8.25H11.67C11.26 8.25 10.92 7.91 10.92 7.5C10.92 7.09 11.26 6.75 11.67 6.75H16.5C16.91 6.75 17.25 7.09 17.25 7.5V12.33Z" fill="currentColor" />
                                                </svg>
                                                <p>Sell</p>
                                            </div>
                                        </div>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/admin/settinguser" // Check route name
                                        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                                    >
                                        <div className="fstdivmain">
                                            <div className="inersecdiv">
                                                {/* Settings SVG */}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    {/* Simple Gear Icon Example */}
                                                    <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" fill="currentColor" />
                                                </svg>
                                                <p>Settings</p>
                                            </div>
                                        </div>
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {/* --- Link for super_admin --- */}
                        {userRole === 'super_admin' && (
                            <li>
                                <NavLink
                                    to="/admin/fund"
                                    className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                                >
                                    <div className="fstdivmain">
                                        <div className="inersecdiv">
                                            {/* Fund SVG */}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <g clipPath="url(#clip0_fund_svg_unique)"> {/* Unique ID */}
                                                    <path d="M6.51505 4.26562H11.7661C12.5181 2.58028 13.8404 1.21748 13.8515 1.19531C14.0624 0.998438 14.1187 0.703125 14.0062 0.435938C13.8937 0.16875 13.6406 0 13.3594 0C12.0937 0 11.4047 0.45 10.8562 0.815625C10.364 1.15312 9.98436 1.40625 9.14061 1.40625C8.29686 1.40625 7.91717 1.15312 7.42498 0.815625C6.87654 0.45 6.18748 0 4.92186 0C4.64061 0 4.38748 0.16875 4.27498 0.435938C4.16248 0.703125 4.21873 0.998438 4.42967 1.19531C4.44078 1.21748 5.76308 2.58028 6.51505 4.26562Z" fill="currentColor" />
                                                    <path d="M14.1094 21.8906V23.2969C14.1094 23.6852 14.4242 24 14.8125 24H23.2969C23.6852 24 24 23.6852 24 23.2969V21.8906C24 21.5023 23.6852 21.1875 23.2969 21.1875H14.8125C14.4242 21.1875 14.1094 21.5023 14.1094 21.8906Z" fill="currentColor" />
                                                    <path d="M24 19.0781V17.6719C24 17.2836 23.6852 16.9688 23.2969 16.9688H14.8125C14.4242 16.9688 14.1094 17.2836 14.1094 17.6719V19.0781C14.1094 19.4664 14.4242 19.7812 14.8125 19.7812H23.2969C23.6852 19.7812 24 19.4664 24 19.0781Z" fill="currentColor" />
                                                    <path d="M14.0203 11.3719C12.6422 10.0219 11.5172 8.87813 11.2922 7.07812H11.9531C12.3469 7.07812 12.6562 6.76875 12.6562 6.375C12.6562 5.98125 12.3469 5.67188 11.9531 5.67188H6.32812C5.93437 5.67188 5.625 5.98125 5.625 6.375C5.625 6.76875 5.93437 7.07812 6.32812 7.07812H6.98906C6.76406 8.87813 5.63906 10.0219 4.26094 11.3719C2.26406 13.3266 0 15.5484 0 20.625C0.028125 22.4813 1.61719 24 3.51562 24H12.7856C12.7069 23.7792 12.6562 23.5444 12.6562 23.2969V17.6719C12.6562 16.5089 13.6027 15.5625 14.7656 15.5625H17.2842C16.4334 13.7391 15.1716 12.5016 14.0203 11.3719ZM9.14062 15.5625C10.3038 15.5625 11.25 16.5087 11.25 17.6719C11.25 18.5873 10.6604 19.3605 9.84375 19.6517V20.4844C9.84375 20.873 9.52927 21.1875 9.14062 21.1875C8.75198 21.1875 8.4375 20.873 8.4375 20.4844V19.6517C7.62084 19.3605 7.03125 18.5873 7.03125 17.6719C7.03125 17.2832 7.34573 16.9688 7.73438 16.9688C8.12302 16.9688 8.4375 17.2832 8.4375 17.6719C8.4375 18.0598 8.75269 18.375 9.14062 18.375C9.52856 18.375 9.84375 18.0598 9.84375 17.6719C9.84375 17.2839 9.52856 16.9688 9.14062 16.9688C7.97747 16.9688 7.03125 16.0225 7.03125 14.8594C7.03125 13.9439 7.62084 13.1708 8.4375 12.8795V12.0469C8.4375 11.6582 8.75198 11.3438 9.14062 11.3438C9.52927 11.3438 9.84375 11.6582 9.84375 12.0469V12.8795C10.6604 13.1707 11.25 13.9439 11.25 14.8594C11.25 15.248 10.9355 15.5625 10.5469 15.5625C10.1582 15.5625 9.84375 15.248 9.84375 14.8594C9.84375 14.4714 9.52856 14.1562 9.14062 14.1562C8.75269 14.1562 8.4375 14.4714 8.4375 14.8594C8.4375 15.2473 8.75269 15.5625 9.14062 15.5625Z" fill="currentColor" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_fund_svg_unique">
                                                        <rect width="24" height="24" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                            <p>Fund</p>
                                        </div>
                                    </div>
                                </NavLink>
                            </li>
                        )}

                        {/* == End Conditional Links == */}

                    </Nav>

                    {/* --- Common Buttons Below Navigation --- */}

                    {/* Logout Button */}
                    <button
                        className="btn-logout"
                        onClick={handleLogOut}
                        style={{ marginTop: 'auto', marginBottom: '20px' }} // Position towards bottom
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                            <path opacity="0.2" d="M19.25 4.8125V17.1875C19.25 17.5522 19.1051 17.9019 18.8473 18.1598C18.5894 18.4176 18.2397 18.5625 17.875 18.5625H4.125V3.4375H17.875C18.2397 3.4375 18.5894 3.58237 18.8473 3.84023C19.1051 4.09809 19.25 4.44783 19.25 4.8125Z" fill="white" />
                            <path d="M10.3125 18.5625C10.3125 18.7448 10.2401 18.9197 10.1111 19.0486C9.9822 19.1776 9.80734 19.25 9.625 19.25H4.125C3.94266 19.25 3.7678 19.1776 3.63886 19.0486C3.50993 18.9197 3.4375 18.7448 3.4375 18.5625V3.4375C3.4375 3.25516 3.50993 3.0803 3.63886 2.95136C3.7678 2.82243 3.94266 2.75 4.125 2.75H9.625C9.80734 2.75 9.9822 2.82243 10.1111 2.95136C10.2401 3.0803 10.3125 3.25516 10.3125 3.4375C10.3125 3.61984 10.2401 3.7947 10.1111 3.92364C9.9822 4.05257 9.80734 4.125 9.625 4.125H4.8125V17.875H9.625C9.80734 17.875 9.9822 17.9474 10.1111 18.0764C10.2401 18.2053 10.3125 18.3802 10.3125 18.5625ZM19.7364 10.5136L16.2989 7.07609C16.1699 6.94709 15.9949 6.87462 15.8125 6.87462C15.6301 6.87462 15.4551 6.94709 15.3261 7.07609C15.1971 7.2051 15.1246 7.38006 15.1246 7.5625C15.1246 7.74494 15.1971 7.9199 15.3261 8.04891L17.5905 10.3125H9.625C9.44266 10.3125 9.2678 10.3849 9.13886 10.5139C9.00993 10.6428 8.9375 10.8177 8.9375 11C8.9375 11.1823 9.00993 11.3572 9.13886 11.4861C9.2678 11.6151 9.44266 11.6875 9.625 11.6875H17.5905L15.3261 13.9511C15.1971 14.0801 15.1246 14.2551 15.1246 14.4375C15.1246 14.6199 15.1971 14.7949 15.3261 14.9239C15.4551 15.0529 15.6301 15.1254 15.8125 15.1254C15.9949 15.1254 16.1699 15.0529 16.2989 14.9239L19.7364 11.4864C19.8003 11.4226 19.851 11.3467 19.8856 11.2633C19.9202 11.1798 19.938 11.0903 19.938 11C19.938 10.9097 19.9202 10.8202 19.8856 10.7367C19.851 10.6533 19.8003 10.5774 19.7364 10.5136Z" fill="white" />
                        </svg>
                        Log Out
                    </button>

                    {/* Wallet Connect/Disconnect Button */}
                    <div className="logout"> {/* Reusing class, maybe rename? */}
                        {account ? (
                            <button className="btn-connect" onClick={logoutHandle}>
                                {/* Display short address or icon */}
                                {`${account.substring(0, 6)}...${account.substring(account.length - 4)}`}
                                <span style={{ marginLeft: '8px' }}>(Disconnect)</span>
                            </button>
                        ) : (
                            <button className="btn-connect" onClick={handleShow}>
                                Connect Wallet
                            </button>
                        )}
                    </div>

                </div> {/* End sidebar-wrapper */}
            </div> {/* End sidebar */}


            {/* Modal for Wallet Connection */}
            <Modal className='investmodal' show={show} onHide={handleClose} centered>
                <Modal.Header className='modal-headerchld' closeButton>
                    <Modal.Title>Connect Wallet</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="connectwalletmodalbody">
                        <div className="walletcoonectmodalwallet" onClick={connectMetaMask1}>
                            {/* Ensure image paths are correct */}
                            <img src="/assets/dashboard/metamask 2.png" alt="Metamask" className="img-fluid" />
                            <a>Metamask</a>
                        </div>
                        <div className="walletcoonectmodalwallet" onClick={trustWallet}>
                            {/* Ensure image paths are correct */}
                            <img src="/assets/dashboard/walletconnect.png" alt="WalletConnect" />
                            <a>WalletConnect</a>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

        </>
    );
}

export default Sidebar;