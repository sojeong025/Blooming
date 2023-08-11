import "react-responsive-carousel/lib/styles/carousel.min.css";

import classes from "./InfoDetail.module.css";

import { useLocation, useNavigate } from "react-router-dom";
import { customAxios } from "../../lib/axios";
import { useCallback, useEffect, useState } from "react";

import { Carousel } from "react-responsive-carousel";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import ProductDetailItem from "../../components/Info/ProductDetailItem";

import DetailReviewForm from "../../components/Info/DetailReviewForm";
import DetailReviewList from "../../components/Info/DetailReviewList";
import { styled } from "styled-components";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

export default function InfoDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state.id;
  const productType = location.state.productType;
  // 디자인 용 더미
  // const id = 85;
  // const productType = "HALL";

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleCarouselChange = (index) => {
    setCurrentImageIndex(index);
  };

  const [reviews, setReviews] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [product, setProduct] = useState();

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

  const fetchProductData = async () => {
    try {
      const response = await customAxios.get(`product/${productType}/${id}`);
      setProduct(response.data.result[0]);
      fetchReviewData();
    } catch (error) {
      console.error("이미지 정보 조회 에러:", error);
    }
  };

  const fetchReviewData = async () => {
    try {
      const response = await customAxios.get(`review/${id}`, {
        params: { page: currentPage, size: 4 },
      });
      if (response.status === 204) {
        setHasMore(false);
      } else {
        if (response.data.result[0].last) {
          setHasMore(false);
        } else {
          setReviews((prevReviews) => [
            ...prevReviews,
            ...response.data.result[0].content,
          ]);
          setCurrentPage(currentPage + 1);
        }
      }
    } catch (error) {
      console.error("리뷰 정보 조회 에러:", error);
    }
  };

  useEffect(() => {
    fetchProductData();
    // 디자인 용 더미
    // setProduct({
    //   id: 85,
    //   itemName: "빌라드지디 수서",
    //   brief:
    //     "2019년 9월, 하우스웨딩의 대명사인 더그레이스켈리 강남점에 이어 2호점 오픈! 빌라드지디 수서!",
    //   thumbnail:
    //     "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/product/hall/85_thumbnail.jpg",
    //   company: "빌라드지디 수서",
    //   companyTime: "None",
    //   companyAddress: "서울 강남구 율현동 68-8",
    //   images: [
    //     "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/product/hall/85_image1.jpg",
    //     "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/product/hall/85_image2.jpg",
    //     "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/product/hall/85_image3.jpg",
    //   ],
    //   wish: true,
    // });
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
      await customAxios.post("reservation", data);
      // 지금은 스케줄로 보내놨는데 스케쥴 수정 다하고 나면 바꿔야함.
      navigate("/schedule");
    } catch (error) {
      console.log(error);
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

  // const showTopButton = useCallback(() => {
  //   const topButton = document.getElementById("topButton");
  //   if (
  //     document.body.scrollTop > 100 ||
  //     document.documentElement.scrollTop > 100
  //   ) {
  //     topButton.style.display = "block";
  //   } else {
  //     topButton.style.display = "none";
  //   }
  // }, []);

  // useEffect(() => {
  //   window.addEventListener("scroll", showTopButton);

  //   return () => {
  //     window.removeEventListener("scroll", showTopButton);
  //   };
  // }, [showTopButton]);

  // const scrollToTop = () => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // };

  return (
    <Wrapper>
      {product && (
        <>
          {Array.isArray(product.images) && (
            <Carousel
              infiniteLoop
              showThumbs={false}
              showStatus={false}
              showArrows={false}
              emulateTouch
              swipeable
              // className={classes["image-carousel"]}
              onChange={handleCarouselChange}
              selectedItem={currentImageIndex}
              renderIndicator={() => {}}
            >
              {product.images.map((image, index) => (
                <div key={index}>
                  <img src={image} alt='이미지가 없습니다.' />
                </div>
              ))}
            </Carousel>
          )}
          <ProductDetail>
            <ProductDetailItem product={product} productType={productType} />

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

            <DetailReviewForm
              product={product}
              fetchReviewData={fetchReviewData}
            />
            <div>{product.company} 후기</div>
            {reviews ? (
              <DetailReviewList
                hasMore={hasMore}
                reviews={reviews}
                fetchReviewData={fetchReviewData}
              />
            ) : (
              <div>등록된 후기가 없습니다.</div>
            )}

            {/* <button
              id='topButton'
              onClick={scrollToTop}
              className={classes.topButton}
            >
              Top
            </button> */}
          </ProductDetail>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
            quo reiciendis error maiores ipsam placeat id deserunt nihil,
            voluptatibus porro ut eligendi officiis alias excepturi nisi quia
            impedit enim et. Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Maiores rem, deleniti illum illo quisquam incidunt quod, aut
            exercitationem corporis soluta at! Quas nulla modi architecto
            quisquam, vitae inventore asperiores provident. Eligendi illo ipsa
            doloribus consectetur et quae culpa quam sint expedita deleniti cum,
            eveniet dolore. Delectus, nulla. Praesentium amet sint consectetur
            accusamus eligendi culpa. Eum deleniti commodi adipisci reiciendis
            laudantium? Veritatis harum id quasi quibusdam quis accusantium
            dolorum doloremque, officia, nobis mollitia et repudiandae minus
            sapiente commodi vel architecto reiciendis? Similique illo culpa
            reiciendis illum. Reiciendis dolore iure veritatis maxime? Natus
            voluptatem impedit adipisci ratione cumque necessitatibus aspernatur
            assumenda eius recusandae excepturi facere perspiciatis explicabo,
            rerum vel ipsum! Voluptas deserunt, odit dolorem nobis vitae
            voluptate dolorum reprehenderit nostrum quam unde? Rem sit debitis
            labore earum accusamus sed facilis voluptatem consequuntur, ab
            deleniti saepe nulla qui commodi quaerat reiciendis sapiente. Atque
            quasi dolores mollitia repellat odit. Soluta, quo veniam.
            Perspiciatis, odit? Sequi earum repudiandae maiores dicta libero,
            ullam laboriosam animi. Vero rem ut, accusamus quae nihil minus,
            sint consectetur facilis voluptates fugit ad facere. Perferendis
            sint commodi, quos facere ut fugiat. Perferendis, deserunt nesciunt
            nisi ratione recusandae blanditiis molestias libero obcaecati
            nostrum, nulla optio animi quam officia illum tempore! Odit, quo.
            Eius numquam id esse recusandae maiores molestias obcaecati commodi
            voluptate! Odit sapiente nulla veritatis, minus, necessitatibus
            laborum voluptate nobis dicta iure explicabo temporibus tempore
            quae, eaque blanditiis! Molestiae molestias ullam ratione aut
            voluptate sunt, repudiandae, odit eius, non tempore dignissimos.
            Necessitatibus a, ullam perspiciatis saepe neque magnam nemo
            dignissimos aliquid atque assumenda in quos deserunt culpa iste
            omnis voluptate quam consequuntur consectetur incidunt, et eum. Eos
            et quia ea aspernatur! Blanditiis, reprehenderit vero minus
            repudiandae ab quos repellendus cupiditate rerum dolorum non cumque
            exercitationem quod porro corporis earum nesciunt rem aspernatur
            provident mollitia, et sunt id expedita? Dolorum, et? Pariatur?
          </div>
        </>
      )}
      <BottomButton>
        <HeartButton onClick={onWish} isActive={product?.wish}>
          {/* 하뚜 */}
          <div className='heartBorder'>
            {product?.wish ? (
              <AiFillHeart size={30} />
            ) : (
              <AiOutlineHeart size={30} />
            )}
          </div>
        </HeartButton>
        <ReviewButton>
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
  margin-top: 57px;
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

  height: 50px;
  background-color: var(--color-bg);
  /* background-color: white; */
  padding: 0 10px;
  box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);
`;

const HeartButton = styled.div`
  color: ${({ isActive }) =>
    isActive ? "var(--color-heart)" : "var(--color-heart-inactive)"};
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
  p {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
  }

  /* --color-groom-transparent: rgba(77, 101, 178, 0.7);
  --color-groom-active-transparent: rgba(60, 82, 152, 0.7); */
  /* background-color: #4d65b2; */
`;

const ReviewButton = styled(Button)`
  /* background-color: var(--color-groom); */
  background-color: rgba(77, 101, 178, 0.12);
  p {
    color: #4d65b2;
  }
`;

const ReserveButton = styled(Button)`
  /* background-color: var(--color-groom); */
  background-color: #4d65b2;
  color: white;
`;
