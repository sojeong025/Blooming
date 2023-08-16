import { useEffect, useState } from "react";
import { customAxios } from "../../lib/axios";
import { useNavigate } from "react-router-dom";

export default function LatestSeenProduct() {

  const navigate = useNavigate();

  const [latest, setLatest] = useState([])

  const fetchData = async () => {
    try {
      const response = await customAxios.get("/latestSeenProduct");
      
      if (response.status === 200) {
        setLatest(response.data.result[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNavigation = (productType, id) => {
    navigate(`/product/${productType}/${id}`);
  };

  return (
    <div>
      {latest.map((item, index) => (
        <div key={index} onClick={() => handleNavigation(item.productType, item.productId)}>
          <img src={item.thumbnail} alt="이미지가 없습니다." style={{width:'200px', height:'200px'}}/>
          <div>{item.itemName}</div>
        </div>
      ))}
    </div>
  )
}