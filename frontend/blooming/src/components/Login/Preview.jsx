import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import classes from "./Preview.module.css";

// import Button from "./Button";

import { imageListState } from "../../recoil/PreviewAtom";
import { useRecoilValue } from "recoil";
import { useState } from "react";

import { PageIndicator } from "antd-mobile";

function Preview() {
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
        className={classes["image-carousel"]}
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showArrows={false}
        emulateTouch
        swipeable
        onChange={handleCarouselChange}
        selectedItem={currentImageIndex}
        renderIndicator={() => {}}
      >
        {imageList.map((image, index) => (
          <div key={index}>
            <img className={classes.img} src={image.src} alt={image.caption} />
          </div>
        ))}
      </Carousel>
      {imageList.map((image, index) => (
        <div
          key={index}
          className={`${classes.caption} ${
            currentImageIndex === index ? classes.activeCaption : ""
          }`}
        >
          {image.caption}
        </div>
      ))}

      <PageIndicator
        className={classes.pageIndicator}
        total={totalImages}
        current={currentImageIndex}
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
      <div className={classes.buttonContainer}>
        {currentImageIndex === totalImages - 1 ? (
          <a href='http://43.200.254.50:8080/oauth2/authorization/kakao'>
            <div className={classes.kakaoBtn}>
              <img src='src/assets/kakao.png' />
            </div>
          </a>
        ) : (
          <div className={classes.buttonContainer}>
            <div
              className={`${classes.pre} ${classes.btn}`}
              onClick={handlePrevClick}
            >
              건너뛰기
            </div>

            <div
              className={`${classes.next} ${classes.btn}`}
              onClick={handleNextClick}
            >
              다음
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Preview;
