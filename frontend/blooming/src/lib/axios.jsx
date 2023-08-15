import axios from "axios";

const SERVER_ADDRESS = "https://i9e104.p.ssafy.io/api/";

export const customAxios = axios.create({
  baseURL: `${SERVER_ADDRESS}`,
  headers: {
    "Content-Type": "application/json",
  },
});

customAxios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const fileAxios = axios.create({
  baseURL: `${SERVER_ADDRESS}/s3`,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

fileAxios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
