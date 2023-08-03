import axios from "axios";

const SERVER_ADDRESS = "http://43.200.254.50:8080";
const accessToken = localStorage.getItem('accessToken')

export const customAxios = axios.create({
  baseURL: `${SERVER_ADDRESS}`,
  headers: {
    'Authorization' : `Bearer ${accessToken}`,
    'Content-Type' : 'application/json',
  },
});

