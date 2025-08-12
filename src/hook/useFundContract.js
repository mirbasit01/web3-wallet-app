// // src/hooks/useFundContract.js
// import { ethers } from 'ethers';
// import { FUND_CONTRACT_ADDRESS } from 'utils/fundContractAddress';
// import { FUND_CONTRACT_ABI } from 'utils/fundcontractAbi';
// import { toast } from 'react-toastify';
// import { useWeb3React } from "@web3-react/core";
// import useWeb3 from './useWeb3';


// const useFundContract = () => {
//     const web3 = useWeb3();
//     const { account } = useWeb3React();
//         const tokenAddress = FUND_CONTRACT_ADDRESS


//     const addFundOnChain = async (fundName, fundAmount, fundDescription, imageMetadataURI) => {
//         // if (!window.ethereum) {
//         //     toast.error("MetaMask (or a compatible Web3 wallet) is not installed. Please install it to use this feature.");
//         //     return null;
//         // }

//         try {
//             const provider = new ethers.providers.Web3Provider(window.ethereum);
//             await provider.send("eth_requestAccounts", []); // Request account access
//             const signer = provider.getSigner();
//             const contract = new ethers.Contract(FUND_CONTRACT_ADDRESS, FUND_CONTRACT_ABI, signer);

//             // Convert fundAmount to Wei (or the smallest unit your contract expects)
//             // Ensure fundAmount is a string for parseEther
//             const amountInWei = ethers.utils.parseEther(fundAmount.toString());

//             // The name of the function in your smart contract (e.g., createFund, addFund)
//             // Make sure the parameters match your contract's function signature
//             // The last argument to the contract call is an options object, e.g., for sending value with the tx
//             const txOptions = {
//                 // value: amountInWei, // If the createFund function itself is payable and should receive this amount.
//                 // If fundAmount is just metadata and funds are handled separately, remove this.
//             };

//             // Call the contract function (e.g., "createFund")
//             // Adjust contractFunctionName and parameters as per your contract
//             const contractFunctionName = 'createFund'; // Change this to your actual function name from ABI

//             toast.info("Please confirm the transaction in your wallet...");
//             const tx = await contract[contractFunctionName](
//                 fundName,
//                 amountInWei, // Or fundAmount directly if your contract doesn't expect Wei / handles conversion
//                 fundDescription,
//                 imageMetadataURI, // This could be IPFS hash(es) of images, or a link to a metadata JSON
//                 txOptions,
//             );

//             toast.info("Transaction sent. Waiting for confirmation...");
//             const receipt = await tx.wait(); // Wait for the transaction to be mined

//             console.log("Transaction successful:", receipt);
//             return receipt;

//         } catch (error) {
//             console.error("Smart contract transaction error:", error);
//             let errorMessage = "Failed to add fund on-chain.";
//             if (error.code === 4001) { // User rejected transaction
//                 errorMessage = "Transaction rejected by user.";
//             } else if (error.data?.message) {
//                 errorMessage = `Contract Error: ${error.data.message}`;
//             } else if (error.message) {
//                 errorMessage = error.message;
//             }
//             toast.error(errorMessage);
//             return null;
//         }
//     };

//     return { addFundOnChain };
// };

// export default useFundContract;


// Step 1: Remove the ethers.js import completely. We don't need it.
// import { ethers } from 'ethers'; 

// Keep all the other imports
import { FUND_CONTRACT_ADDRESS } from 'utils/fundContractAddress';
import { FUND_CONTRACT_ABI } from 'utils/fundcontractAbi';
import { toast } from 'react-toastify';
import { useWeb3React } from "@web3-react/core";
import useWeb3 from './useWeb3';

const useFundContract = () => {
    // These are correct! You get the web3 instance and the user's account.
    const web3 = useWeb3();
    const { account } = useWeb3React();

    // The function name can be anything, but let's call it handleAddFund for clarity
    const handleAddFund = async (fundName, fundAmount, fundDescription, imageMetadataURI) => {
        // First, check if the wallet is connected.
        if (!web3 || !account) {
            toast.error("Please connect your wallet first.");
            return null;
        }

        // Step 2: Create a contract instance using the web3.js syntax.
        // This is the line that was missing.
        const contract = new web3.eth.Contract(FUND_CONTRACT_ABI, FUND_CONTRACT_ADDRESS);

        try {
            // Step 3: Convert the amount to Wei using the web3.js syntax.
            const amountInWei = web3.utils.toWei(fundAmount.toString(), 'ether');

            const contractFunctionName = 'createFund';

            toast.info("Please confirm the transaction in your wallet...");

            // Step 4: Call the contract function using the web3.js syntax.
            // Notice it's `contract.methods.yourFunction().send()`
            // The `.send()` method will automatically ask MetaMask to pop up.
            // It returns the transaction receipt directly when it's confirmed.
            const receipt = await contract.methods[contractFunctionName](
                fundName,
                amountInWei,
                fundDescription,
                imageMetadataURI
            ).send({ from: account }); // You must specify who is sending the transaction

            toast.success("Transaction confirmed! Fund added successfully.");
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
            
            toast.error(errorMessage);
            return null;
        }
    };

    // Return the correctly named function
    return { handleAddFund };
};


export default useFundContract;