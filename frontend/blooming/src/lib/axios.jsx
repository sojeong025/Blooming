import axios from "axios";

const SERVER_ADDRESS = "http://43.200.254.50:8080";

// 토큰 제대로 받아오기
const token =
  "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTY5MDk0NzgyNywiZW1haWwiOiJsb3R1czAwMjhAa2FrYW8uY29tIn0.0kthqBLFoI4Lu5rbU4kcQKiU9w9Ufcgv1xQPmrWe1zNP3_xnbvQB5FvjbEVdsgM_bMmTbVcDcyFycmb6JYnAsA";

export const customAxios = axios.create({
  baseURL: `${SERVER_ADDRESS}`,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
