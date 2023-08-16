import { useEffect, useState } from "react";
import { customAxios } from "../../lib/axios";
import { useParams } from "react-router-dom";

export default function Magazine() {
  
  const { id } = useParams();

  const [Magazine, setMagazine] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    try {
      const response = await customAxios.get(`tip-magazine/${id}`);
      
      if (response.status === 200) {
        setMagazine(response.data.result[0]);
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false)
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <div>...Loading</div>
  }
  
  return (
    <div>
      <img src={Magazine.thumbnail} alt="이미지가 없습니다." />
      <div>{Magazine.title}</div>
      <div>{Magazine.intro}</div>
      <div>
        <div>
          <div>{Magazine.subTitle1}</div>
          <img src={Magazine.subImage1} />
          <div>{Magazine.subContent1}</div>
        </div>
        <div>
          <div>{Magazine.subTitle2}</div>
          <img src={Magazine.subImage2} />
          <div>{Magazine.subContent2}</div>
        </div>
        <div>
          <div>{Magazine.subTitle3}</div>
          <img src={Magazine.subImage3} />
          <div>{Magazine.subContent3}</div>
        </div>
        <div>
          <div>{Magazine.subTitle4}</div>
          <img src={Magazine.subImage4} />
          <div>{Magazine.subContent4}</div>
        </div>
      </div>
      <div>{Magazine.outro}</div>
    </div>
  )
}