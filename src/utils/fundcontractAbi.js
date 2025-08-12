export const FUND_CONTRACT_ABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "description",
                "type": "string"
            },
            {
                "internalType": "string", // This could be IPFS hashes, URLs, etc.
                "name": "imageMetadataURI",
                "type": "string"
            }
        ],
        "name": "createFund", // Ensure this matches your contract's function name
        "outputs": [],
        "stateMutability": "payable", // Or nonpayable if it doesn't handle funds directly
        "type": "function"
    }
    // ... other ABI parts if needed by other functions
];