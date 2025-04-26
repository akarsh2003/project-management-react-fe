import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Attach token if needed in future
API.interceptors.request.use((req) => {
  // Example: if you store token in localStorage
  // const token = localStorage.getItem('token');
  // if (token) {
  //   req.headers.Authorization = `Bearer ${token}`;
  // }
  return req;
});

export default API;
