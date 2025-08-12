import { useEffect, useState } from "react";
import Web3 from "web3";
 import { contractABI } from "utils/contract/contractABI";
import { contractAddress } from "utils/contract/contractAddress";
import { useWeb3React } from "@web3-react/core";
 
export default function TokenBalance() {
  const [address, setAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [balance, setBalance] = useState(null);
  const [symbol, setSymbol] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
    let { account } = useWeb3React();
  

//   useEffect(() => {
//     // Check wallet connection
//     const checkConnection = async () => {
//       if (window.ethereum) {
//         try {
//           const accounts = await window.ethereum.request({ method: "eth_accounts" });
//           if (accounts.length > 0) {
//             setAddress(accounts[0]);
//             setIsConnected(true);
//           }
//         } catch (err) {
//           console.error(err);
//           setError("Failed to check wallet connection");
//         }
//       }
//     };
//     checkConnection();
//   }, []);

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

  if (!account) return <div className="text-black">Please connect wallet</div>;
  if (loading) return <div className="text-black">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-4 rounded shadow">
      <h2 className="text-black font-bold mb-2">Your Token Balance</h2>
      <p className="text-black">
        {balance ?? 0} {symbol}
      </p>
    </div>
  );
}
