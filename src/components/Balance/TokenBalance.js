// import { useEffect, useState } from "react";
// import Web3 from "web3";
//  import { contractABI } from "utils/contract/contractABI";
// import { contractAddress } from "utils/contract/contractAddress";
// import { useWeb3React } from "@web3-react/core";

// export default function TokenBalance() {
//   const [address, setAddress] = useState(null);
//   const [isConnected, setIsConnected] = useState(false);
//   const [balance, setBalance] = useState(null);
//   const [symbol, setSymbol] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//     let { account } = useWeb3React();


// //   useEffect(() => {
// //     // Check wallet connection
// //     const checkConnection = async () => {
// //       if (window.ethereum) {
// //         try {
// //           const accounts = await window.ethereum.request({ method: "eth_accounts" });
// //           if (accounts.length > 0) {
// //             setAddress(accounts[0]);
// //             setIsConnected(true);
// //           }
// //         } catch (err) {
// //           console.error(err);
// //           setError("Failed to check wallet connection");
// //         }
// //       }
// //     };
// //     checkConnection();
// //   }, []);

//   useEffect(() => {
//     if (account) {
//       fetchBalance();
//     }
//   }, [account]);

//   const fetchBalance = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const web3 = new Web3(window.ethereum);
//       const contract = new web3.eth.Contract(contractABI, contractAddress);
//       // Fetch balance, decimals, symbol in parallel
//       const [rawBalance, decimals, tokenSymbol] = await Promise.all([
//         contract.methods.balanceOf(account).call(),
//         contract.methods.decimals().call(),
//         contract.methods.symbol().call()
//       ]);
//       const readableBalance = Number(rawBalance) / (10 ** Number(decimals));
//       setBalance(readableBalance);
//       setSymbol(tokenSymbol);
//     } catch (err) {
//       console.error("Error fetching token balance:", err);
//       setError("Error fetching token balance");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!account) return <div className="text-black">Please connect wallet</div>;
//   if (loading) return <div className="text-black">Loading...</div>;
//   if (error) return <div className="text-red-500">{error}</div>;

//   return (
//     <div className="p-4 rounded shadow">
//       <h2 className="text-black font-bold mb-2">Your Token Balance</h2>
//       <p className="text-black">
//         {balance ?? 0} {symbol}
//       </p>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import Web3 from "web3";
import { contractABI } from "utils/contract/contractABI";
import { contractAddress } from "utils/contract/contractAddress";
import { useWeb3React } from "@web3-react/core";
import './TokenComponents.css'; // Import the CSS file

export default function TokenBalance() {
  const [address, setAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [balance, setBalance] = useState(null);
  const [symbol, setSymbol] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  let { account } = useWeb3React();

  useEffect(() => {
    if (account) {
      fetchBalance();
    }
  }, [account]);

  const fetchBalance = async () => {
    try {
      setLoading(true);
      setError(null);
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(contractABI, contractAddress);

      // Fetch balance, decimals, symbol in parallel
      const [rawBalance, decimals, tokenSymbol] = await Promise.all([
        contract.methods.balanceOf(account).call(),
        contract.methods.decimals().call(),
        contract.methods.symbol().call()
      ]);

      const readableBalance = Number(rawBalance) / (10 ** Number(decimals));
      setBalance(readableBalance);
      setSymbol(tokenSymbol);
    } catch (err) {
      console.error("Error fetching token balance:", err);
      setError("Error fetching token balance");
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="token-balance-container">
        <div className="loading-state">
          <div className="spinner"></div>
          Loading your token balance...
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="token-balance-container">
        <div className="error-state">
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚠️</div>
          {error}
          <br />
          <button
            onClick={fetchBalance}
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              background: 'transparent',
              border: '1px solid #ff4757',
              color: '#ff4757',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Not connected state
  if (!account) {
    return (
      <div className="token-balance-container">
        <div className="connect-state">
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔌</div>
          Please connect your wallet to view token balance
        </div>
      </div>
    );
  }

  return (
    <div className="token-balance-container">
      <div className="token-balance-header">
        <h2 className="token-balance-title text-glow">
          💰 Your Token Balance
        </h2>
        <div className="token-balance-icon">💎</div>
      </div>

      <div className="balance-display bg-glass">
        <div className="balance-amount balance-glow">
          {balance ? Number(balance).toFixed(6) : '0.000000'}
        </div>
        <div className="balance-symbol">
          {symbol || 'TOKEN'}
        </div>

        {/* Refresh button */}
        <button
          onClick={fetchBalance}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            background: 'rgba(0, 212, 255, 0.1)',
            border: '1px solid #00d4ff',
            color: '#00d4ff',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '500',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(0, 212, 255, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(0, 212, 255, 0.1)';
          }}
        >
          🔄 Refresh Balance
        </button>
      </div>

      {/* Account info */}
      <div style={{
        marginTop: '1rem',
        padding: '1rem',
        background: 'rgba(255, 255, 255, 0.03)',
        borderRadius: '8px',
        fontSize: '0.8rem',
        color: '#8892b0'
      }}>
        <strong>Account:</strong> {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'Not connected'}
      </div>
    </div>
  );
}