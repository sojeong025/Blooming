import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import classes from "./Splash.module.css";
import axios from "axios";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { customAxios } from "../lib/axios";

import { userState } from "../recoil/ProfileAtom";

function Splash() {
  const navigate = useNavigate();
  const [isRendered, setIsRendered] = useState(false);
  const url = import.meta.env.VITE_AUTOLOGIN_URL;
  const localRefreshToken = localStorage.getItem("refreshToken");

  // 유저 정보를 저장
  const setUserState = useSetRecoilState(userState);
  const resetUserState = useResetRecoilState(userState);

  const setThemeState = (gender) => {
    const rootElement = document.documentElement;

    switch (gender) {
      case "MALE":
        rootElement.style.setProperty("--color-point", "var(--color-groom)");
        rootElement.style.setProperty(
          "--color-point-text",
          "var(--color-groom-text)",
        );
        rootElement.style.setProperty(
          "--color-point-opacity",
          "var(--color-groom-opacity)",
        );
        break;
      case "FEMALE":
        rootElement.style.setProperty("--color-point", "var(--color-brider)");
        rootElement.style.setProperty(
          "--color-point-text",
          "var(--color-brider-text)",
        );
        rootElement.style.setProperty(
          "--color-point-opacity",
          "var(--color-brider-opacity)",
        );
        break;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (localRefreshToken) {
        const headers = {
          "Content-Type": "application/json",
          Authorization_refresh: `Bearer ${localRefreshToken}`,
        };
        // console.log("refresh", headers);
        try {
          // 헤더 포함하여 GET 요청 보내기
          const response = await axios.get(url, { headers });
          // console.log(response);
          if (
            response.headers["authorization"] &&
            response.headers["authorization_refresh"]
          ) {
            // console.log(
            //   response.headers["authorization"],
            //   response.headers["authorization_refresh"],
            // );
            localStorage.setItem(
              "accessToken",
              response.headers["authorization"],
            );
            localStorage.setItem(
              "refreshToken",
              response.headers["authorization_refresh"],
            );
            try {
              // 유저 정보 조회
              const res = await customAxios("profile");
              if (res.data) {
                setUserState({ ...res.data.result[0] });
                setThemeState(res.data.result[0].gender);
                navigate("/home");
              }
            } catch (error) {
              // 유저 정보 초기화
              resetUserState();
              // console.error("유저 정보 API 요청 에러: 추가 정보 미입력", error);
              // 추가정보 페이지로 이동
              navigate("/login");
            }
          } else {
            // console.log("header에 토큰이 없다?");
            navigate("/login");
          }
        } catch (error) {
          // 리프레시토큰이 유효하지 않을 경우
          console.log("유효하지 않은 refresh Token");
          navigate("/login");
        }
      } else {
        // 로그인이 되지 않은 경우 login 페이지로 이동
        setIsRendered(true);
      }
    };

    const delayFetchData = () => {
      setTimeout(() => {
        fetchData();
      }, 2000);
    };

    delayFetchData();
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
      <div className={classes.container}>
        <motion.div
          className={classes.container}
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{
            duration: 2.5,
            times: [0, 0.5, 1],
            ease: "easeInOut",
          }}
        >
          {/* <img src='src/assets/Logo/ring.png' alt='' /> */}
          <img
            className={classes.logoimg}
            src='src/assets/Logo/ringring.png'
            alt=''
          />
        </motion.div>
        <div className={classes.logocon}>
          {/* <img src='src/assets/Logo/text.png' alt='' /> */}
          <img
            className={classes.logologo}
            src='src/assets/Logo/logologo.png'
            alt=''
          />
        </div>
      </div>
    </div>
  );
}

export default Splash;
