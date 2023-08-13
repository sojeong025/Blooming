import { customAxios } from "../../lib/axios";
import { useRecoilState } from "recoil";
import { myReviewState } from "../../recoil/ProfileAtom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import InfiniteScroll from "react-infinite-scroll-component";

import ReviewItem from "./ReviewItem";

export default function MyReview() {

  const navigate = useNavigate();

  const [myReview, setMyReview] = useRecoilState(myReviewState)
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async () => {
    try {
      const response = await customAxios.get("review", { params: { page: currentPage, size: 8 } });
      if (response.data.result[0].last) {
        setHasMore(false);
      } else {
        setCurrentPage(currentPage + 1);
      }
      setMyReview((prevProducts) => [
        ...prevProducts,
        ...response.data.result[0].content,
      ]);
    } catch (error) {
      console.error("예약 정보 조회 에러:", error);
    }
  };

  useEffect(() => {
    fetchData()
  }, [])

  const handleNavigation = (review) => {
    navigate(`/info/${review.productId}`, {
      state: { id: review.productId, productType: review.productType },
    });
  };

  return (
    <div style={{marginTop: '56px'}}>
      {myReview !== [] ? (
        <InfiniteScroll
          dataLength={myReview.length}
          next={fetchData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>모든 리뷰를 불러왔습니다.</b>
            </p>
          }
        >
          <div>
            {myReview.map((review) => (
              <div key={review.id}>
                <ReviewItem
                  review={review}
                  onClick={() => handleNavigation(review)}
                />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      ): (
        <div>작성한 리뷰가 없습니다.</div>
      )}
    </div>
  );
}

