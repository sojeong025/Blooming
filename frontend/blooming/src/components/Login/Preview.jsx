import { Carousel } from "react-responsive-carousel"
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Preview.css';
import Button from "./Button";
import { NavLink } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { imageListState } from '../../recoil/PreviewAtom'
import { useState } from "react";

function Preview() {

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
    <>
    <Carousel
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      showArrows={false}
      emulateTouch
      swipeable
      className="image-carousel"
      onChange={handleCarouselChange}
      selectedItem={currentImageIndex}
    >
      {imageList.map((image, index) => (
        <div key={index}>
          <img src={image.src} alt={image.caption} />
        </div>
      ))}
    </Carousel>
    {currentImageIndex === 2 ?
      <NavLink to={"/Join"}>
        <Button text="카카오톡으로 로그인하기" />
      </NavLink> :
      <>
        <button onClick={handlePrevClick}>이전</button>
        <button onClick={handleNextClick}>다음</button>
      </>
    }    
  </>
  );
}

export default Preview