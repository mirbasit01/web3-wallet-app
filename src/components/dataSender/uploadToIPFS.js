import { toast } from "react-toastify";
import { IPFSJWTTOKEN } from "utils/api/Enviroment";

export const useuploadToIPFS = () => {
   
  const jwtToken = IPFSJWTTOKEN

    const uploadToIPFS =  async (selectedImage , tokenName, tokenDescription, tokenPrice, setalldatametaforapi , setIpfsHash, setUploadingToIPFS) => {
        
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
    }

    return uploadToIPFS;
};
