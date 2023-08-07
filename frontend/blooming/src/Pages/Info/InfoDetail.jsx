import { useLocation } from "react-router-dom";
import { customAxios } from "../../lib/axios";
import { useRecoilState } from "recoil";
import { reviewState } from "../../recoil/ProductAtom";
import { useEffect, useState } from "react";
import Rating from "react-rating";

export default function InfoDetail() {
  
  const location = useLocation();
  const product = location.state.product
  const [reviews, setReviews] = useRecoilState(reviewState)

  // 리뷰쓰는 폼관련된 State
  const [starRating, setStarRating] = useState(0);
  const [comment, setComment] = useState('');
  const [image, setImage] = useState(null);

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
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    // 폼 제출 로직 작성
    // api요청해서 값넣고 성공하면 두고 실패하면 현재 페이지 redirect????
  };

  const handleReset = () => {
    setStarRating(0);
    setComment('');
    setImage(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
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

  return (
    <div>
      <p>{product.id}</p>
      <p>{product.itemName}</p>
      <p>{product.brief}</p>
      <p>{product.company}</p>
      <p>{product.companyTime}</p>
      <p>{product.companyAddress}</p>
      <p>{product.thumbnail}</p>
      <p>{product.deatilImage1}</p>
      <p>{product.deatilImage2}</p>
      <p>{product.deatilImage3}</p>
      <button onClick={handleReserve}>예약하기</button>
      {product.wishList ? <button onClick={handleCreateWish}>찜하기</button> : <button onClick={handleDeleteWish}>찜취소</button> }
      <div>후기후기</div>
      {reviews.map((review) => {
        <div key={review.id}>
          <p>{review.image}</p>
          <p>{review.star}</p>
          <p>{review.content}</p>
          <button>좋아요 싫어요</button>
        </div>
      })}
      <div>후기등록 폼</div>
      <form onSubmit={handleSubmit}>
        <p>{product.itemName}의 후기 작성</p>
        <Rating
          initialRating={starRating}
          onChange={(rate) => setStarRating(rate)}
          stop={5}
          emptySymbol="☆"
          fullSymbol="★"
        />
        <br />
        <input
          type="file"
          accept="image/*"
          id="file"
          onChange={handleFileChange}
          required
        />
        {image && <img src={image} alt="여긴 이미지다" />}
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