import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import classes from "./InfoDetail.module.css";

import { useLocation } from "react-router-dom";
import { customAxios, fileAxios } from "../../lib/axios";
import { useEffect, useRef, useState } from "react";
import Rating from "react-rating";

export default function InfoDetail() {
  
  const location = useLocation();
  const [product, setProduct] = useState(location.state.product)
  const productType = location.state.productType
  const [images, setImages] = useState([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [reviews, setReviews] = useState([])


  // 리뷰쓰는 폼관련된 State
  const [starRating, setStarRating] = useState(0);
  const [comment, setComment] = useState('');
  const [imgFile, setImgFile] = useState('');

  const [reviewImage, setReviewImage] = useState('');

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

  const reviewData = {
    product_id: product.id,
    star: starRating,
    image: imgFile,
    content: comment
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const createReview = async () => {
      try {
        await customAxios.post("review", reviewData);
        await fetchReviewData();
      } catch (error) {
        console.error(error);
      }
    };
    createReview();
  };

  const fileInputRef = useRef(null);

  const handleReset = () => {
    setStarRating(0);
    setComment('');
    setReviewImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('image', file)
        const response = await fileAxios.post('REVIEW', formData)
        console.log('이건 이미지 s3 api', response.data.result[0].uploadImageUrl)
        setImgFile(response.data.result[0].uploadImageUrl)
      } catch (error) {
        console.error('이미지 api 오류',error);
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setReviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReserve = () => {
    // 이건 예약 API
    // 어찌할지 모르겠지만 얘는 음..... 음......
    // 모달이든 페이지든 이동해서 시간 입력받는칸 만들어야겠지??? 근데 만들어서 다시 어디 보낼꺼 아니면 음
    // 모달이 낫겠지? 그리고 만들고나면 예약했는지 안했는지 여부도 알아야겠지? 이건 API요청했을때 저쪽에서
    // 예약된 정보도 줘야겠네? 예약 API 힘들겠다 ㅎㅎ
    // 그리고 시간은 companyTime에서 가져와서 거기 안에서 1시간단위로 시간 보낼수 있게 해야겠쥬?
    // 이정도 힌트 줬으면 만들어보아요 난 귀찮아요.
  }

  const handleCreateWish = async () => {
    try {
      await customAxios.post(`wishlist/${product.id}`);
      setProduct({ ...product, wish: true })
      console.log(product)
    } catch (error) {
      console.error("찜하기 에러:", error);
    }
  }

  const handleDeleteWish = async () => {
    try {
      await customAxios.delete(`wishlist/${product.id}`);
      setProduct({ ...product, wish: false })
      console.log(product)
    } catch (error) {
      console.error("찜취소 에러:", error);
    }
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
      <button onClick={handleReserve}>예약하기</button>
      <button onClick={product.wish ? handleDeleteWish : handleCreateWish}>
        {product.wish ? "찜취소" : "찜하기"}
      </button>
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
          ref={fileInputRef}
          onChange={handleFileChange}
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