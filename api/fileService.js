// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://filevaultbackend-production.up.railway.app/api/v1', // adjust if needed
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const processFile = (formData) => {
  return api.post('/process-file', formData, {
    responseType: 'blob', // Important: tells axios to expect binary data
  });
};

export const processText = ({ text, password, algorithm, mode }) => {
    console.log(algorithm)
  return axios.post('https://filevaultbackend-production.up.railway.app/api/v1/process-text', {
    text,
    password,
    algorithm,
    mode,
  }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};