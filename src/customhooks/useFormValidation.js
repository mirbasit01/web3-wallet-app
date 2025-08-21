// hooks/useFormValidation.js
import { useState } from 'react';

const useFormValidation = () => {
  const [errors, setErrors] = useState({});

  const isValidAddress = (address) => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };

  const isValidAmount = (amount) => {
    return !isNaN(amount) && parseFloat(amount) > 0;
  };

  const validateField = (fieldName, value, validationRules) => {
    let errorMessage = "";

    switch (fieldName) {
      case 'tokenName':
        if (!value.trim()) {
          errorMessage = "Token name is required";
        } else if (value.length < 3) {
          errorMessage = "Token name must be at least 3 characters";
        }
        break;

      case 'tokenDescription':
        if (!value.trim()) {
          errorMessage = "Description is required";
        } else if (value.length < 10) {
          errorMessage = "Description must be at least 10 characters";
        }
        break;

      case 'tokenPrice':
        if (!value.trim()) {
          errorMessage = "Price is required";
        } else if (!isValidAmount(value)) {
          errorMessage = "Please enter a valid price";
        }
        break;

      case 'toAddress':
        if (!value.trim()) {
          errorMessage = "Recipient address is required";
        } else if (!isValidAddress(value)) {
          errorMessage = "Please enter a valid Ethereum address";
        }
        break;

      case 'amountuser':
        if (!value.trim()) {
          errorMessage = "Amount is required";
        } else if (!isValidAmount(value)) {
          errorMessage = "Please enter a valid amount";
        }
        break;

      case 'selectedImage':
        if (!value) {
          errorMessage = "Please select an image";
        }
        break;

      default:
        break;
    }

    setErrors(prev => ({
      ...prev,
      [fieldName]: errorMessage
    }));

    return !errorMessage;
  };

  const validateAllFields = (fields) => {
    let isValid = true;
    const newErrors = {};

    Object.entries(fields).forEach(([fieldName, value]) => {
      const fieldIsValid = validateField(fieldName, value);
      if (!fieldIsValid) {
        isValid = false;
      }
    });

    return isValid;
  };

  const clearError = (fieldName) => {
    setErrors(prev => ({
      ...prev,
      [fieldName]: ""
    }));
  };

  const clearAllErrors = () => {
    setErrors({});
  };

  return {
    errors,
    validateField,
    validateAllFields,
    clearError,
    clearAllErrors,
    isValidAddress,
    isValidAmount
  };
};

export default useFormValidation;