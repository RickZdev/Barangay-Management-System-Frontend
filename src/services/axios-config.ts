import Axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { useNavigate } from "react-router-dom"; // Import useHistory from react-router-dom

export const BASE_URL = import.meta.env.VITE_LOCAL_SERVER_URL;
// const BASE_URL = import.meta.env.VITE_API_SERVER_URL;

const axios = Axios.create({
  baseURL: BASE_URL,
});

const authApi = Axios.create({
  baseURL: BASE_URL,
});

// const isTokenExpired = (token: string) => {
//   try {
//     const decodedToken = jwt.verify(token, "barangaynavotasmanagementsecret");

//     const currentTime = Math.floor(Date.now() / 1000); // Get current timestamp in seconds
//     return decodedToken.exp <= currentTime;
//   } catch (error) {
//     // Token verification failed, consider it as expired
//     return true;
//   }
// };

const onRequest = async (config: InternalAxiosRequestConfig) => {
  // Get the token from your storage (localStorage, sessionStorage, etc.)
  const token = JSON.parse(localStorage?.getItem("accessToken")!); // assuming you store your token in localStorage

  // If a token exists, add it to the Authorization header
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  console.log("Request Error:", error);
  if (error.response?.status === 401) {
    console.log("Unauthorized Access - Redirecting to Login Page");
  }

  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse) => {
  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

axios.interceptors.request.use(onRequest, onRequestError);
axios.interceptors.response.use(onResponse, onResponseError);

export { axios, authApi };
