
const SERVER_ADDRESS = "http://43.200.254.50:8080";
// const SERVER_ADDRESS = "";
const accessToken = localStorage.getItem("accessToken");

export const customAxios = axios.create({
  baseURL: `${SERVER_ADDRESS}`,
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  },
});

export const fileAxios = axios.create({
  baseURL: `${SERVER_ADDRESS}/s3`,
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "multipart/form-data",
  },
});