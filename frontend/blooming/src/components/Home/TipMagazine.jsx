import { useEffect, useState } from "react";
import { customAxios } from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import classes from './TipMagazine.module.css'
import { useRef } from 'react'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function TipMagazine() {
  const sliderRef = useRef(null);
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <button className={classes.nextArrow}>&gt;</button>,
    prevArrow: <button className={classes.prevArrow}>&lt;</button>,
    beforeChange: (current, next) => setCurrentSlide(next), // 추가
  };

  const [currentSlide, setCurrentSlide] = useState(0);

  // const tipMagazine = [
  //   {
  //     "id": 1,
  //     "title": "웨딩 드레스 용어 TIP",
  //     "thumbnail": "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/tipbox/3_thumbnail.png"
  //   },
  //   {
  //     "id": 2,
  //     "title": "내 체형에 멋있는 턱시도",
  //     "thumbnail": "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/tipbox/2_thumbnail.png"
  //   },
  //   {
  //     "id": 3,
  //     "title": "내 체형에 예쁜 웨딩드레스",
  //     "thumbnail": "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/tipbox/1_thumbnail.png"
  //   },
  //   {
  //     "id": 4,
  //     "title": "영화 속 주인공같은 셀프 웨딩촬영",
  //     "thumbnail": "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/tipbox/4_thumbnail.png"
  //   },
  //   {
  //     "id": 5,
  //     "title": "화사한 피부를 위한 관리 노하우",
  //     "thumbnail": "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/tipbox/5_thumbnail.png"
  //   },
  //   {
  //     "id": 6,
  //     "title": "이색 결혼식",
  //     "thumbnail": "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/tipbox/6_thumbnail.png"
  //   },
  //   {
  //     "id": 7,
  //     "title": "주례 없는 결혼식",
  //     "thumbnail": "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/tipbox/7_thumbnail.png"
  //   },
  //   {
  //     "id": 8,
  //     "title": "신혼 여행지 고르는 게 너무 어려워요!",
  //     "thumbnail": "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/tipbox/8_thumbnail.png"
  //   }
  // ]
  const navigate = useNavigate();
  
  const [tipMagazine, setTipMagazine] = useState([])

  const fetchData = async () => {
    try {
      const response = await customAxios.get("tip-magazine");
      
      if (response.status === 200) {
        setTipMagazine(response.data.result[0]);
      }
    } catch (error) {
      // console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNavigation = (id) => {
    navigate(`/magazine/${id}`);
  };
  
  return (
    <div className={classes.magazineContainer}>
      <div className={classes.counter}>{currentSlide + 1}/{tipMagazine.length}</div>

      <Slider ref={sliderRef} {...sliderSettings} >
        {tipMagazine.map((item) => (
          <div key={item.id} className={classes.card} onClick={() => handleNavigation(item.id)}>
            <div className={classes.cardimg}>
              <img src={item.thumbnail} alt="이미지가 없습니다." />
            </div>
            <div>
              <div className={classes.cardtitle}>{item.title}</div>
              <div className={classes.viewMore} >View More ﹥</div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

