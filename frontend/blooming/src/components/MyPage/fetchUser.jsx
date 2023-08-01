// src/utils/fetchUser.js
// 모르겠어!!!!!!!!!!!!!!!!!!!!!
import axios from "axios";

const fetchUser = async (userId) => {
  try {
    const response = await axios.get(`http://43.200.254.50:8080/profile`);

    // axios에서 받아온 응답이 유효하다고 가정
    if (response.data && response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }

  return null;
};

export default fetchUser;
