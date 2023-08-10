import InfiniteScroll from "react-infinite-scroll-component";

export default function DetailReviewList({hasMore, reviews, fetchReviewData}) {

  return (
    <>
      <InfiniteScroll
        dataLength={reviews.length}
        next={fetchReviewData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>모든 상품을 불러왔습니다.</b>
          </p>
        }
      >
        <div>
          {reviews.map((review) => (
            <div key={review.id}>
              <p>작성자: {review.nickName} {review.email}</p>
              <img src={review.image} alt="이미지가 없습니다." />
              <p>{review.star}</p>
              <p>{review.content}</p>
              <button>도움이 돼요! {review.likeCnt}</button>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </>
  )
}



