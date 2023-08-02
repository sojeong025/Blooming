import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import classes from './Splash.module.css';
import axios from 'axios';

function Splash() {
  const navigate = useNavigate();
  const [isRendered, setIsRendered] = useState(false)

  const url = "http://43.200.254.50:8080/profile";
  const headers = {
    Authorization_Refresh: `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJSZWZyZXNoVG9rZW4iLCJleHAiOjE2OTIxNTI0ODd9.wpVAOt3pL87_7Hx7crwD6tzwn4-GZg6R0Dk2ridiBvJSmh1hQIpyN5-e4bBKsJVvRg-4JhRAqKKY4onfRptjlA`,
  };

  const response = axios.get(url, { headers })
  console.log(response)
  console.log(response.headers['Authorization'])
  console.log(response.headers['Authorization_refresh'])
  // useEffect(() => {
  //   const localRefreshToken = localStorage.getItem('refreshToken');

    // if (localRefreshToken) {
    //   // 여기서 서버에 로그인 요청을 보내고 로그인이 유효한 경우 home으로 이동한다
    //   // 로그인이 실패하면 accessToken이 만료된 것으로 간주하고 refreshToken을 사용하여 accessToken을 다시 가져온 뒤 로컬에 저장한다.

      
    //   try {
    //     // 헤더 포함하여 GET 요청 보내기
    //     const response = axios.get(url, { headers });
    //     console.log("응답 데이터:", response.data);
    //     // 토큰이 유효한 경우
    //     // if (response.data === 'T') {
    //     //   localStorage.setItem('accessToken', response.data.accessToken);
    //     //   localStorage.setItem('refreshToken', response.data.refreshToken);
    //     //   navigate("/home");
    //     // } else {
    //     //   // 토큰이 유효하지 않은 경우
    //     //   // refreshToken 보낼꺼임
    //     //   navigate("/login")
    //     // }
    //   } catch (error) {
    //     // 에러 처리
    //     console.error("API 요청 에러:", error);
    //   }
    // } else {
    //   // 로그인이 되지 않은 경우 login 페이지로 이동
    //   setIsRendered(true);
    // }
  // }, []);

  // useEffect(() => {
  //   if (isRendered) {
  //     const timer = setTimeout(() => {
  //       navigate('/login');
  //     }, 3500);

  //     return () => clearTimeout(timer);
  //   }
  // }, [navigate, isRendered]);

  return (
    <div className={classes.div}>
      <motion.div
        className={classes.container}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.0 }}
      >
        {/* 로딩 중일 때의 내용 */}
      </motion.div>
    </div>
  );
}

export default Splash;
