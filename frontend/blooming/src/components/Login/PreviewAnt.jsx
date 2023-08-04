import { Button, Space, Swiper } from "antd-mobile";
import { useRef, useState } from "react";
import styled from "styled-components";
import second from "swiper";

export default function Preview() {
  const imageList = [
    "src/assets/Preview/1.jpg",
    "src/assets/Preview/2.jpg",
    "src/assets/Preview/3.jpg",
  ];

  const image = imageList.map((image, index) => (
    <Swiper.Item key={index}>
      <img
        src={image}
        alt=''
        style={{ width: "300px", height: "500px", objectFit: "cover" }}
      />
    </Swiper.Item>
  ));

  const [current, setCurrent] = useState(0);

  const handleChange = (index) => {
    setCurrent(index);
    console.log(current);
  };

  const handlePrev = () => {
    setCurrent((current) => Math.max(current - 1, 0));
    console.log(current);
  };

  const handleNext = () => {
    setCurrent((current) => Math.min(current + 1, imageList.length - 1));
    console.log(current);
  };

  const handleLast = () => {
    setCurrent(imageList.length - 1);
    console.log(current);
  };

  return (
    <>
      <CustomSwiper
        onChange={(_, index) => handleChange(index)}
        style={{
          "--border-radius": "8px",
        }}
        indicatorProps={{
          style: {
            "--dot-color": "rgba(0, 0, 0, 0.4)",
            "--active-dot-color": "#ffc0cb",
            "--dot-size": "10px",
            "--active-dot-size": "30px",
            "--dot-border-radius": "50%",
            "--active-dot-border-radius": "15px",
            "--dot-spacing": "8px",
          },
        }}
      >
        {image}
      </CustomSwiper>

      <Space>
        {/* <Button>이전</Button>
        <Button onClick={ref.current.swipeNext()}>다음</Button>
        <Button onClick={handleLast}>맨 마지막</Button> */}
      </Space>
    </>
  );
}

const CustomSwiper = styled(Swiper)`
  width: 300px;
  height: 500px;
`;
