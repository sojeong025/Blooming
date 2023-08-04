//
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import classes from "./Preview.module.css";

import Button from "./Button";

import { imageListState } from "../../recoil/PreviewAtom";
import { useRecoilValue } from "recoil";
import { useState } from "react";

import { PageIndicator } from "antd-mobile";

function Preview() {
  // 카카오버튼
  const KakaoBtn = "src/assets/kakao.png";

  const CustomDot = ({ onClick, isActive }) => {
    return (
      <button
        type='button'
        onClick={onClick}
        className={`${classes["custom-dot"]} ${
          isActive ? classes["active"] : ""
        }`}
      />
    );
  };

  const imageList = useRecoilValue(imageListState);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const totalImages = imageList.length;

  const handlePrevClick = () => {
    setCurrentImageIndex(totalImages - 1);
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  const handleCarouselChange = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className={classes.div}>
      <Carousel
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showArrows={false}
        emulateTouch
        swipeable
        className={classes["image-carousel"]}
        onChange={handleCarouselChange}
        selectedItem={currentImageIndex}
        renderIndicator={(onClickHandler, isSelected, index, label) => (
          <CustomDot
            key={index}
            onClick={onClickHandler}
            isActive={isSelected}
          />
        )}
      >
        {imageList.map((image, index) => (
          <div key={index}>
            <img src={image.src} alt={image.caption} />
          </div>
        ))}
      </Carousel>

      {currentImageIndex === 2 ? (
        // 카카오 버튼
        <a href='http://43.200.254.50:8080/oauth2/authorization/kakao'>
          <img src='src/assets/kakao.png' />
        </a>
      ) : (
        <div className={classes.btn}>
          <button className={classes.pre} onClick={handlePrevClick}>
            건너뛰기
          </button>
          <button className={classes.next} onClick={handleNextClick}>
            다음
          </button>
        </div>
      )}
    </div>
  );
}

export default Preview;
