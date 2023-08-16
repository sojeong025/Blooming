import { useEffect, useState } from "react";
import { customAxios } from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import classes from './TipMagazine.module.css'

export default function TipMagazine() {
  // const tipMagazine = [
  //   {
  //     "id": 1,
  //     "title": "내 체형에 예쁜 웨딩드레스",
  //     "thumbnail": "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/tipbox/1_thumbnail.png"
  //   },
  //   {
  //     "id": 2,
  //     "title": "내 체형에 멋있는 턱시도",
  //     "thumbnail": "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/tipbox/2_thumbnail.png"
  //   },
  //   {
  //     "id": 3,
  //     "title": "웨딩 드레스 용어 TIP",
  //     "thumbnail": "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/tipbox/3_thumbnail.png"
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
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNavigation = (id) => () => {
    navigate(`/magazine/${id}`);
  };
  
  return (
    <div className={classes.magazineContainer}>
      {tipMagazine.map((item, index) => (
        <div key={index} className={classes.card} onClick={handleNavigation(item.id)}>
          <div className={classes.cardimg}><img src={item.thumbnail} alt="이미지가 없습니다." style={{width:'170px', height:'170px'}}/></div>
          <div className={classes.cardtitle}>{item.title}</div>
        </div>
      ))}
    </div>
  )
}