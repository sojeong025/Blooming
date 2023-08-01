import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import classes from './Splash.module.css';

function Splash() {
  const navigate = useNavigate();
  const [isRendered, setIsRendered] = useState(false)

  useEffect(() => {
    const localAccessToken = localStorage.getItem('accessToken');
    const localRefreshToken = localStorage.getItem('refreshToken');

    if (localAccessToken) {
      // 여기서 서버에 로그인 요청을 보내고 로그인이 유효한 경우 home으로 이동한다
      // 로그인이 실패하면 accessToken이 만료된 것으로 간주하고 refreshToken을 사용하여 accessToken을 다시 가져온 뒤 로컬에 저장한다.
  
      // 로그인이 유효한 경우
      // navigate('/home');
  
      // 로그인이 실패한 경우
      // navigate('/login');
    } else {
      // 로그인이 되지 않은 경우 login 페이지로 이동
      setIsRendered(true);
    }
  }, []);

  useEffect(() => {
    if (isRendered) {
      const timer = setTimeout(() => {
        navigate('/login');
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
