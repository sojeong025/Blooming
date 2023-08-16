import { styled } from "styled-components";
import { Carousel } from "antd";
import { useNavigate } from "react-router-dom";

const RecommendItem = ({
  data = [
    {
      productId: 1,
      itemName: "[웨딩촬영] 스미다",
      productType: "STUDIO",
      brief:
        "인물중심의 깨끗하고 나만의 사랑스러움을 표헌하고 싶은 고객님께 추천",
      company: "그림비스튜디오",
      thumbnail:
        "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/product/studio/1_thumbnail.jpg",
    },
    {
      productId: 8,
      itemName: "[웨딩촬영] 아우어스튜디오",
      productType: "STUDIO",
      brief: "깔끔하고 따뜻한 인물 중심의 프라이빗 웨딩 촬영을 원하시는 고객",
      company: "아우어스튜디오",
      thumbnail:
        "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/product/studio/8_thumbnail.jpg",
    },
    {
      productId: 9,
      itemName: "[웨딩촬영] 용마랜드스튜디오",
      productType: "STUDIO",
      brief:
        "트랜드인 세미 스타일과 야간씬 촬영까지 단순한 스튜디오가 아닌 종합 촬영소로 일반적인 스튜디오와 차별화를 두었음",
      company: "용마랜드스튜디오",
      thumbnail:
        "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/product/studio/9_thumbnail.jpg",
    },
    {
      productId: 15,
      itemName: "[웨딩촬영] B타입 20P",
      productType: "STUDIO",
      brief:
        "150평의 넓은 마당과 단독주택을 이용한 촬영으로 다양한 분위기 연출 가능",
      company: "테오그라피",
      thumbnail:
        "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/product/studio/15_thumbnail.jpg",
    },
  ],
  productType,
}) => {
  const TypeText = {
    HALL: "웨딩홀",
    STUDIO: "스튜디오",
    MAKEUP: "드레스",
    DRESS: "메이크업",
  };
  const titles = [
    "지금 가장 핫한!",
    "당신만을 위한 추천!",
    "이번 시즌 인기!",
    "최고의 선택,",
    "놓치지 마세요",
    "후회 없는 예약!",
    "강력 추천!",
    "인기 행사!",
    "마지막 기회!",
    "이것은 꼭!",
  ];
  const navigate = useNavigate();
  const goToProduct = (type, id) => {
    navigate(`/${type}/${id}`, {
      state: { id: id, productType: type, navAction: "info" },
    });
  };
  return (
    <Wrapper>
      <NoCarousel autoplay>
        {data.map((item, index) => (
          <Slide key={index}>
            <img src={item.thumbnail} alt={item.itemName} />
            <TitleContainer>
              <Title>{titles[index % titles.length]}</Title>
              <Company>{item.company}</Company>
            </TitleContainer>
            <ClickableArea
              onClick={() => goToProduct(item.productType, item.productId)}
            />
          </Slide>
        ))}
      </NoCarousel>
    </Wrapper>
  );
};

export default RecommendItem;

const NoCarousel = styled(Carousel)``;

const Wrapper = styled.div`
  height: 40vh;
  img {
    width: 100vw;
    height: 40vh;
    object-fit: cover;
  }
`;
const Slide = styled.div`
  position: relative;
`;
const ClickableArea = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const TitleContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 15vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-bottom: 13px;
  padding-left: 20px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7) 80%);
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: bold;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6);
  margin-bottom: 5px;
`;

const Company = styled.div`
  font-size: 22px;
  font-weight: 600;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6);
`;
