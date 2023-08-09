import { useState, useRef } from "react";
import { customAxios, fileAxios } from "../../lib/axios";
import Rating from "react-rating";

export default function DetailReviewForm({ product, fetchReviewData}) {
  
  // 리뷰쓰는 폼관련된 State
  const [starRating, setStarRating] = useState(0);
  const [comment, setComment] = useState('');
  const [imgFile, setImgFile] = useState('');

  // 화면에 보여줄 리뷰 이미지
  const [reviewImage, setReviewImage] = useState('');

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

  return (
    <div>
      <div>{product.company} 후기 작성</div>
      <form onSubmit={handleSubmit}>
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
          초기화
        </button>
      </form>
    </div>
  )
}