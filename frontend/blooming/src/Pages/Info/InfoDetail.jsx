import "react-responsive-carousel/lib/styles/carousel.min.css";

import classes from "../../components/Info/ProductDetailItem.module.css";
import { Carousel } from "antd";
import "../../Pages/Schedule/DatePickerSchedule.css";

import { useLocation, useNavigate } from "react-router-dom";
import { customAxios } from "../../lib/axios";
import { useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import ProductDetailItem from "../../components/Info/ProductDetailItem";

import DetailReviewForm from "../../components/Info/DetailReviewForm";
import DetailReviewList from "../../components/Info/DetailReviewList";
import { styled } from "styled-components";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import { MdLocationOn } from "react-icons/md";

import ReviewCreateModal from "../../components/Error/Modal";
import ReservationForm from "../../components/Info/ReservationModal";
import GotoTop from "../../components/Common/GoToTopButton";
import { userState } from "../../recoil/ProfileAtom";
import { useRecoilValue } from "recoil";

export default function InfoDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state.id;
  const productType = location.state.productType;

  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [product, setProduct] = useState();
  const address = product?.companyAddress.split(" ");

  // 후기 모달
  const [isReviewModal, setIsReviewModal] = useState(false);
  const [isReservationModal, setIsReservationModal] = useState(false);
  const userData = useRecoilValue(userState);
  const [formData, setFormData] = useState({ ...userData });

  const getCurrentRoundedDate = () => {
    const currentDate = new Date();
    const minutes = currentDate.getMinutes();
    const roundedMinutes = Math.ceil(minutes / 30) * 30;
    currentDate.setMinutes(roundedMinutes);
    currentDate.setSeconds(0);
    return currentDate;
  };
  // 예약하기와 관련된 날짜정보
  const [reservedDate, setReservedDate] = useState(new Date());
  const [reservedTime, setReservedTime] = useState(getCurrentRoundedDate());
  const onDateChange = (date) => {
    setReservedDate(date);
  };
  const onTimeChange = (time) => {
    setReservedTime(time);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...formData,
      [name]: value,
    }));
  };

  // 상품 정보 가져오기
  const fetchProductData = async () => {
    try {
      const response = await customAxios.get(`product/${productType}/${id}`);
      setProduct(response.data.result[0]);
    } catch (error) {
      console.error("이미지 정보 조회 에러:", error);
    }
  };
  // 상품 리뷰 가져오기
  const fetchReviewData = async () => {
    try {
      const response = await customAxios.get(`review/${id}`, {
        params: { page: currentPage, size: 8 },
      });
      // no content
      if (response.status === 204) {
        setHasMore(false);
      } else if (response.data.result[0].last) {
        setHasMore(false);
        setReviews((prevReviews) => [
          ...prevReviews,
          ...response.data.result[0].content,
        ]);
      } else {
        setReviews((prevReviews) => [
          ...prevReviews,
          ...response.data.result[0].content,
        ]);
        setCurrentPage(currentPage + 1);
      }
    } catch (error) {
      console.error("리뷰 정보 조회 에러:", error);
    }
  };

  const addMyReviewData = (review) => {
    setReviews((prevreview) => [review, ...prevreview]);
  };

  useEffect(() => {
    fetchProductData();
    fetchReviewData();
  }, []);

  const handleReserve = async () => {
    const formattedDate = `${reservedDate.getFullYear()}-${(
      reservedDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${reservedDate.getDate().toString().padStart(2, "0")}`;
    const formattedTime = `${reservedTime
      .getHours()
      .toString()
      .padStart(2, "0")}:${reservedTime
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    const data = {
      reservedDate: formattedDate,
      reservedTime: formattedTime,
      product_id: product.id,
    };
    try {
      const response = await customAxios.post("reservation", data);
      // 지금은 스케줄로 보내놨는데 스케쥴 수정 다하고 나면 바꿔야함. =============================================================================
      navigate(`/schedule/${response.data.result[0].scheduleId}`, {
        state: { navAction: "info" },
      });
    } catch (error) {
      alert("예약 가능한 시간이 아닙니다.");
    }
  };

  // 하트 버튼
  const handleCreateWish = async () => {
    try {
      await customAxios.post(`wishlist/${product.id}`);
      setProduct({ ...product, wish: true });
    } catch (error) {
      console.error("찜하기 에러:", error);
    }
  };
  const handleDeleteWish = async () => {
    try {
      await customAxios.delete(`wishlist/${product.id}`);
      setProduct({ ...product, wish: false });
    } catch (error) {
      console.error("찜취소 에러:", error);
    }
  };
  const onWish = () => {
    if (product.wish) {
      handleDeleteWish();
    } else {
      handleCreateWish();
    }
  };

  // 후기가 도움돼요
  const handleLikeClick = async (reviewId) => {
    try {
      const currentReview = reviews.find(
        (review) => review.reviewId === reviewId,
      );
      if (!currentReview) {
        console.log("리뷰를 찾을 수 없습니다.");
        return;
      }

      if (currentReview.liked) {
        await customAxios.delete(`liked/${reviewId}`);
      } else {
        await customAxios.post(`liked/${reviewId}`);
      }

      const updatedReviews = reviews.map((review) => {
        if (review.reviewId === reviewId) {
          const liked = !review.liked;
          const likeCnt = liked ? review.likeCnt + 1 : review.likeCnt - 1;
          return { ...review, liked, likeCnt };
        }
        return review;
      });

      setReviews(updatedReviews);
    } catch (error) {
      console.log("좋아요 에러", error);
    }
  };

  return (
    <Wrapper>
      {product && (
        <>
          {Array.isArray(product.images) && (
            <Carousel waitForAnimate autoplay>
              {product.images.map((item, index) => (
                <div key={index}>
                  <img
                    className={classes.CarouselImg}
                    src={item}
                    alt={product.company}
                  />
                </div>
              ))}
            </Carousel>
          )}

          {/* 타이틀 */}
          <div className={classes.topSticky}>
            <div className={classes.ProductTitle}>
              <div className={classes.location}>
                <span className={classes.locationIcon}>
                  <MdLocationOn size={18} />
                </span>
                <span className={classes.address}>
                  {address[0]} {address[1]}
                </span>
              </div>
              <div className={classes.companyTitle}>{product.company}</div>
            </div>
          </div>
          <hr className={classes.hr} />

          <ProductDetail>
            <div className={classes.TabTitle}>업체 정보</div>
            <ProductDetailItem product={product} productType={productType} />

            <hr className={classes.hr} />

            <div className={classes.TabTitle} style={{ marginBottom: "0" }}>
              후기
            </div>
            {reviews ? (
              <DetailReviewList
                reviews={reviews}
                hasMore={hasMore}
                fetchReviewData={fetchReviewData}
                onLikeClick={handleLikeClick}
              />
            ) : (
              <div>등록된 후기가 없습니다.</div>
            )}

            {/* 위로 */}
            <GotoTop />
          </ProductDetail>
        </>
      )}

      {/* 후기 작성 모달 */}
      <ReviewCreateModal
        show={isReviewModal}
        onClose={() => setIsReviewModal(false)}
      >
        <DetailReviewForm
          product={product}
          fetchReviewsData={addMyReviewData}
          onClose={() => setIsReviewModal(false)}
        />
      </ReviewCreateModal>

      {/* 예약하기 모달 */}
      <ReservationForm
        show={isReservationModal}
        onClose={() => setIsReservationModal(false)}
      >
        <div className={classes.Reservation}>
          <div className={`${classes.ReservationItem} info`}>
            <span>날짜</span>
            <DatePicker
              selected={reservedDate}
              onChange={onDateChange}
              dateFormat='yyyy-MM-dd'
              showMonthDropdown
              showYearDropdown
              dropdownMode='select'
            />
          </div>
          <div className={`${classes.ReservationItem} info`}>
            <span>시간</span>
            <DatePicker
              selected={reservedTime}
              onChange={onTimeChange}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              timeFormat='HH:mm'
              dateFormat='HH:mm'
            />
          </div>
          <div className={`${classes.ReservationItem}`}>
            <span>예약자</span>
            <input
              required
              className={classes.inputField}
              type='text'
              name='name'
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className={`${classes.ReservationItem}`}>
            <span>이메일</span>
            <input
              required
              className={classes.inputField}
              type='text'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className={`${classes.ReservationItem}`}>
            <span>연락처</span>
            <input
              required
              className={classes.inputField}
              type='text'
              name='phoneNumber'
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
          </div>
          <div className={`${classes.ReservationItem} ${classes.upText}`}>
            <span className={classes.p}>요청사항</span>
            <span>
              <textarea
                className={classes.textField}
                name='text'
                value={formData.text}
                onChange={handleInputChange}
              ></textarea>
            </span>
          </div>
        </div>
        <BottomButton2>
          <ReviewButton onClick={() => setIsReservationModal(false)}>
            <p>예약 취소</p>
          </ReviewButton>
          <ReserveButton
            onClick={() => {
              setIsReservationModal(true);
              handleReserve();
            }}
          >
            <p>예약하기</p>
          </ReserveButton>
        </BottomButton2>
      </ReservationForm>

      {/* 하단 버튼 */}
      <BottomButton>
        <HeartButton onClick={onWish} $isActive={product?.wish}>
          <div className='heartBorder'>
            {product?.wish ? (
              <AiFillHeart size={30} />
            ) : (
              <AiOutlineHeart size={30} />
            )}
          </div>
        </HeartButton>
        <ReviewButton onClick={() => setIsReviewModal(true)}>
          <p>후기쓰기</p>
        </ReviewButton>
        <ReserveButton onClick={() => setIsReservationModal(true)}>
          <p>예약하기</p>
        </ReserveButton>
      </BottomButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 55px 0 100px;

  height: 100%;
  background-color: white;
  --color-bg: white;
`;

const ProductDetail = styled.div`
  margin: 0 16px;
`;

const BottomButton = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;

  height: 55px;
  background-color: var(--color-bg);
  padding: 0 10px;
  box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);
`;
const BottomButton2 = styled(BottomButton)`
  div {
    width: 48%;
  }
`;

const HeartButton = styled.div`
  color: ${({ $isActive }) =>
    $isActive ? "var(--color-heart)" : "var(--color-heart-inactive)"};
  width: 10%;
  display: flex;
  justify-content: center;
  align-items: center;

  .heartBorder {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45px;
    height: 45px;
  }
`;

const Button = styled.div`
  border-radius: 8px;
  width: 42%;
  height: 40px;
  margin: auto 0;
  display: flex;
  justify-content: center;
  align-items: center;

  &:active {
    opacity: 0.5;
  }
  p {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
  }
`;

const ReviewButton = styled(Button)`
  background-color: var(--color-point-opacity);
  p {
    color: var(--color-point-text);
  }
`;

const ReserveButton = styled(Button)`
  background-color: var(--color-point);
  color: white;
`;
