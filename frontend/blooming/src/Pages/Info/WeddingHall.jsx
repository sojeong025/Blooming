import { customAxios } from "../../lib/axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
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
  // const [showModal, setShowModal] = useState(false);
  const [errorModal, setErrorModal] = useRecoilState(errorState);
  const [weddingHall, setWeddingHall] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const navigate = useNavigate();

  const handleNavigation = (product) => {
    navigate(`/info/${product.id}`, {
      state: { id: product.id, productType: "HALL" },
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
    // fetchData();
    // 희영 디자인용 더미
    setWeddingHall([
      {
        id: 85,
        itemName: "빌라드지디 수서",
        brief:
          "2019년 9월, 하우스웨딩의 대명사인 더그레이스켈리 강남점에 이어 2호점 오픈! 빌라드지디 수서!",
        thumbnail:
          "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/product/hall/85_thumbnail.jpg",
        company: "빌라드지디 수서",
        companyTime: "None",
        companyAddress: "서울 강남구 율현동 68-8",
        starRate: 0,
        wish: true,
      },
      {
        id: 86,
        itemName: "상록아트홀",
        brief:
          "소중한 꿈이 이루어지는 날, 웨딩상록만의 노하우와 고객감동의 친절한 서비스로 최고의 만족감을 선사합니다.",
        thumbnail:
          "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/product/hall/86_thumbnail.jpg",
        company: "상록아트홀",
        companyTime: "None",
        companyAddress: "서울 강남구 역삼동 701 : 5F",
        starRate: 0,
        wish: true,
      },
      {
        id: 87,
        itemName: "소노펠리체컨벤션",
        brief:
          "특급호텔급의 정통코스를 표방한 정갈한 식사, 명문가의 혼례장소로 각광 받아온 노블웨딩의 명가, 소노펠리체컨벤션!",
        thumbnail:
          "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/product/hall/87_thumbnail.jpg",
        company: "소노펠리체컨벤션",
        companyTime: "None",
        companyAddress: "서울 강남구 삼성동 159-6 : 한국도심공항터미널 3F",
        starRate: 0,
        wish: false,
      },
      {
        id: 88,
        itemName: "그랜드힐컨벤션",
        brief:
          "7성급 호텔수준의 품격웨딩 360도 회전단상과 함께 신성함과 더불어 두 분의 영원한 약속을 완성할 것입니다. 다양한 주제의 맞춤형 웨딩, 그랜드힐컨벤션!",
        thumbnail:
          "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/product/hall/88_thumbnail.jpg",
        company: "그랜드힐컨벤션",
        companyTime: "None",
        companyAddress: "서울 강남구 대치동 1004-3",
        starRate: 0,
        wish: false,
      },
      {
        id: 89,
        itemName: "토브헤세드",
        brief:
          "나만의 프라이빗한 맞춤웨딩이 가능한 강남 최고의 고품격 하우스웨딩홀, 토브헤세드!",
        thumbnail:
          "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/product/hall/89_thumbnail.jpg",
        company: "토브헤세드",
        companyTime: "None",
        companyAddress: "서울 강남구 논현동 72-8",
        starRate: 0,
        wish: false,
      },
      {
        id: 90,
        itemName: "보타닉파크웨딩",
        brief:
          "웅장하고 세련된 호텔형 오키드홀, 18세기 영국 블레넘궁전을 모티브로 디자인한 카라홀, 자연친화적인 최적의 장소, 보타닉파크웨딩!",
        thumbnail:
          "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/product/hall/90_thumbnail.jpg",
        company: "보타닉파크웨딩",
        companyTime: "None",
        companyAddress: "서울 강서구 마곡동 760 : 보타닉푸르지오시티 B2F",
        starRate: 0,
        wish: false,
      },
      {
        id: 91,
        itemName: "엘리에나호텔",
        brief:
          "2020년 4월 그랜드오픈! High-end-class, 웨딩 트렌드를 리드하는 엘리에나호텔의 특별함을 만나보세요.",
        thumbnail:
          "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/product/hall/91_thumbnail.jpg",
        company: "엘리에나호텔",
        companyTime: "None",
        companyAddress: "서울 강남구 논현동 152",
        starRate: 0,
        wish: false,
      },
      {
        id: 92,
        itemName: "더파티움 여의도",
        brief:
          "더파티움 강남의 신화를 여의도에서! 2020년 8월 리뉴얼 그랜드오픈, 더파티움 여의도!",
        thumbnail:
          "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/product/hall/92_thumbnail.jpg",
        company: "더파티움 여의도",
        companyTime: "None",
        companyAddress: "서울 영등포구 여의도동 16-2 : 중소기업중앙회",
        starRate: 0,
        wish: false,
      },
      {
        id: 93,
        itemName: "라마다서울신도림호텔",
        brief:
          "2017년 9월 그랜드오픈, 교통의 요지 신도림광장 5분거리에 위치한 신축호텔, 라마다서울신도림호텔!",
        thumbnail:
          "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/product/hall/93_thumbnail.jpg",
        company: "라마다서울신도림호텔",
        companyTime: "None",
        companyAddress: "서울 구로구 신도림동 427-3",
        starRate: 0,
        wish: true,
      },
      {
        id: 94,
        itemName: "더뉴컨벤션웨딩",
        brief:
          "품격있고 격조높은 명품 예식홀, 화려한 시설과 다양한 휴식공간, 명장이 만드는 명품웨딩, 더뉴컨벤션!",
        thumbnail:
          "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/product/hall/94_thumbnail.jpg",
        company: "더뉴컨벤션웨딩",
        companyTime: "None",
        companyAddress: "서울 강서구 내발산동 655",
        starRate: 0,
        wish: false,
      },
      {
        id: 95,
        itemName: "더리버사이드호텔",
        brief:
          "빛의 축제장 콘서트홀, 프리미엄급 웨딩 그랜드볼룸, 호텔에서 즐기는 뷔페식 웨딩, 산타마리아 노벨라까지..다채로운 웨딩의 진수, 더리버사이드호텔!",
        thumbnail:
          "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/product/hall/95_thumbnail.jpg",
        company: "더리버사이드호텔",
        companyTime: "None",
        companyAddress: "서울 서초구 잠원동 6-1",
        starRate: 0,
        wish: false,
      },
      {
        id: 96,
        itemName: "빌라드지디 청담",
        brief:
          "2020년 9월 그랜드오픈! 유니크한 홀 디자인&따뜻한 채광, 고객니즈에 맞춘 1:1 커스터마이징웨딩, 빌라드지디청담!",
        thumbnail:
          "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/product/hall/96_thumbnail.jpg",
        company: "빌라드지디 청담",
        companyTime: "None",
        companyAddress: "서울 강남구 청담동 73-4",
        starRate: 0,
        wish: false,
      },
      {
        id: 97,
        itemName: "더화이트베일",
        brief:
          "설레임... 그리고 감동의 시작 최고의 교통의 중심, 전문 웨딩프로듀서 품격의 깊이를 아는 화이트베일이 당신의 소중한 날을 만들어 드립니다.",
        thumbnail:
          "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/product/hall/97_thumbnail.jpg",
        company: "더화이트베일",
        companyTime: "None",
        companyAddress: "서울 서초구 서초동 1445-14 : (주)진로",
        starRate: 0,
        wish: true,
      },
      {
        id: 98,
        itemName: "더베일리하우스 삼성점",
        brief:
          '국내 최초 오리지널 하우스 웨딩 공간 "더베일리하우스 삼성점"이 2020년 3월 새롭게 리뉴얼 그랜드 오픈했습니다. 도심 속 오아시스와 같은 "자연 친화적인 공간"과 더불어 세성에서 단 하나뿐인 "정통 하우스웨딩"의 품격을 선보입니다.',
        thumbnail:
          "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/product/hall/98_thumbnail.jpg",
        company: "더베일리하우스 삼성점",
        companyTime: "None",
        companyAddress: "서울 강남구 삼성동 168-3",
        starRate: 0,
        wish: false,
      },
      {
        id: 99,
        itemName: "라비돌웨딩강남(구.스칼라티움강남)",
        brief:
          "계단이 가진 신비로운 상징에서 영감을 얻어 만들어진 특별한 Art Space! 당신을 최고의 1%로 모시겠습니다.",
        thumbnail:
          "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/product/hall/99_thumbnail.jpg",
        company: "라비돌웨딩강남(구.스칼라티움강남)",
        companyTime: "None",
        companyAddress: "서울 강남구 역삼동 828-10",
        starRate: 0,
        wish: false,
      },
      {
        id: 100,
        itemName: "JK아트컨벤션",
        brief:
          "곳곳에서 피어나는 기품, 문래역 도보 5분거리, 다양한 규모의 품격있는 연회장, 맛깔스런 움식, 품격이 다른 JK아트컨벤션!",
        thumbnail:
          "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/product/hall/100_thumbnail.jpg",
        company: "JK아트컨벤션",
        companyTime: "None",
        companyAddress: "서울 영등포구 문래동3가 55-16 : SK리더스뷰 4F",
        starRate: 0,
        wish: false,
      },
      {
        id: 101,
        itemName: "노블발렌티_대치점",
        brief:
          "단 하나의 웨딩, 무한한 감동 2019년 1월 1일 노블발렌티 대치점에서 웨딩의 역사를 시작합니다.",
        thumbnail:
          "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/product/hall/101_thumbnail.jpg",
        company: "노블발렌티_대치점",
        companyTime: "None",
        companyAddress: "서울 강남구 대치동 983-1 : 해암빌딩 L1F",
        starRate: 0,
        wish: false,
      },
      {
        id: 102,
        itemName: "빌라드지디 강남 더그레이스켈리홀",
        brief:
          "진짜 내집에서 올리는 Party & Wedding, 나만의 프라이빗한 하우스웨딩, 빌라드지디 강남 더그레이스켈리홀",
        thumbnail:
          "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/product/hall/102_thumbnail.jpg",
        company: "빌라드지디 강남 더그레이스켈리홀",
        companyTime: "None",
        companyAddress: "서울 강남구 논현동 247-4",
        starRate: 0,
        wish: false,
      },
      {
        id: 103,
        itemName: "ELTOWER(엘타워)",
        brief:
          "클래식함의 그랜드, 샤토컨셉의 그레이스 모든 웨딩 스타일이 현실화 되는 국내 최고의 호텔형 연회전문센터 엘타워!",
        thumbnail:
          "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/product/hall/103_thumbnail.jpg",
        company: "ELTOWER(엘타워)",
        companyTime: "None",
        companyAddress: "서울 서초구 양재동 24 : 엘타워",
        starRate: 0,
        wish: false,
      },
      {
        id: 104,
        itemName: "루나미엘레",
        brief:
          "유럽 고성의 고풍스러움이 있는 그랜드, 이태리 왕궁 컨셉의 자연 채광이 아름다운 컨벤션, 2가지 컨셉 웨딩이 가능한 루나미엘레!",
        thumbnail:
          "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/product/hall/104_thumbnail.jpg",
        company: "루나미엘레",
        companyTime: "None",
        companyAddress: "서울 영등포구 여의도동 12 : C.C.M.M빌딩 12F",
        starRate: 0,
        wish: false,
      },
      {
        id: 105,
        itemName: "노블발렌티_삼성점",
        brief:
          "당신이 꿈꿔왔던 그 이상의 웨딩 도심속 대저택에서의 클래식한 하우스웨딩 강남 최초의 가장 특별한 성스러운 웨딩홀, 노블발렌티!",
        thumbnail:
          "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/product/hall/105_thumbnail.jpg",
        company: "노블발렌티_삼성점",
        companyTime: "None",
        companyAddress: "서울 강남구 삼성동 109-6",
        starRate: 0,
        wish: true,
      },
      {
        id: 106,
        itemName: "더라움",
        brief:
          "유럽의 고성에서처럼 성스러운 라움만의 캐슬 & 가든 웨딩과 프라이빗한 연회를 위해 전문 큐레이터가 기획부터 연출, 진행, 마무리까지 최상의 서비스를 제공하는 더라움!",
        thumbnail:
          "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/product/hall/106_thumbnail.jpg",
        company: "더라움",
        companyTime: "None",
        companyAddress: "서울 강남구 역삼동 680-1 : 웨딩문화센터",
        starRate: 0,
        wish: false,
      },
      {
        id: 107,
        itemName: "웨딩시그니처",
        brief:
          "2019년 4월, 마포의 랜드마크인 홍대에 위치한 웨딩시그니처 그랜드 오픈!",
        thumbnail:
          "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/product/hall/108_thumbnail.jpg",
        company: "웨딩시그니처",
        companyTime: "None",
        companyAddress: "서울 마포구 서교동 378-7",
        starRate: 0,
        wish: false,
      },
      {
        id: 108,
        itemName: "더라빌",
        brief:
          "강남 도심 속 아름다운 숲의 절경과 새소리가 어우러진 웨딩&리셉션 공간 더라빌은 여유롭고 전문적인 웨딩&리셉션의 실현을 추구합니다.",
        thumbnail:
          "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/product/hall/109_thumbnail.jpg",
        company: "더라빌",
        companyTime: "None",
        companyAddress: "서울 강남구 삼성동 73",
        starRate: 0,
        wish: false,
      },
      {
        id: 109,
        itemName: "더채플앳논현",
        brief:
          "우아하고 성스러운 아름다움, 럭셔리 그 이상의 가치! 더채플앳논현!",
        thumbnail:
          "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/product/hall/110_thumbnail.jpg",
        company: "더채플앳논현",
        companyTime: "None",
        companyAddress: "서울 강남구 역삼동 607-21",
        starRate: 0,
        wish: false,
      },
      {
        id: 110,
        itemName: "벨라비타컨벤션",
        brief:
          "도심 속에서 누리는 가장 프라이빗한 웨딩. 아름다운 인생의 첫 순간, 벨라비타가 함께 합니다.",
        thumbnail:
          "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/product/hall/111_thumbnail.jpg",
        company: "벨라비타컨벤션",
        companyTime: "None",
        companyAddress: "서울 강남구 역삼동 680 : SK리더스뷰 1F",
        starRate: 0,
        wish: false,
      },
      {
        id: 111,
        itemName: "명동라루체",
        brief:
          "독창적이고 스타일리쉬한 컨셉의 3개의 예식홀, 천장이 열리고 하늘 위로 풍선을 날려 보내는 벌룬 세레모니, 마법처럼 펼쳐지는 웨딩의 순간, 명동라루체!",
        thumbnail:
          "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/product/hall/112_thumbnail.jpg",
        company: "명동라루체",
        companyTime: "None",
        companyAddress: "서울 중구 남산동1가 13-6",
        starRate: 0,
        wish: false,
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
