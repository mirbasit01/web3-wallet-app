// File: src/api/httpClient.ts
import axios from 'axios';

// No need to extend ImportMeta or ImportMetaEnv, Vite provides types automatically

const httpClient = axios.create({
    baseURL: 'https://prod-api.goldenloonie.com',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

export default httpClient;