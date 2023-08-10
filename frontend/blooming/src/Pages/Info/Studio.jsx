import { customAxios } from "../../lib/axios";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ErrorModal from "../../components/Error/Modal";
import { errorState } from "../../recoil/ErrorAtom";

import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductItem from "../../components/Info/ProductItem";
import RecommendItem from "../../components/Info/RecommendItem";
import LoadingSpinner from "../../components/Common/LoadingSpinner";

export default function WeddingHall() {
  const [isLoading, setIsLoading] = useState(true);
  const [errorModal, setErrorModal] = useRecoilState(errorState);

  const [studio, setStudio] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const navigate = useNavigate();

  const handleNavigation = (product) => {
    navigate(`/info/${product.id}`, {
      state: { id: product.id, productType: "STUDIO" },
    });
  };

  const fetchData = async () => {
    try {
      const response = await customAxios.get("product/STUDIO", {
        params: { page: currentPage, size: 8 },
      });

      if (response.data.result[0].last) {
        setHasMore(false);
      } else {
        setStudio((prevProducts) => [
          ...prevProducts,
          ...response.data.result[0].content,
        ]);
        setCurrentPage(currentPage + 1);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("유저 정보 조회 에러:", error);
      setErrorModal(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {/* {isLoading && <LoadingSpinner />} */}
      <Wrapper>
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
            X
          </button>
        </ErrorModal>
        <RecommendItem />
        <TitleText>스튜디오 전체</TitleText>
        <InfiniteScroll
          dataLength={studio.length}
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
            {studio.map((product) => (
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
  margin-top: 110px;
  margin-bottom: 60px;
`;

const ProductFlex = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`;

const FlexItem = styled.div`
  flex-basis: 50%;
  box-sizing: border-box;
  padding: 10px;
`;

const TitleText = styled.div`
  margin-top: 20px;
  margin-left: 15px;
  padding: 10px;
  font-size: 24px;
  font-weight: bold;
`;
