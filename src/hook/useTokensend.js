import React from 'react'
import { useWeb3React } from "@web3-react/core";
import useWeb3 from './useWeb3';
import { contractABI } from 'utils/contract/contractABI';
import { contractAddress } from 'utils/contract/contractAddress';

const useTokensend = () => {

    const web3 = useWeb3();
    const { account } = useWeb3React();
    const Signature = localStorage.getItem('Signature');
    const handleSendToken = async (toAddress, amountuser) => {
        if (!web3 || !account) {
            console.log("Please connect your wallet first.");
            return null;
        }
        if (Signature) {
            const contract = new web3.eth.Contract(contractABI, contractAddress);
            try {
                const amountInWei = web3.utils.toWei(amountuser.toString(), "ether");
                const contractFunctionName = 'transfer';
                console.log("Please confirm the transaction in your wallet...");
                const receipt = await contract.methods[contractFunctionName](toAddress, amountInWei).send({ from: account });
                console.log("Transaction successful:", receipt);
                return receipt;
            } catch (error) {
                console.error("Smart contract transaction error:", error);
                let errorMessage = "Failed to add fund on-chain.";
                if (error.code === 4001) {
                    errorMessage = "Transaction rejected by user.";
                } else if (error.message.includes("reverted")) {
                    errorMessage = "Transaction failed on the contract.";
                }
                return null;
            }

        } else {
            console.log('Plese add connect Signature')
        }
        // const signer = provider.getSigner();


    };

    return { handleSendToken };
}

export default useTokensend