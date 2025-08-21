import { useState } from 'react';
import axios from 'axios';

const useAPI = (apiUrl ,fieldsToValidate) => {
  const [apiData, setApiData] = useState('');
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const sendToAPI = async () => {
    setApiLoading(true);
    setApiError('');
    
    try {
      console.log("Sending data to API:", );
      const response = await axios.post(`${apiUrl}/create`, fieldsToValidate);
      console.log("API Response:", response);
      setApiData(response?.data);
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      setApiError(error.message || 'API request failed');
      throw error;
    } finally {
      setApiLoading(false);
    }
  };

  const resetAPIState = () => {
    setApiData('');
    setApiError('');
  };

  return {
    apiData,
    apiLoading,
    apiError,
    sendToAPI,
    resetAPIState
  };
};

export default useAPI;
