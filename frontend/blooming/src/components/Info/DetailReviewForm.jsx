import { useState, useRef } from "react";
import { customAxios, fileAxios } from "../../lib/axios";
import Rating from "react-rating";

import classes from "./DetailReviewForm.module.css";
import { styled } from "styled-components";

import {
  AiOutlineClose,
  AiOutlineCheck,
  AiOutlineCamera,
} from "react-icons/ai";
import { FaStar } from "react-icons/fa";

export default function DetailReviewForm({
  product,
  fetchReviewData,
  onClose,
}) {
  // 리뷰쓰는 폼관련된 State
  const [starRating, setStarRating] = useState(0);
  const [comment, setComment] = useState("");
  const [imgFile, setImgFile] = useState("");

  // 화면에 보여줄 리뷰 이미지
  const [reviewImage, setReviewImage] = useState("");

  const reviewData = {
    product_id: product.id,
    star: starRating,
    image: imgFile,
    content: comment,
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

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("image", file);
        const response = await fileAxios.post("REVIEW", formData);
        // console.log(
        //   "이건 이미지 s3 api",
        //   response.data.result[0].uploadImageUrl,
        // );
        setImgFile(response.data.result[0].uploadImageUrl);
      } catch (error) {
        console.error("이미지 api 오류", error);
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setReviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 입력 초기화 안씀
  // const handleReset = () => {
  //   setStarRating(0);
  //   setComment("");
  //   setReviewImage(null);

  //   if (fileInputRef.current) {
  //     fileInputRef.current.value = "";
  //   }
  // };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <div className={classes.ModalTop}>
          <div className={classes.closeBtn} onClick={onClose}>
            <AiOutlineClose size={24} />
          </div>
          <p>{product.company}</p>
          <button type='submit' className={classes.submitBtn}>
            <AiOutlineCheck size={24} />
          </button>
        </div>
        <div className={classes.formContainer}>
          <div className={classes.starContainer}>
            <span className={classes.starTitle}>별점</span>
            <Rating
              className={classes.rating}
              initialRating={starRating}
              value={starRating}
              onChange={setStarRating}
              stop={5}
              emptySymbol={<FaStar className={classes.emptyStar} />}
              fullSymbol={<FaStar className={classes.fullStar} />}
            />
            <span className={classes.starRating}>{starRating} / 5</span>
          </div>
          <Hr />
          <textarea
            className={classes.textarea}
            placeholder='업체에 대한 리뷰를 작성해주세요'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>

        <div className={classes.inputContainer}>
          <div className={classes.inputImg}>
            {reviewImage && <img src={reviewImage} alt='업로드 이미지' />}
          </div>
          <Hr />
          <label htmlFor='file' className={classes.customInput}>
            <span>
              <AiOutlineCamera size={20} />
            </span>
            <span>사진 추가하기</span>
          </label>
          <input
            type='file'
            accept='reviewImage/*'
            id='file'
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;

  form {
    display: flex;
    flex-direction: column;
  }
`;

const Hr = styled.hr`
  opacity: 0.5;
  margin: 5px 0;
`;
