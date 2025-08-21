import { useState } from 'react';
import { toast } from 'react-toastify';

const useIPFSUpload = (jwtToken) => {
  const [ipfsHash, setIpfsHash] = useState("");
  const [uploadingToIPFS, setUploadingToIPFS] = useState(false);
  const [metadataForAPI, setMetadataForAPI] = useState(null);
  const [alldatametaforapi, setalldatametaforapi] = useState('')

  const uploadToIPFS = async (tokenData, selectedImage) => {
    const { tokenName, tokenDescription, tokenPrice } = tokenData;
    
    if (!selectedImage || !tokenName || !tokenDescription || !tokenPrice) {
      toast.error("Please fill all fields before uploading to IPFS");
      return null;
    }

    setUploadingToIPFS(true);

    try {
      // Upload image to IPFS
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
    //   setMetadataForAPI(metadata);

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

      if (!metadataResponse.ok) {
        throw new Error('Failed to upload metadata to IPFS');
      }

      const metadataResult = await metadataResponse.json();
      const metadataHash = metadataResult.IpfsHash;

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

  const resetIPFSData = () => {
    setIpfsHash("");
    setMetadataForAPI(null);
  };

  return {
    ipfsHash,
    uploadingToIPFS,
    metadataForAPI,
    uploadToIPFS,
    resetIPFSData,
    alldatametaforapi
  };
};

export default useIPFSUpload;
