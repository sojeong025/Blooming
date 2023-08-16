import { useState, useEffect } from 'react';
import { customAxios } from "../../lib/axios";

function WeddingFair() {
  const [weddingFairData, setWeddingFairData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await customAxios.get("wedding-fair");
      
      if (response.status === 200) {
        console.log(response);
        setWeddingFairData(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div>
        {weddingFairData.map((item, index) => (
          <div key={index}>
            <img src={item.thumbnail} alt={item.name} style={{width:'200px', height:'200px'}}/>
            <h3>{item.name}</h3>
            <p>{item.datetime}</p>
            <p>{item.place}</p>
            <a href={item.link} target="_blank" rel="noreferrer">
              링크
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeddingFair;
