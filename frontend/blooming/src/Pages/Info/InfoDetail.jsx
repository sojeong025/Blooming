import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import classes from "./InfoDetail.module.css";

import { useLocation, useNavigate } from "react-router-dom";
import { customAxios } from "../../lib/axios";
import { useEffect, useState } from "react";

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import DetailReviewForm from "../../components/Info/DetailReviewForm";

export default function InfoDetail() {
  
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state.id
  const productType = location.state.productType
  const [product, setProduct] = useState()
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [reviews, setReviews] = useState()
  
  // 예약하기와 관련된 날짜정보
  const [reservedDate, setReservedDate] = useState(new Date());
  const [reservedTime, setReservedTime] = useState(new Date());

  const onDateChange = (date) => {
    console.log(date)
    setReservedDate(date);
  };

  const onTimeChange = (time) => {
    console.log(time)
    setReservedTime(time);
  };


  const fetchProductData = async () => {
    try {
      const response = await customAxios.get(`product/${productType}/${id}`);
      setProduct(response.data.result[0])
      fetchReviewData()
    } catch (error) {
      console.error("이미지 정보 조회 에러:", error);
    }
  }

  const fetchReviewData = async () => {
    try {
      const response = await customAxios.get(`review/${id}`);
      setReviews(response.data.result[0])
      console.log(response.data.result[0])
    } catch (error) {
      console.error("리뷰 정보 조회 에러:", error);
    }
  };

  useEffect(() => {
    fetchProductData()
  }, [])

  const handleReserve = async () => {
    const selectedDate = new Date(reservedDate)
    const selectedTime = new Date(reservedTime)
    const formattedDate = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}-${selectedDate.getDate().toString().padStart(2, '0')}`;
    const formattedTime = `${selectedTime.getHours().toString().padStart(2, '0')}:${selectedTime.getMinutes().toString().padStart(2, '0')}`;

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

  window.onscroll = function () {
    showTopButton();
  };

  function showTopButton() {
    const topButton = document.getElementById("topButton");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      topButton.style.display = "block";
    } else {
      topButton.style.display = "none";
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div style={{marginTop: '102px', marginBottom: '80px'}}>
      {product &&
        <>
          <p>{product.itemName}</p>
          {Array.isArray(product.images) && <Carousel
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
            {product.images.map((image, index) => (
              <div key={index}>
                <img src={image} alt='이미지가 없습니다.' />
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
          <DetailReviewForm product={product} fetchReviewData={fetchReviewData} />
          <div>{product.company} 후기</div>
          {reviews ? reviews.map((review) => (
            <div key={review.id}>
              <p>작성자: {review.nickName} {review.email}</p>
              <img src={review.image} alt="이미지가 없습니다." />
              <p>{review.star}</p>
              <p>{review.content}</p>
              <button>도움이 돼요! {review.likeCnt}</button>
            </div>
          )) : <div>등록된 후기가 없습니다.</div>}
          <button id="topButton" onClick={scrollToTop} className={classes.topButton}>
            Top
          </button>
        </>
      }
    </div>
  );
}