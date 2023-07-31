import { Carousel } from "react-responsive-carousel"
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import classes from './Preview.module.css';
import Button from "./Button";
import { NavLink } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { imageListState } from '../../recoil/PreviewAtom'
import { useState } from "react";



function Preview() {
  const CustomDot = ({ onClick, isActive }) => {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${classes["custom-dot"]} ${isActive ? classes["active"] : ""}`}
      />
    );
  };

  const imageList = useRecoilValue(imageListState);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const totalImages = imageList.length;

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
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
    {currentImageIndex === 2 ?
      <NavLink to={"/join"}>
        <Button text="카카오톡으로 로그인하기" />
      </NavLink> :
      <div className={classes.btn}>
        <button className={classes.pre} onClick={handlePrevClick}>건너뛰기</button>
        <button className={classes.next} onClick={handleNextClick}>다음</button>
      </div>
    }    
  </div>
  );
}

export default Preview