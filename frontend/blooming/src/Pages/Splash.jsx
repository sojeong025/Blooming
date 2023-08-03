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

  // 유저 정보를 저장
  const setUserState = useSetRecoilState(userState);
  const resetUserState = useResetRecoilState(userState);

  useEffect(() => {
    const fetchData = async () => {
      if (localRefreshToken) {
        let headers = {
          Authorization_Refresh: `Bearer ${localRefreshToken}`,
        };
        try {
          // 헤더 포함하여 GET 요청 보내기
          const response = await axios.get(url, { headers });
          console.log(response);
          if (
            response.headers["authorization"] &&
            response.headers["authorization_refresh"]
          ) {
            console.log(
              response.headers["authorization"],
              response.headers["authorization_refresh"],
            );
            localStorage.setItem(
              "accessToken",
              response.headers["authorization"],
            );
            localStorage.setItem(
              "refreshToken",
              response.headers["authorization_refresh"],
            );
            headers = {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            };
            try {
              // 유저 정보 조회
              const res = await axios.get(url, { headers });
              console.log(res);
              if (res.data) {
                console.log(res.data);
                console.log(res.data.result[0]);
                setUserState(res.data.result[0]);
                navigate("/home");
              }
            } catch (error) {
              // 유저 정보 초기화
              resetUserState();
              console.error("유저 정보 API 요청 에러: 추가 정보 미입력", error);
              // 추가정보 페이지로 이동
              navigate("/join");
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
    };
    fetchData();
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
