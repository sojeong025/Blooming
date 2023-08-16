import { customAxios } from "../../lib/axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useLocation, useNavigate } from "react-router-dom";

import ErrorModal from "../../components/Error/Modal";
import { errorState } from "../../recoil/ErrorAtom";

import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductItem from "../../components/Info/ProductItem";
import RecommendItem from "../../components/Info/RecommendItem";
import LoadingSpinner from "../../components/Common/LoadingSpinner";

export default function WeddingHall() {
  const [isLoading, setIsLoading] = useState(true);
  // const [showModal, setShowModal] = useState(false);
  const [errorModal, setErrorModal] = useRecoilState(errorState);
  const [weddingHall, setWeddingHall] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const productType = location.state.productType;

  const handleNavigation = (product) => {
    navigate(`/${productType}/${product.id}`, {
      state: { id: product.id, productType, navAction: "info" },
    });
  };

  const fetchData = async () => {
    try {
      const response = await customAxios.get("product/HALL", {
        params: { page: currentPage, size: 8 },
      });

      if (response.data.result[0].last) {
        setHasMore(false);
      } else {
        setCurrentPage(currentPage + 1);
        setIsLoading(false);
      }
      setWeddingHall((prevProducts) => [
        ...prevProducts,
        ...response.data.result[0].content,
      ]);
    } catch (error) {
      console.error("HALL 조회 에러:", error);
      // setIsLoading(true);
      setErrorModal(true);
    }
  };

  const [ranking, setRanking] = useState();
  const fetchRanking = async () => {
    try {
      const response = await customAxios.get("ranking/HALL");
      setRanking(response.data.result[0]);
    } catch (error) {
      console.log("랭킹", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchRanking();
  }, []);

  // 로딩 후 모달 그런데 개발중
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (isLoading) {
  //       setShowModal(true);
  //     }
  //   }, 10000);

  //   // Cleanup: 프로미스가 완료되기 전에 컴포넌트가 언마운트되면 타이머를 제거합니다.
  //   return () => clearTimeout(timer);
  // }, [isLoading]);

  return (
    <>
      {/* {isLoading && <LoadingSpinner />} */}

      <Wrapper>
        <RecommendItem data={ranking} />
        <TitleText>웨딩홀 전체</TitleText>
        <InfiniteScroll
          dataLength={weddingHall.length}
          next={fetchData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>모든 상품을 불러왔습니다.</b>
            </p>
          }
        >
          <ProductFlex>
            {weddingHall.map((product) => (
              <FlexItem key={product.id}>
                <ProductItem
                  product={product}
                  onClick={() => handleNavigation(product)}
                />
              </FlexItem>
            ))}
          </ProductFlex>
        </InfiniteScroll>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  margin-top: 100px;
  margin-bottom: 60px;
`;

const ProductFlex = styled.div`
  margin-left: 16px;
  margin-right: 16px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`;

const FlexItem = styled.div`
  flex-basis: 50%;
`;

const TitleText = styled.div`
  margin-top: 20px;
  margin-left: 24px;
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
`;
