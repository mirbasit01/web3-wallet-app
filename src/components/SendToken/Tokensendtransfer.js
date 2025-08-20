
import React, { useState } from 'react';
import useTokensend from 'hook/useTokensend';
import './TokenComponents.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { API_URL } from 'utils/api/Enviroment';

const TokenSendTransfer = () => {
  // Original states
  const [amountuser, setAmountuser] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [addressError, setAddressError] = useState("");
  const [amountError, setAmountError] = useState("");

  // New states for IPFS metadata
  const [tokenName, setTokenName] = useState("");
  const [tokenDescription, setTokenDescription] = useState("");
  const [tokenPrice, setTokenPrice] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [ipfsHash, setIpfsHash] = useState("");
  const [uploadingToIPFS, setUploadingToIPFS] = useState(false);

  // Validation errors for new fields
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [imageError, setImageError] = useState("");

  const [ALdata, setALdata] = useState('')

  const [alldatametaforapi, setalldatametaforapi] = useState('')

  const { handleSendToken } = useTokensend();
  const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhNDJmMTJmMi0yYjM3LTQ5ZjUtOTg1Zi1jZGU4Y2NjYmEzYjkiLCJlbWFpbCI6Im1pcnQxMTQ3N0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNTZlNTA1NzI1ZmE3YTE0MzA4N2IiLCJzY29wZWRLZXlTZWNyZXQiOiJjMmNkNDhlNDY4MTI4MDA3MDQ1MDBlYmM3NDFmY2Y2YTZmOWViYjdkYzVlMjdiMjQ5MzhhYmEwOGQ3ODg1MGU5IiwiZXhwIjoxNzg3MTQ0Nzk2fQ.h5gQ-MOznNCAo5tSI45oRnd4LYdF_BEYeyJVAUea-I0'
  // Validate Ethereum address
  const isValidAddress = (address) => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };

  // Validate amount
  const isValidAmount = (amount) => {
    return !isNaN(amount) && parseFloat(amount) > 0;
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageError("");

    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setImageError("Please select a valid image file");
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setImageError("Image size should be less than 10MB");
        return;
      }

      setSelectedImage(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
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

  const handleNameChange = (e) => {
    const value = e.target.value;
    setTokenName(value);
    setNameError("");

    if (value && value.length < 3) {
      setNameError("Token name must be at least 3 characters");
    }
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setTokenDescription(value);
    setDescriptionError("");

    if (value && value.length < 10) {
      setDescriptionError("Description must be at least 10 characters");
    }
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    setTokenPrice(value);
    setPriceError("");

    if (value && !isValidAmount(value)) {
      setPriceError("Please enter a valid price");
    }
  };

  // Validate all fields
  const validateAllFields = () => {
    let isValid = true;

    if (!tokenName.trim()) {
      setNameError("Token name is required");
      isValid = false;
    } else if (tokenName.length < 3) {
      setNameError("Token name must be at least 3 characters");
      isValid = false;
    }

    if (!tokenDescription.trim()) {
      setDescriptionError("Description is required");
      isValid = false;
    } else if (tokenDescription.length < 10) {
      setDescriptionError("Description must be at least 10 characters");
      isValid = false;
    }

    if (!tokenPrice.trim()) {
      setPriceError("Price is required");
      isValid = false;
    } else if (!isValidAmount(tokenPrice)) {
      setPriceError("Please enter a valid price");
      isValid = false;
    }

    if (!selectedImage) {
      setImageError("Please select an image");
      isValid = false;
    }

    if (!toAddress.trim()) {
      setAddressError("Recipient address is required");
      isValid = false;
    } else if (!isValidAddress(toAddress)) {
      setAddressError("Please enter a valid Ethereum address");
      isValid = false;
    }

    if (!amountuser.trim()) {
      setAmountError("Amount is required");
      isValid = false;
    } else if (!isValidAmount(amountuser)) {
      setAmountError("Please enter a valid amount");
      isValid = false;
    }

    return isValid;
  };
  // Add this in your component to debug
  // console.log('JWT Token:', jwtToken);
  // console.log('Token length:', jwtToken?.length);
  // Upload to IPFS (Pinata API example)
  const uploadToIPFS = async () => {
    if (!selectedImage || !tokenName || !tokenDescription || !tokenPrice) {
      toast.error("Please fill all fields before uploading to IPFS");
      return null;
    }

    setUploadingToIPFS(true);

    try {
      // First upload image to IPFS
      const imageFormData = new FormData();
      imageFormData.append('file', selectedImage);

      const pinataMetadata = JSON.stringify({
        name: `${tokenName}-image`,
      });
      imageFormData.append('pinataMetadata', pinataMetadata);

      const pinataOptions = JSON.stringify({
        cidVersion: 0,
      });
      imageFormData.append('pinataOptions', pinataOptions);

      const imageUploadResponse = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
        },
        body: imageFormData,
      });

      if (!imageUploadResponse.ok) {
        throw new Error('Failed to upload image to IPFS');
      }

      const imageResult = await imageUploadResponse.json();
      const imageIPFSHash = imageResult.IpfsHash;

      // Create metadata object
      const metadata = {
        name: tokenName,
        description: tokenDescription,
        price: tokenPrice,
        image: `https://gateway.pinata.cloud/ipfs/${imageIPFSHash}`,
        attributes: [
          {
            trait_type: "Price",
            value: tokenPrice
          },
          {
            trait_type: "Created",
            value: new Date().toISOString()
          }
        ]
      };
      // jab create karte ho:
      setalldatametaforapi({
        name: tokenName,
        description: tokenDescription,
        price: tokenPrice,
        image: `https://gateway.pinata.cloud/ipfs/${imageIPFSHash}`,
        attributes: [
          { trait_type: "Price", value: tokenPrice },
          { trait_type: "Created", value: new Date().toISOString() }
        ]
      });
      console.log(metadata, 'metadatametadatametadatametadatametadata')
      // Upload metadata to IPFS
      const metadataResponse = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({
          pinataContent: metadata,
          pinataMetadata: {
            name: `${tokenName}-metadata`
          }
        }),
      });

      console.log(metadataResponse)

      if (!metadataResponse.ok) {
        throw new Error('Failed to upload metadata to IPFS');
      }

      const metadataResult = await metadataResponse.json();
      const metadataHash = metadataResult.IpfsHash;
      console.log(metadataResult, 'metadataResultmetadataResult')
      setIpfsHash(metadataHash);
      toast.success("Successfully uploaded to IPFS!");

      return metadataHash;

    } catch (error) {
      console.error('IPFS upload error:', error);
      toast.error(`IPFS upload failed: ${error.message}`);
      return null;
    } finally {
      setUploadingToIPFS(false);
    }
  };



  const handlePayment = async () => {
    setError("");
    setSuccess("");
    if (!validateAllFields()) {
      return;
    }
    try {
      setLoading(true);
      const ipfsMetadataHash = await uploadToIPFS();
      if (!ipfsMetadataHash) {
        throw new Error("Failed to upload to IPFS");
      }

      await newsapi()

      const result = await handleSendToken(toAddress, amountuser);
      console.log('Transaction result:', result);
      setSuccess(`Transaction sent successfully! Hash: ${result?.hash || 'N/A'}\nIPFS Metadata: ${ipfsMetadataHash}`);
      setTimeout(() => {
        setToAddress("");
        setAmountuser("");
        setTokenName("");
        setTokenDescription("");
        setTokenPrice("");
        setSelectedImage(null);
        setImagePreview(null);
        setIpfsHash("");
        setSuccess("");
      }, 10000);

    } catch (error) {
      console.error('Transaction error:', error);
      setError(`Transaction failed: ${error.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };



  const newsapi = async () => {
    console.log("Sending data:", alldatametaforapi);

    try {
      const res = await axios.post(`${API_URL}/create`,
        alldatametaforapi,
      )
      console.log(res)
      setALdata(res?.data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="token-transfer-container">
      <div className="transfer-header">
        <h2 className="transfer-title text-glow">
          Create & Send Token
        </h2>
        <p className="transfer-subtitle">
          Create a token with metadata and transfer to any Ethereum address
        </p>
      </div>

      <form className="transfer-form" onSubmit={(e) => e.preventDefault()}>

        {/* Token Metadata Section */}
        <div className="metadata-section" style={{
          marginBottom: '2rem',
          padding: '1.5rem',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <h3 style={{ color: '#00d4ff', marginBottom: '1rem', fontSize: '1.2rem' }}>
            Token Information
          </h3>

          {/* Token Name */}
          <div className="input-group">
            <label className="input-label">
              Token Name *
            </label>
            <input
              type="text"
              placeholder="My Awesome Token"
              value={tokenName}
              onChange={handleNameChange}
              className={`input-field ${nameError ? 'error' : ''}`}
              disabled={loading}
            />
            {nameError && <div className="error-message">{nameError}</div>}
          </div>

          {/* Token Description */}
          <div className="input-group">
            <label className="input-label">
              Description *
            </label>
            <textarea
              placeholder="Describe your token..."
              value={tokenDescription}
              onChange={handleDescriptionChange}
              className={`input-field ${descriptionError ? 'error' : ''}`}
              disabled={loading}
              rows="3"
              style={{ resize: 'vertical', minHeight: '80px' }}
            />
            {descriptionError && <div className="error-message">{descriptionError}</div>}
          </div>

          {/* Token Price */}
          <div className="input-group">
            <label className="input-label">
              Price (ETH) *
            </label>
            <input
              type="number"
              placeholder="0.001"
              value={tokenPrice}
              onChange={handlePriceChange}
              className={`input-field ${priceError ? 'error' : ''}`}
              step="0.000001"
              min="0"
              disabled={loading}
            />
            {priceError && <div className="error-message">{priceError}</div>}
          </div>

          {/* Image Upload */}
          <div className="">
            <label className="input-label">
              Token Image *
            </label>
            <div className="image-upload-container" style={{
              border: `2px dashed ${imageError ? '#ff6b6b' : 'rgba(255, 255, 255, 0.3)'}`,
              borderRadius: '8px',
              padding: '1rem',
              textAlign: 'center',
              background: 'rgba(255, 255, 255, 0.02)'
            }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={loading}
                style={{ display: 'none' }}
                id="image-upload"
              />
              <label htmlFor="image-upload" style={{ cursor: 'pointer' }}>
                {imagePreview ? (
                  <div>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{
                        maxWidth: '200px',
                        maxHeight: '200px',
                        borderRadius: '8px',
                        marginBottom: '0.5rem'
                      }}
                    />
                    <p style={{ color: '#8892b0', fontSize: '0.9rem' }}>
                      Click to change image
                    </p>
                  </div>
                ) : (
                  <div>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📁</div>
                    <p style={{ color: '#8892b0' }}>
                      Click to upload image (max 10MB)
                    </p>
                  </div>
                )}
              </label>
            </div>
            {imageError && <div className="error-message">{imageError}</div>}
          </div>

          {/* IPFS Status */}
          {ipfsHash && (
            <div style={{
              padding: '1rem',
              background: 'rgba(0, 212, 255, 0.1)',
              borderRadius: '8px',
              marginTop: '1rem'
            }}>
              <p style={{ color: '#00d4ff', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                ✅ Uploaded to IPFS
              </p>
              <p style={{ color: '#8892b0', fontSize: '0.85rem', wordBreak: 'break-all' }}>
                Hash: {ipfsHash}
              </p>
            </div>
          )}
        </div>

        {/* Transfer Section */}
        <div className="transfer-section">
          <h3 style={{ color: '#00d4ff', marginBottom: '1rem', fontSize: '1.2rem' }}>
            Transfer Details
          </h3>

          {/* Recipient Address Input */}
          <div className="input-group">
            <label className="input-label">
              Recipient Address *
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
            <label className="input-label">
              Amount *
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
        </div>

        {/* Submit Button */}
        <button
          type="button"
          className="transfer-button"
          onClick={handlePayment}
          disabled={loading || uploadingToIPFS}
          style={{ marginTop: '2rem' }}
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              Processing Transaction...
            </>
          ) : uploadingToIPFS ? (
            <>
              <span className="spinner"></span>
              Uploading to IPFS...
            </>
          ) : (
            <>
              Create & Send Token
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
          <div className="success-message" style={{ whiteSpace: 'pre-line' }}>
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
            <strong style={{ color: '#00d4ff' }}>💡 Important Notes:</strong>
          </div>
          <div>• All fields marked with * are required</div>
          <div>• Image will be uploaded to IPFS (decentralized storage)</div>
          <div>• Double-check the recipient address before sending</div>
          <div>• Ensure you have enough ETH for gas fees</div>
          <div>• Transactions are irreversible once confirmed</div>
          <div>• Replace YOUR_PINATA_JWT_TOKEN with your actual Pinata JWT</div>
        </div>
      </form>
    </div>
  );
};

export default TokenSendTransfer;