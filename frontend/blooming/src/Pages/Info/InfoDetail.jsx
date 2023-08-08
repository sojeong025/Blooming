import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import classes from "./InfoDetail.module.css";

import { useLocation } from "react-router-dom";
import { customAxios } from "../../lib/axios";
import { useEffect, useState } from "react";
import Rating from "react-rating";

export default function InfoDetail() {
  
  const location = useLocation();
  const product = location.state.product
  const productType = location.state.productType
  const [images, setImages] = useState([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [reviews, setReviews] = useState([])


  // 리뷰쓰는 폼관련된 State
  const [starRating, setStarRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviewImage, setReviewImage] = useState(null);

  const fetchImageData = async () => {
    try {
      const response = await customAxios.get(`product/${productType}/${product.id}`);
      setImages(response.data.result[0])
    } catch (error) {
      console.error("이미지 정보 조회 에러:", error);
    }
  }

  const fetchReviewData = async () => {
    try {
      const response = await customAxios.get(`review/${product.id}`);
      setReviews(response.data.result[0])
    } catch (error) {
      console.error("리뷰 정보 조회 에러:", error);
    }
  };

  useEffect(() => {
    fetchReviewData()
    fetchImageData()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    // 폼 제출 로직 작성
    // api요청해서 값넣고 성공하면 두고 실패하면 현재 페이지 redirect????
  };

  const handleReset = () => {
    setStarRating(0);
    setComment('');
    setReviewImage(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReserve = () => {
    //이건 예약 API
  }

  const handleCreateWish = () => {
    //이건 찜하기
  }

  const handleDeleteWish = () => {
    //이건 찜취소
  }

  const handleCarouselChange = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div style={{marginTop: '102px', marginBottom: '80px'}}>
      <p>{product.id}</p>
      <p>{product.itemName}</p>
      {images && <Carousel
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showArrows={false}
        emulateTouch
        swipeable
        className={classes["image-carousel"]}
        onChange={handleCarouselChange}
        selectedItem={currentImageIndex}
        renderIndicator={() => {}}
      >
        {images.map((image, index) => (
          <div key={index}>
            <img src={image.image} alt='이미지가 없습니다.' />
          </div>
        ))}
      </Carousel>}
      <p>{product.brief}</p>
      <p>{product.company}</p>
      <p>{product.companyTime}</p>
      <p>{product.companyAddress}</p>
      <p>{product.thumbnail}</p>
      <button onClick={handleReserve}>예약하기</button>
      {product.wish ? <button onClick={handleCreateWish}>찜하기</button> : <button onClick={handleDeleteWish}>찜취소</button> }
      <div>후기후기</div>
      {reviews.map((review) => {
        <div key={review.id}>
          <p>{review.reviewImage}</p>
          <p>{review.star}</p>
          <p>{review.content}</p>
          <button>좋아요 싫어요</button>
        </div>
      })}
      <div>후기등록 폼</div>
      <form onSubmit={handleSubmit}>
        <p>{product.company}의 후기 작성</p>
        <Rating
          initialRating={starRating}
          onChange={(rate) => setStarRating(rate)}
          stop={5}
          emptySymbol={<span className="empty-star" style={{ color: 'gray', fontSize: '2em' }}>☆</span>}
          fullSymbol={<span className="full-star" style={{ color: 'gold', fontSize: '2em' }}>★</span>}
        />
        <br />
        <input
          type="file"
          accept="reviewImage/*"
          id="file"
          onChange={handleFileChange}
          required
        />
        {reviewImage && <img src={reviewImage} alt="여긴 이미지다" />}
        <br />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        ></textarea>
        <br />
        <button type="submit">작성하기</button>
        <button type="button" onClick={handleReset}>
          리셋입니다.
        </button>
      </form>
    </div>
  );
}