import { customAxios } from "../../lib/axios";
import { useRecoilState } from "recoil";
import { weddingHallState } from "../../recoil/ProductAtom";
import ErrorModal from "../../components/Error/Modal";
import { errorState } from "../../recoil/ErrorAtom";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductItem from "../../components/Info/ProductItem";

export default function WeddingHall() {
  
  const [errorModal, setErrorModal] = useRecoilState(errorState);
  const [weddingHall, setWeddingHall] = useRecoilState(weddingHallState)
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const history = useHistory();

  const handleNavigation = (product) => {
    history.push({
      pathname: `/studio/${product.id}`,
      state: { product },
    });
  };

  const fetchData = async () => {
    try {
      const nextPage = currentPage + 1;
      const response = await customAxios.get("product/스튜디오", { params: {page: nextPage, size: 4, sort: 'asc'} });
      
      if (response.data.result.length === 0) {
        setHasMore(false);
      } else {
        setWeddingHall((prevProducts) => [...prevProducts, ...response.data.result[0]]);
        setCurrentPage(nextPage);
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
    <div>
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
        >
        </button>
      </ErrorModal>
      <InfiniteScroll
        dataLength={weddingHall.length}
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
        {weddingHall.map((product) => (
          <ProductItem product={product} key={product.id} onClick={() => handleNavigation(product)} />
        ))}
      </InfiniteScroll>
    </div>
  );
}

