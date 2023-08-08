import { customAxios } from "../../lib/axios";
import { useRecoilState } from "recoil";
import { myReviewState } from "../../recoil/ProfileAtom";
import { useEffect } from "react";

export default function MyReview() {

  const [myReview, setMyReview] = useRecoilState(myReviewState)

  const fetchData = async () => {
    try {
      const response = await customAxios.get("review");
      setMyReview(response.data.result[0])
    } catch (error) {
      console.error("예약 정보 조회 에러:", error);
    }
  };

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div style={{marginTop: '56px'}}>
      {myReview}
    </div>
  );
}