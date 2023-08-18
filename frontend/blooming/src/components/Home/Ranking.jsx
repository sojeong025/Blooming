import { useEffect, useState } from "react";
import { customAxios } from "../../lib/axios";
import { useNavigate } from "react-router-dom";

export default function TipMagazine({ productType }) {

  const navigate = useNavigate();

  const [rankings, setRankings] = useState([])

  const fetchData = async () => {
    try {
      const response = await customAxios.get(`tip-magazine/${productType}`);
      
      if (response.status === 200) {
        setRankings(response.data.result[0]);
      }
    } catch (error) {
      // console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [productType]);

  const handleNavigation = (id) => {
    navigate(`/product/${productType}/${id}`);
  };

  return (
    <div>
      {rankings.map((item, index) => (
        <div key={index} onClick={() => handleNavigation(item.productId)}>
          <img src={item.thumbnail} alt="이미지가 없습니다." style={{width:'200px', height:'200px'}}/>
          <div>{item.company}</div>
          <div>{item.itemName}</div>
        </div>
      ))}
    </div>
  )
}