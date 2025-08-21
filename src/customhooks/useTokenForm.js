import { useState } from 'react';

const useTokenForm = () => {
  const [formData, setFormData] = useState({
    // Original states
    amountuser: "",
    toAddress: "",
    // Token metadata states
    tokenName: "",
    tokenDescription: "",
    tokenPrice: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const updateField = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
    
    // Clear messages when user starts typing
    setError("");
    setSuccess("");
  };

  const resetForm = () => {
    setFormData({
      amountuser: "",
      toAddress: "",
      tokenName: "",
      tokenDescription: "",
      tokenPrice: ""
    });
    setError("");
    setSuccess("");
  };

  const setLoadingState = (isLoading) => {
    setLoading(isLoading);
  };

  const setErrorMessage = (message) => {
    setError(message);
  };

  const setSuccessMessage = (message) => {
    setSuccess(message);
  };

  return {
    formData,
    loading,
    error,
    success,
    updateField,
    resetForm,
    setLoadingState,
    setErrorMessage,
    setSuccessMessage
  };
};

export default useTokenForm;
