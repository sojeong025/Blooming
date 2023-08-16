import { useEffect, useState } from "react";
import { customAxios } from "../../lib/axios";
import { useNavigate } from "react-router-dom";

export default function TipMagazine() {

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

  const handleNavigation = (id) => {
    navigate(`/magazine/${id}`);
  };
  
  return (
    <div>
      {tipMagazine.map((item, index) => (
        <div key={index} onClick={handleNavigation(item.id)}>
          <img src={item.thumbnail} alt="이미지가 없습니다." style={{width:'200px', height:'200px'}}/>
          <h3>{item.title}</h3>
        </div>
      ))}
    </div>
  )
}