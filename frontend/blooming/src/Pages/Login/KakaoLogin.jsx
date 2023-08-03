import { useLocation, useNavigate } from "react-router-dom";
import { accessTokenState, refreshTokenState } from "../../recoil/TokenAtom";
import { useRecoilState } from "recoil";
import { useEffect } from "react";

function KakaoLogin() {
  const [access, setAccess] = useRecoilState(accessTokenState)
  // const [refresh, setRefresh] = useRecoilState(refreshTokenState)
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  // Access Token과 Refresh Token 추출
  const accessTokenParam = searchParams.get("access_token");
  // const refreshTokenParam = searchParams.get("refresh_token");
  const isUser = searchParams.get("is_user");

  // Access Token과 Refresh Token에서 "Bearer " 부분을 제거하고, 공백을 제거
  const accessToken = accessTokenParam ? accessTokenParam.replace("Bearer ", "").trim() : null;
  // const refreshToken = refreshTokenParam ? refreshTokenParam.replace("Bearer ", "").trim() : null;

  // Access Token과 Refresh Token 출력 (디버깅용)
  console.log("Access Token:", accessToken);
  // console.log("Refresh Token:", refreshToken);

  // accessToken이 있는 경우 /join 페이지로 이동
  const goTo = async () => {
    if (accessToken) {
      await localStorage.setItem('accessToken', accessToken)
      await setAccess(accessToken)
      // await localStorage.setItem('refreshToken', refreshToken)
      // setRefresh(refreshToken)
      if (access) {
        if (isUser === 'T') {
          navigate("/home")
        } else if (isUser === 'F') {
          navigate("/join");
        }
      }
    }
  }

  useEffect(() => {
    goTo()
  }, []);
}

export default KakaoLogin;