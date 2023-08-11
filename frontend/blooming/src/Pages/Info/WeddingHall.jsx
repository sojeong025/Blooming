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
    console.log(productType);
    navigate(`/${productType}/${product.id}`, {
      state: { id: product.id, productType },
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
        setWeddingHall((prevProducts) => [
          ...prevProducts,
          ...response.data.result[0].content,
        ]);
        setCurrentPage(currentPage + 1);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("HALL 조회 에러:", error);
      // setIsLoading(true);
      setErrorModal(true);
    }
  };

  useEffect(() => {
    fetchData();
    // setWeddingHall([
    //   {
    //     id: 85,
    //     itemName: "빌라드지디 수서빌라드지디 ",
    //     brief:
    //       "2019년 9월, 하우스웨딩의 대명사인 더그레이스켈리 강남점에 이어 2호점 오픈! 빌라드지디 수서!",
    //     thumbnail:
    //       "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/product/hall/85_thumbnail.jpg",
    //     company: "빌라드지디 수서빌라드지디 수서",
    //     companyTime: "None",
    //     companyAddress: "서울 강남구 율현동 68-8",
    //     starRate: 0,
    //     wish: true,
    //   },
    //   {
    //     id: 86,
    //     itemName: "상록아트홀",
    //     brief:
    //       "소중한 꿈이 이루어지는 날, 웨딩상록만의 노하우와 고객감동의 친절한 서비스로 최고의 만족감을 선사합니다.",
    //     thumbnail:
    //       "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/product/hall/86_thumbnail.jpg",
    //     company: "상록아트홀",
    //     companyTime: "None",
    //     companyAddress: "서울 강남구 역삼동 701 : 5F",
    //     starRate: 0,
    //     wish: true,
    //   },
    //   {
    //     id: 87,
    //     itemName: "소노펠리체컨벤션",
    //     brief:
    //       "특급호텔급의 정통코스를 표방한 정갈한 식사, 명문가의 혼례장소로 각광 받아온 노블웨딩의 명가, 소노펠리체컨벤션!",
    //     thumbnail:
    //       "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/product/hall/87_thumbnail.jpg",
    //     company: "소노펠리체컨벤션",
    //     companyTime: "None",
    //     companyAddress: "서울 강남구 삼성동 159-6 : 한국도심공항터미널 3F",
    //     starRate: 0,
    //     wish: false,
    //   },
    //   {
    //     id: 88,
    //     itemName: "그랜드힐컨벤션",
    //     brief:
    //       "7성급 호텔수준의 품격웨딩 360도 회전단상과 함께 신성함과 더불어 두 분의 영원한 약속을 완성할 것입니다. 다양한 주제의 맞춤형 웨딩, 그랜드힐컨벤션!",
    //     thumbnail:
    //       "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/product/hall/88_thumbnail.jpg",
    //     company: "그랜드힐컨벤션",
    //     companyTime: "None",
    //     companyAddress: "서울 강남구 대치동 1004-3",
    //     starRate: 0,
    //     wish: false,
    //   },
    // ]);
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
        {/* <ErrorModal
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
        </ErrorModal> */}
        <RecommendItem />
        <TitleText>전체 주절주절</TitleText>
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
  margin-top: 110px;
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
  margin-left: 16px;
  margin-bottom: 5px;
  font-size: 24px;
  font-weight: bold;
`;
