import { styled } from "styled-components";
import { Carousel } from "antd";
import { useNavigate } from "react-router-dom";

const RecommendItem = ({ data = [], productType }) => {
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
      <Carousel autoplay renderIndicator={() => {}}>
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
      </Carousel>
    </Wrapper>
  );
};

export default RecommendItem;

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
