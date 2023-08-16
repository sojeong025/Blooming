import { styled } from "styled-components";
import { Carousel } from "antd";

const RecommendItem = ({ data = [] }) => {
  const contentStyle = {
    margin: 0,
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };

  return (
    <Wrapper>
      <Carousel autoplay>
        {data.map((item, index) => (
          <div key={index} style={contentStyle}>
            <img src={item.thumbnail} alt={item.itemName} />
          </div>
        ))}
      </Carousel>
    </Wrapper>
  );
};

export default RecommendItem;

const Wrapper = styled.div`
  /* border: 1px solid black; */
  height: 40vh;

  img {
    width: 100vw;
    height: 40vh;
    object-fit: cover;
  }
`;

const Title = styled.div`
  position: absolute;
  font-size: 25px;
`;
