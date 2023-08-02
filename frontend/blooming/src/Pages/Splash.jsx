import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import classes from "./Splash.module.css";
import axios from "axios";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { accessTokenState, refreshTokenState } from "../recoil/TokenAtom";
import { customAxios } from "../lib/axios";
import { userState } from "../recoil/ProfileAtom";

function Splash() {
  const navigate = useNavigate();
  const [isRendered, setIsRendered] = useState(false);
  const url = "http://43.200.254.50:8080/profile";
  const localRefreshToken = localStorage.getItem("refreshToken");
  const [accessToken, setAcceesToken] = useRecoilState(accessTokenState);
  const [refreshToken, setRefreshToken] = useRecoilState(refreshTokenState);

  // 유저 정보를 저장
  const setUserState = useSetRecoilState(userState);
  const resetUserState = useResetRecoilState(userState);

  useEffect(() => {
    if (localRefreshToken) {
      // 여기서 서버에 로그인 요청을 보내고 로그인이 유효한 경우 home으로 이동한다
      // 로그인이 실패하면 accessToken이 만료된 것으로 간주하고 refreshToken을 사용하여 accessToken을 다시 가져온 뒤 로컬에 저장한다.
      let headers = {
        Authorization_Refresh: `Bearer ${localRefreshToken}`,
      };
      try {
        // 헤더 포함하여 GET 요청 보내기
        const response = axios.get(url, { headers });

        if (
          response.headers["Authorization"] &
          response.headers["Authorization_refresh"]
        ) {
          // 토큰 저장 후 headers 변경
          setAcceesToken(response.headers["Authorization"]);
          setRefreshToken(response.headers["Authorization_refresh"]);
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          headers = {
            Authorization: `Bearer ${accessToken}`,
          };
          try {
            // 유저 정보 조회
            const res = axios.get(url, { headers });
            if (res.data) {
              setUserState(res.data.result[0]);
              navigate("/home");
            }
          } catch (error) {
            // 유저 정보 초기회
            resetUserState();
            console.error("유저 정보 API 요청 에러:", error);
          }
        } else {
          navigate("/login");
        }
      } catch (error) {
        // 에러 처리
        console.error("API 요청 에러:", error);
      }
    } else {
      // 로그인이 되지 않은 경우 login 페이지로 이동
      setIsRendered(true);
    }
  }, []);

  useEffect(() => {
    if (isRendered) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [navigate, isRendered]);

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
