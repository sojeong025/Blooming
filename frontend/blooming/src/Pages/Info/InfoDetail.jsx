import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import classes from "./InfoDetail.module.css";

import { useLocation, useNavigate } from "react-router-dom";
import { customAxios, fileAxios } from "../../lib/axios";
import { useEffect, useRef, useState } from "react";
import Rating from "react-rating";

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function InfoDetail() {
  
  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState(location.state.product)
  const productType = location.state.productType
  const [images, setImages] = useState([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [reviews, setReviews] = useState([])
  
  // 예약하기와 관련된 날짜정보
  const [reservedDate, setReservedDate] = useState(new Date());
  const [reservedTime, setReservedTime] = useState(new Date());

  const onDateChange = (date) => {
    setReservedDate(date);
  };

  const onTimeChange = (time) => {
    setReservedTime(time);
  };

  // 리뷰쓰는 폼관련된 State
  const [starRating, setStarRating] = useState(0);
  const [comment, setComment] = useState('');
  const [imgFile, setImgFile] = useState('');

  // 화면에 보여줄 이미지
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

  const handleReserve = async () => {
    const formattedDate = `${reservedDate.getFullYear()}-${(reservedDate.getMonth() + 1).toString().padStart(2, '0')}-${reservedDate.getDate().toString().padStart(2, '0')}`;
    const formattedTime = `${reservedTime.getHours().toString().padStart(2, '0')}:${reservedTime.getMinutes().toString().padStart(2, '0')}`;

    const data = {
      reservedDate: formattedDate,
      reservedTime: formattedTime,
      product_id: product.id
    };
    try {
      await customAxios.post('reservation', data)
      // 지금은 스케줄로 보내놨는데 스케쥴 수정 다하고 나면 바꿔야함.
      navigate('/schedule')
    } catch (error) {
      console.log(error)
    }
    
  };

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
      <div>
        <DatePicker
          selected={reservedDate}
          onChange={onDateChange}
          dateFormat="yyyy-MM-dd"
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
        />
        <DatePicker
          selected={reservedTime}
          onChange={onTimeChange}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={30}
          timeFormat="HH:mm"
          dateFormat="HH:mm"
        />
      </div>
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