import axios from "axios";

//  const HOST_API_KEY = process.env.LOCAL_API_KEY; 
const HOST_API_KEY = process.env.HOST_API_KEY;
const LOCAL_API_KEY = process.env.LOCAL_API_KEY;

const axiosInstance = axios.create({
  baseURL: `${HOST_API_KEY}api/`,
  timeout: 600000,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      error
    )
);

export { axiosInstance };
