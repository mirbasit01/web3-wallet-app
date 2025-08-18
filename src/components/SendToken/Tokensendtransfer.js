// import React, { useState } from 'react'
// import useTokensend from 'hook/useTokensend';

// const Tokensendtransfer = () => {

//     const [amountuser, setAmountuser] = useState("");
//     const [toAddress, setToAddress] = useState("");

//     const { handleSendToken } = useTokensend()



//     const handlePayment = () => {
//         if (!amountuser && !toAddress) {
//             alert('Please fill in both address and amount');
//             return
//         }
//         try {

//             const send = handleSendToken(toAddress, amountuser)


//             console.log(send)
//         } catch (error) {
//             console.log(error)

//         }

//     }

//     return (
//         <>
//             <div>
//                 <div >
//                     <h2>Transfer Sepolia</h2>
//                     <div >
//                         <input
//                             type="text"
//                             placeholder="Recipient Address"
//                             value={toAddress}
//                             onChange={(e) => setToAddress(e.target.value)}
//                             style={{ width: '500px', height: '20px', fontSize: '16px', padding: '8px', color: 'black' }}
//                             className='border-4'
//                         />
//                     </div>
//                     <div>
//                         <input
//                             type="text"
//                             placeholder="Amount"
//                             value={amountuser}
//                             onChange={(e) => setAmountuser(e.target.value)}
//                             style={{ width: '200px', height: '20px', fontSize: '16px', padding: '8px', marginTop: "10px", color: 'black', }}
//                             className='border-4'
//                         />
//                     </div>
//                 </div>
//                 <button
//                     style={{
//                         color: 'black'
//                     }}
//                     className='text-black'
//                     onClick={handlePayment}
//                 >
//                     Pay Now
//                     {/* {started ? "Confirming..." : "Pay Now"} */}
//                 </button>
//             </div>
//         </>
//     )
// }

// export default Tokensendtransfer
import React, { useState } from 'react';
import useTokensend from 'hook/useTokensend';
import './TokenComponents.css'; // Import the CSS file
import { toast } from 'react-toastify';

const TokenSendTransfer = () => {
  const [amountuser, setAmountuser] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [addressError, setAddressError] = useState("");
  const [amountError, setAmountError] = useState("");

  const { handleSendToken } = useTokensend();

  // Validate Ethereum address
  const isValidAddress = (address) => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };

  // Validate amount
  const isValidAmount = (amount) => {
    return !isNaN(amount) && parseFloat(amount) > 0;
  };

  // Handle input changes with validation
  const handleAddressChange = (e) => {
    const value = e.target.value;
    setToAddress(value);
    setAddressError("");
    setError("");
    setSuccess("");

    if (value && !isValidAddress(value)) {
      setAddressError("Please enter a valid Ethereum address");
    }
  };

 
  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmountuser(value);
    setAmountError("");
    setError("");
    setSuccess("");

    if (value && !isValidAmount(value)) {
      setAmountError("Please enter a valid amount");
    }
  };

  const handlePayment = async () => {
    // Reset states
    setError("");
    setSuccess("");
    setAddressError("");
    setAmountError("");

    // Validation
    if (!toAddress.trim()) {
      setAddressError("Recipient address is required");
      return;
    }

    if (!amountuser.trim()) {
      setAmountError("Amount is required");
      return;
    }

    if (!isValidAddress(toAddress)) {
      setAddressError("Please enter a valid Ethereum address");
      return;
    }

    if (!isValidAmount(amountuser)) {
      setAmountError("Please enter a valid amount");
      return;
    }

    try {
      setLoading(true);
      const result = await handleSendToken(toAddress, amountuser);
      console.log('Transaction result:', result);

      setSuccess(`🎉 Transaction sent successfully! Hash: ${result?.hash || 'N/A'}`);

      // Clear form after successful transaction
      setTimeout(() => {
        setToAddress("");
        setAmountuser("");
        setSuccess("");
      }, 5000);

    } catch (error) {
      console.error('Transaction error:', error);
      setError(`Transaction failed: ${error.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="token-transfer-container">
      <div className="transfer-header">
        <h2 className="transfer-title text-glow">
          🚀 Send Tokens
        </h2>
        <p className="transfer-subtitle">
          Transfer your tokens to any Ethereum address
        </p>
      </div>

      <form className="transfer-form" onSubmit={(e) => e.preventDefault()}>
        {/* Recipient Address Input */}
        <div className="input-group">
          <label className="input-label">
            📍 Recipient Address
          </label>
          <input
            type="text"
            placeholder="0x742d35Cc6634C0532925a3b8D11A234C7a3D6C4d"
            value={toAddress}
            onChange={handleAddressChange}
            className={`input-field address-input ${addressError ? 'error' : ''}`}
            disabled={loading}
          />
          {addressError && <div className="error-message">{addressError}</div>}
        </div>

        {/* Amount Input */}
        <div className="">
          <label className="">
            💵 Amount
          </label>
          <div className="amount-input-container">
            <input
              type="number"
              placeholder="0.00"
              value={amountuser}
              onChange={handleAmountChange}
              className={`input-field ${amountError ? 'error' : ''}`}
              step="0.000001"
              min="0"
              disabled={loading}
            />
            <div className="currency-badge">TOKENS</div>
          </div>
          {amountError && <div className="error-message">{amountError}</div>}
        </div>

        {/* Submit Button */}
        <button
          type="button"
          className="transfer-button"
          onClick={handlePayment}
          disabled={loading || !toAddress || !amountuser || addressError || amountError}
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              Processing Transaction...
            </>
          ) : (
            <>
              ⚡ Send Tokens Now
            </>
          )}
        </button>

        {/* Error Message */}
        {error && (
          <div className="error-state" style={{ marginTop: '1rem', padding: '1rem' }}>
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="success-message">
            {success}
          </div>
        )}

        {/* Transaction Info */}
        <div style={{
          marginTop: '1.5rem',
          padding: '1rem',
          background: 'rgba(255, 255, 255, 0.03)',
          borderRadius: '8px',
          fontSize: '0.85rem',
          color: '#8892b0',
          lineHeight: '1.5'
        }}>
          <div style={{ marginBottom: '0.5rem' }}>
            <strong style={{ color: '#00d4ff' }}>💡 Transaction Tips:</strong>
          </div>
          <div>• Double-check the recipient address before sending</div>
          <div>• Ensure you have enough ETH for gas fees</div>
          <div>• Transactions are irreversible once confirmed</div>
          <div>• Network fees vary based on congestion</div>
        </div>
      </form>
    </div>
  );
};

export default TokenSendTransfer;