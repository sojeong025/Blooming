import { customAxios } from "../../lib/axios";
import { useRecoilState } from "recoil";
import ErrorModal from "../../components/Error/Modal";
import { errorState } from "../../recoil/ErrorAtom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductItem from "../../components/Info/ProductItem";

export default function WeddingHall() {
  
  const [errorModal, setErrorModal] = useRecoilState(errorState);
  const [studio, setStudio] = useState([])
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const navigate = useNavigate();

  const handleNavigation = (product) => {
    navigate(`/info/${product.id}`, { state: { product } });
  };

  const fetchData = async () => {
    try {
      const response = await customAxios.get("product/STUDIO", { params: {page: currentPage, size: 4} });
      
      if (response.data.result[0].last) {
        setHasMore(false);
      } else {
        setStudio((prevProducts) => [...prevProducts, ...response.data.result[0].content]);
        setCurrentPage(currentPage+1);
      }
      
    } catch (error) {
      console.error("유저 정보 조회 에러:", error);
      setErrorModal(true);
    }
  };

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div style={{marginTop:'102px'}}>
      <ErrorModal
        buttonText={"다시시도"}
        show={errorModal}
        onClose={() => {
          setErrorModal(false);
          fetchData();
        }}
      >
        <h2>Error</h2>
        <p>데이터 수신 오류</p>
        <button
          onClick={() => {
            setErrorModal(false);
          }}
        >X
        </button>
      </ErrorModal>
      <InfiniteScroll
        dataLength={studio.length}
        next={fetchData}
        hasMore={hasMore}
        loader={
          <h4>Loading...</h4>
        }
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>모든 상품을 불러왔습니다.</b>
          </p>
        }
      >
        {studio.map((product) => (
          <ProductItem product={product} key={product.id} onClick={() => handleNavigation(product)} />
        ))}
      </InfiniteScroll>
    </div>
  );
}

