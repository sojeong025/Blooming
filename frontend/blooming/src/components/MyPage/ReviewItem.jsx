import Rating from "react-rating";
import { FaStar } from "react-icons/fa";

import classes from "./ReviewItem.module.css";

export default function ReviewItem({ review }) {
  
  return (
    <div>
      <img src={review.image} alt="이미지 없음" />
      <div className={classes.starContainer}>
        <div>{review.productName} 도움이 돼요 {review.lickCnt}</div>
        <span className={classes.starTitle}>별점</span>
        <Rating
          className={classes.rating}
          initialRating={review.star}
          value={review.star}
          stop={5}
          emptySymbol={<FaStar className={classes.emptyStar} />}
          fullSymbol={<FaStar className={classes.fullStar} />}
        />
      </div>
      <div>{review.content}</div>
    </div>
  )
}