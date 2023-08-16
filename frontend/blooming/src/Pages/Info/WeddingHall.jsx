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
    // fetchData();
    // fetchRanking();
    setRanking([
      {
        productId: 86,
        itemName: "상록아트홀",
        productType: "HALL",
        brief:
          "소중한 꿈이 이루어지는 날, 웨딩상록만의 노하우와 고객감동의 친절한 서비스로 최고의 만족감을 선사합니다.",
        company: "상록아트홀",
        thumbnail:
          "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/product/hall/86_thumbnail.jpg",
      },
      {
        productId: 85,
        itemName: "빌라드지디 수서",
        productType: "HALL",
        brief:
          "2019년 9월, 하우스웨딩의 대명사인 더그레이스켈리 강남점에 이어 2호점 오픈! 빌라드지디 수서!",
        company: "빌라드지디 수서",
        thumbnail:
          "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/product/hall/85_thumbnail.jpg",
      },
      {
        productId: 89,
        itemName: "토브헤세드",
        productType: "HALL",
        brief:
          "나만의 프라이빗한 맞춤웨딩이 가능한 강남 최고의 고품격 하우스웨딩홀, 토브헤세드!",
        company: "토브헤세드",
        thumbnail:
          "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/product/hall/89_thumbnail.jpg",
      },
      {
        productId: 95,
        itemName: "더리버사이드호텔",
        productType: "HALL",
        brief:
          "빛의 축제장 콘서트홀, 프리미엄급 웨딩 그랜드볼룸, 호텔에서 즐기는 뷔페식 웨딩, 산타마리아 노벨라까지..다채로운 웨딩의 진수, 더리버사이드호텔!",
        company: "더리버사이드호텔",
        thumbnail:
          "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/product/hall/95_thumbnail.jpg",
      },
      {
        productId: 94,
        itemName: "더뉴컨벤션웨딩",
        productType: "HALL",
        brief:
          "품격있고 격조높은 명품 예식홀, 화려한 시설과 다양한 휴식공간, 명장이 만드는 명품웨딩, 더뉴컨벤션!",
        company: "더뉴컨벤션웨딩",
        thumbnail:
          "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/product/hall/94_thumbnail.jpg",
      },
      {
        productId: 92,
        itemName: "더파티움 여의도",
        productType: "HALL",
        brief:
          "더파티움 강남의 신화를 여의도에서! 2020년 8월 리뉴얼 그랜드오픈, 더파티움 여의도!",
        company: "더파티움 여의도",
        thumbnail:
          "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/product/hall/92_thumbnail.jpg",
      },
    ]);
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
  margin-left: 24px;
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
`;
