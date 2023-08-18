import { customAxios } from "../../lib/axios";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import ErrorModal from "../../components/Error/Modal";
import { errorState } from "../../recoil/ErrorAtom";

import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductItem from "../../components/Info/ProductItem";
import RecommendItem from "../../components/Info/RecommendItem";
import LoadingSpinner from "../../components/Common/LoadingSpinner";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function WeddingHall() {
  const [isLoading, setIsLoading] = useState(true);
  const [errorModal, setErrorModal] = useRecoilState(errorState);

  const [studio, setStudio] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const productType = location.state.productType;

  const handleNavigation = (product) => {
    // console.log(productType);
    navigate(`/${productType}/${product.id}`, {
      state: { id: product.id, productType, navAction: "info" },
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
        setCurrentPage(currentPage + 1);
        setIsLoading(false);
      }
      setStudio((prevProducts) => [
        ...prevProducts,
        ...response.data.result[0].content,
      ]);
    } catch (error) {
      console.error("유저 정보 조회 에러:", error);
      setErrorModal(true);
    }
  };

  const [ranking, setRanking] = useState();
  const fetchRanking = async () => {
    try {
      const response = await customAxios.get("ranking/STUDIO");
      setRanking(response.data.result[0]);
    } catch (error) {
      console.log("랭킹", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchRanking();
  }, []);

  return (
    <>
      {/* {isLoading && <LoadingSpinner />} */}
      <Wrapper>
        <RecommendItem data={ranking} productType={productType} />
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
            {isLoading
              ? Array(8)
                  .fill()
                  .map((_, index) => (
                    <FlexItem key={index}>
                      <div
                        style={{
                          padding: "10px",
                          textAlign: "center",
                          boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)",
                          background: "#FFF",
                          borderRadius: "6px",
                          overflow: "hidden",
                          border: "1px solid rgba(0, 0, 0, 0.08)",
                          marginBottom: "1rem",
                        }}
                      >
                        <Skeleton height={200} />
                        <Skeleton
                          width={115}
                          height={16}
                          style={{ marginTop: "1rem", marginBottom: "0.5rem" }}
                        />
                        <Skeleton width={120} height={16} />
                      </div>
                    </FlexItem>
                  ))
              : studio.map((product) => (
                  <FlexItem key={product.id}>
                    <ProductItem
                      product={product}
                      onClick={() => handleNavigation(product)}
                    />
                  </FlexItem>
                ))}
            {/* {studio.map((product) => (
              <FlexItem key={product.id}>
                <ProductItem
                  product={product}
                  onClick={() => handleNavigation(product)}
                />
              </FlexItem>
            ))} */}
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
