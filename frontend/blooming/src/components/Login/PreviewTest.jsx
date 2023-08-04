//

import { useRef } from "react";
import { PageIndicator, Button, Space, Swiper, Toast } from "antd-mobile";
// import { DemoBlock, DemoDescription } from "demos";
// import { SwiperRef } from "antd-mobile/es/components/swiper";

export default function Preview() {
  const colors = ["#ace0ff", "#bcffbd", "#e4fabd", "#ffcfac"];

  const items = colors.map((color, index) => (
    <Swiper.Item key={index}>
      <div style={{ background: color, height: "500px" }}>{index + 1}</div>
    </Swiper.Item>
  ));
  return (
    <div>
      <Swiper style={{ padding: "16px" }} loop={false}>
        {items}
      </Swiper>
      <Space></Space>

      <PageIndicator
        total={4}
        current={0}
        style={{
          "--dot-color": "rgba(0, 0, 0, 0.4)",
          "--active-dot-color": "#ffc0cb",
          "--dot-size": "10px",
          "--active-dot-size": "30px",
          "--dot-border-radius": "50%",
          "--active-dot-border-radius": "15px",
          "--dot-spacing": "8px",
        }}
      />
    </div>
  );
}
