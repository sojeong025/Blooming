import { customAxios } from "../../lib/axios";
import { useRecoilState } from "recoil";
import { myReviewState } from "../../recoil/ProfileAtom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DetailReviewList from "../Info/DetailReviewList";

export default function MyReview() {
  const navigate = useNavigate();

  const [myReview, setMyReview] = useRecoilState(myReviewState);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async () => {
    try {
      const response = await customAxios.get("review", {
        params: { page: currentPage, size: 8 },
      });
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
    fetchData();
    return setMyReview([]);
  }, []);

  const handleNavigation = (review) => {
    navigate(`/${review.productType}/${review.productId}`, {
      state: { id: review.productId, productType: review.productType },
    });
  };

  return (
    <div style={{ margin: "60px 16px" }}>
      {myReview.length !== 0 ? (
        <DetailReviewList
          hasMore={hasMore}
          reviews={myReview}
          fetchReviewData={fetchData}
          onReviewClick={handleNavigation}
        />
      ) : (
        <div>작성한 리뷰가 없습니다.</div>
      )}
    </div>
  );
}
