import InfiniteScroll from "react-infinite-scroll-component";
import classes from "./DetailReviewList.module.css";
import Modal from "../Error/Modal";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import { GoThumbsup } from "react-icons/go";

import Rating from "react-rating";
import { customAxios } from "../../lib/axios";

export default function DetailReviewList({
  hasMore,
  reviews,
  fetchReviewData,
  onLikeClick,
}) {
  const [isModal, setIsModal] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const maskEmail = (email) => {
    const [user, domain] = email.split("@");
    const maskedDomain = domain.replace(/./g, "*");
    return `${user}@${maskedDomain}`;
  };

  return (
    <>
      <InfiniteScroll
        dataLength={reviews.length}
        next={fetchReviewData}
        hasMore={hasMore}
        // loader={<h4>Loading...</h4>}
        // endMessage={
        //   <p style={{ textAlign: "center" }}>
        //     <b>모든 후기를 불러왔습니다.</b>
        //   </p>
        // }
      >
        <div className={classes.ReviewsContainer}>
          {reviews.map((review) => (
            <div key={review.reviewId} className={classes.ReviewContainer}>
              <div className={classes.ReviewWriter}>
                <div>
                  <span className={classes.ReviewStar}>
                    <Rating
                      className={classes.rating}
                      initialRating={review.star}
                      stop={5}
                      emptySymbol={<FaStar className={classes.emptyStar} />}
                      fullSymbol={<FaStar className={classes.fullStar} />}
                    />
                  </span>
                  <span className={`${classes.Grey} ${classes.date}`}>
                    {review.createdDate.slice(0, 10)}
                  </span>
                </div>

                <div className={` ${classes.nameContainer}`}>
                  <p className={`${classes.name}`}>
                    {review.nickName}({maskEmail(review.email)})
                  </p>
                  <div
                    onClick={() => {
                      onLikeClick(review.reviewId);
                    }}
                    className={`${classes.ThumbsUp} ${
                      review.liked ? classes.ThumbsUpBlue : classes.ThumbsUpGrey
                    }`}
                  >
                    <GoThumbsup size={20} />
                    <span>{review.likeCnt}</span>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <p className={classes.ReviewContent}>{review.content}</p>
                  {review.image && (
                    <img
                      onClick={() => {
                        setSelectedImageUrl(review.image);
                        setIsModal(true);
                      }}
                      className={classes.ReviewImg}
                      src={review.image}
                      alt='이미지가 없습니다.'
                    />
                  )}
                </div>
              </div>

              <Modal
                show={isModal}
                onClose={() => setIsModal(false)}
                backgroundColor='none'
              >
                <div
                  onClick={() => setIsModal(false)}
                  className={classes.CloseButton}
                >
                  <AiOutlineClose size={24} />
                </div>
                <img
                  className={classes.ModalImage}
                  src={selectedImageUrl}
                  alt='이미지가 없습니다.'
                />
              </Modal>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
}
