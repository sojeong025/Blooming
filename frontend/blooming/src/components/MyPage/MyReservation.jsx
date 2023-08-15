import { customAxios } from "../../lib/axios";
import { useRecoilState } from "recoil";
import { myReservationState } from "../../recoil/ProfileAtom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReservationItem from "./ReservationItem";

export default function MyReservation() {
  const navigate = useNavigate();
  const [MyReservation, setMyReservation] = useRecoilState(myReservationState);

  const fetchData = async () => {
    try {
      const response = await customAxios.get("reservation");
      setMyReservation(response.data.result[0]);
    } catch (error) {
      console.error("예약 정보 조회 에러:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 일정으로 가야하나?
  // 일단 상품상세
  const handleNavigation = (reservation) => {
    navigate(`/${reservation.productType}/${reservation.productId}`, {
      state: {
        id: reservation.productId,
        productType: reservation.productType,
        navAction: "info",
      },
    });
  };

  return (
    <div style={{ marginTop: "60px" }}>
      {MyReservation !== [] ? (
        MyReservation.map((reservation) => (
          <div
            key={reservation.reservationId}
            onClick={() => handleNavigation(reservation)}
          >
            <ReservationItem reservation={reservation} />
          </div>
        ))
      ) : (
        <div>예약이 없습니다.</div>
      )}
    </div>
  );
}
