import { Carousel } from "react-responsive-carousel"
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Preview.css';

function Preview() {
  return (
    <Carousel
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      emulateTouch
      swipeable
      className="image-carousel"
    >
      <div>
        <img src="src/assets/Preview/1.jpg" alt="Image 1" />
      </div>
      <div>
        <img src="src/assets/Preview/2.jpg" alt="Image 2" />
      </div>
      <div>
        <img src="src/assets/Preview/3.png" alt="Image 3" />
      </div>
    </Carousel>
  );
}

export default Preview