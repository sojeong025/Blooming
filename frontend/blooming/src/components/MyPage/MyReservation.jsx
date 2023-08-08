import { customAxios } from "../../lib/axios";
import { useRecoilState } from "recoil";
import { myReservationState } from "../../recoil/ProfileAtom";
import { useEffect } from "react";

export default function MyReservation() {

  const [MyReservation, setMyReservation] = useRecoilState(myReservationState)

  const fetchData = async () => {
    try {
      const response = await customAxios.get("reservation");
      setMyReservation(response.data.result[0])
    } catch (error) {
      console.error("예약 정보 조회 에러:", error);
    }
  };

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div style={{marginTop: '56px'}}>
      {MyReservation}
    </div>
  );
}