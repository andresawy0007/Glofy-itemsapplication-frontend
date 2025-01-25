import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://reqres.in/api/', // Replace this URL with the Backend Application
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;