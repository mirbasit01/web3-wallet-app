import React from 'react'
import { useWeb3React } from "@web3-react/core";
import useWeb3 from './useWeb3';
import { contractABI } from 'utils/contract/contractABI';
import { contractAddress } from 'utils/contract/contractAddress';

const useTokensend = () => {

    const web3 = useWeb3();
    const { account } = useWeb3React();

    const handleSendToken = async (toAddress, amountuser) => {
        // First, check if the wallet is connected.
        if (!web3 || !account) {
            console.log("Please connect your wallet first.");
            return null;
        }

        // Step 2: Create a contract instance using the web3.js syntax.
        // This is the line that was missing.
        const contract = new web3.eth.Contract(contractABI, contractAddress);

        try {
            // Step 3: Convert the amount to Wei using the web3.js syntax.
            // Convert to string & use 'ether' unit for 18 decimals
            const amountInWei = web3.utils.toWei(amountuser.toString(), "ether");

            const contractFunctionName = 'transfer';

            console.log("Please confirm the transaction in your wallet...");

            // Step 4: Call the contract function using the web3.js syntax.
            // Notice it's `contract.methods.yourFunction().send()`
            // The `.send()` method will automatically ask MetaMask to pop up.
            // It returns the transaction receipt directly when it's confirmed.
            const receipt = await contract.methods[contractFunctionName](
                toAddress,
                amountInWei
            ).send({ from: account }); // You must specify who is sending the transaction

            // toast.success("Transaction confirmed! Fund added successfully.");
            console.log("Transaction successful:", receipt);
            return receipt;

        } catch (error) {
            // Your error handling is excellent, we can keep it.
            console.error("Smart contract transaction error:", error);
            let errorMessage = "Failed to add fund on-chain.";
            if (error.code === 4001) { // User rejected transaction in MetaMask
                errorMessage = "Transaction rejected by user.";
            } else if (error.message.includes("reverted")) {
                errorMessage = "Transaction failed on the contract.";
            }

            // toast.error(errorMessage);
            return null;
        }
    };

    return { handleSendToken };
}

export default useTokensend