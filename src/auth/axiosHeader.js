import axios from 'axios';
// config

// ----------------------------------------------------------------------

const HOST_API_KEY = process.env.HOST_API_KEY || '';

const axiosInstance = axios.create({ baseURL: HOST_API_KEY });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
