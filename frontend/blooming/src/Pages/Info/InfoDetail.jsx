import "react-responsive-carousel/lib/styles/carousel.min.css";

// import classes from "./InfoDetail.module.css";
import classes from "../../components/Info/ProductDetailItem.module.css";

import { useLocation, useNavigate } from "react-router-dom";
import { customAxios } from "../../lib/axios";
import { useEffect, useRef, useState } from "react";

import { Carousel } from "react-responsive-carousel";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import ProductDetailItem from "../../components/Info/ProductDetailItem";

import DetailReviewForm from "../../components/Info/DetailReviewForm";
import DetailReviewList from "../../components/Info/DetailReviewList";
import { styled } from "styled-components";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import { MdLocationOn } from "react-icons/md";

import ReviewCreateModal from "../../components/Error/Modal";
import GotoTop from "../../components/Common/GoToTopButton";

export default function InfoDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state.id;
  const productType = location.state.productType;
  // 디자인 용 더미 =======================================================================================================================
  // const id = 85;
  // const productType = "DRESS";

  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [product, setProduct] = useState();
  const address = product?.companyAddress.split(" ");

  // 후기 모달
  const [isReviewModal, setIsReviewModal] = useState(false);

  // 예약하기와 관련된 날짜정보
  const [reservedDate, setReservedDate] = useState(new Date());
  const [reservedTime, setReservedTime] = useState(new Date());
  const onDateChange = (date) => {
    console.log(date);
    setReservedDate(date);
  };
  const onTimeChange = (time) => {
    console.log(time);
    setReservedTime(time);
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
    // 디자인 용 더미 =======================================================================================================================
    // setProduct({
    //   id: 29,
    //   itemName: "[스냅] 신부신랑 헤어메이크업(주중)",
    //   brief:
    //     "대중적인 금액대, 수입 및  자체 디자인 보유자체 디자인 보유자체 디자인 보유",
    //   thumbnail:
    //     "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/product/dress/29_thumbnail.jpg",
    //   company: "브라이덜수지",
    //   companyTime: "10:00 ~ 20:00",
    //   companyAddress: "서울 강남구 선릉로148길 48 서울 강남구 선릉로148길 48",
    //   images: [
    //     "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/product/dress/29_image1.jpg",
    //     "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/product/dress/29_image2.jpg",
    //     "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/product/dress/29_image3.jpg",
    //   ],
    //   wish: false,
    // });
    // setReviews([
    //   {
    //     reviewId: 21555,
    //     star: 5,
    //     image:
    //       "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/REVIEW/%EB%B6%80%EC%9A%B8%EA%B2%BD_1%EB%B0%98_%EA%B5%AC%ED%9D%AC%EC%98%81_f1a5fdb0-46ce-455d-97ec-e1057bb355ee.JPG",
    //     content:
    //       "ㄴㅇㅁㅁㅇㄴ대중적인 금액대, 수입 및  자체 디자인 보유자체 디자인 보유자체 디자인 보유대중적인 금액대, 수입 및  자체 디자인 보유자체 디자인 보유자체 디자인 보유대중적인 금액대, 수입 및  자체 디자인 보유자체 디자인 보유자체 디자인 보유대중적인 금액대, 수입 및  자체 디자인 보유자체 디자인 보유자체 디자인 보유",
    //     likeCnt: 0,
    //     nickName: "ㅎㅇ",
    //     email: "lotus0028@kakao.com",
    //     createdDate: "2023-08-15T03:24:54.970296",
    //     updatedDate: "2023-08-15T03:24:54.970296",
    //     liked: false,
    //   },
    //   {
    //     reviewId: 21554,
    //     star: 5,
    //     image:
    //       "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/REVIEW/%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202023-07-31%20090848_d75370ed-b888-43c7-b7e2-4bbee27cae55.png",
    //     content: "ㄴㄴㅇㅁㅇㅁㅁㄴ",
    //     likeCnt: 0,
    //     nickName: "ㅎㅇ",
    //     email: "lotus0028@kakao.com",
    //     createdDate: "2023-08-15T03:24:47.389665",
    //     updatedDate: "2023-08-15T03:24:47.389665",
    //     liked: false,
    //   },
    //   {
    //     reviewId: 21553,
    //     star: 3,
    //     image: "",
    //     content: "ㄴㅇ",
    //     likeCnt: 0,
    //     nickName: "ㅎㅇ",
    //     email: "lotus0028@kakao.com",
    //     createdDate: "2023-08-15T03:24:42.828944",
    //     updatedDate: "2023-08-15T03:24:42.828944",
    //     liked: false,
    //   },
    // ]);
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
      navigate(`/schedule/${response.data.result[0].scheduleId}`);
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

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const handleCarouselChange = (index) => {
    setCurrentImageIndex(index);
  };
  return (
    <Wrapper>
      {product && (
        <>
          {/* 사진 수정할거: 1/3 보이기, 이미지 사이즈 줄이기: 스크롤이 안됨 */}
          {Array.isArray(product.images) && (
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
              // renderIndicator={() => {}}
            >
              {product.images.map((image, index) => (
                <div key={index}>
                  <img src={image} alt='이미지가 없습니다.' />
                </div>
              ))}
            </Carousel>
          )}
          {/* =================================================== */}

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

            {/* 예약 */}
            <h1>예약 --</h1>
            <div>
              <DatePicker
                selected={reservedDate}
                onChange={onDateChange}
                dateFormat='yyyy-MM-dd'
                showMonthDropdown
                showYearDropdown
                dropdownMode='select'
              />
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
            <button onClick={handleReserve}>예약하기</button>

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
        <ReserveButton>
          <p>예약하기</p>
        </ReserveButton>
      </BottomButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 55px 0;

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
