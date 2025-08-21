import { useState } from 'react';

const useImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageError, setImageError] = useState("");

  const handleImageChange = (file, onError) => {
    setImageError("");

    if (file) {
      if (!file.type.startsWith('image/')) {
        const errorMsg = "Please select a valid image file";
        setImageError(errorMsg);
        if (onError) onError('selectedImage', errorMsg);
        return false;
      }
      
      if (file.size > 10 * 1024 * 1024) {
        const errorMsg = "Image size should be less than 10MB";
        setImageError(errorMsg);
        if (onError) onError('selectedImage', errorMsg);
        return false;
      }

      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
      return true;
    }
    return false;
  };

  const resetImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setImageError("");
  };

  return {
    selectedImage,
    imagePreview,
    imageError,
    handleImageChange,
    resetImage,
    setImageError
  };
};

export default useImageUpload;
