import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import classes from './Splash.module.css';

function Splash() {
  const navigate = useNavigate(); // useNavigate를 사용하여 navigate 함수를 가져옵니다.

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login'); // Join 페이지로 이동합니다.
    }, 3500);

    return () => clearTimeout(timer); // 컴포넌트가 언마운트될 때 타이머를 정리합니다.
  }, [navigate]);

  return (
    <motion.div
      className={classes.container}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2.0 }}
    >
      {/* 로딩 중일 때의 내용 */}
    </motion.div>
  );
}

export default Splash;
