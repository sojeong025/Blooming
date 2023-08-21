import { useRecoilState } from "recoil";
import { customAxios } from "../../lib/axios";
import classes from "./ReservationItem.module.css";
import { BsTrash } from "react-icons/bs"
import { myReservationState } from "../../recoil/ProfileAtom";

export default function ReservationItem({ onClick, reservation }) {
  const [MyReservations, setMyReservations] = useRecoilState(myReservationState);

  const DisplayDate = (date) => {
    const parsedDate = new Date(date);
    const year = parsedDate.getFullYear();
    const month = parsedDate.getMonth() + 1;
    const day = parsedDate.getDate();
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    const dayOfWeek = weekdays[parsedDate.getDay()];
    return `${year}년 ${month}월 ${day}일 (${dayOfWeek})`;
  };
  const DisplayTime = (time) => {
    const [hourStr, minuteStr] = time.split(":");

    const hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);

    const period = hour < 12 ? "오전" : "오후";
    const hour12 = hour % 12 || 12;
    const paddedMinute = String(minute).padStart(2, "0");

    return `${period} ${hour12}:${paddedMinute}`;
  };

  const TypeColor = {
    HALL: "#a1887f",
    STUDIO: "#4dd0e1",
    MAKEUP: "#ff80ab",
    DRESS: "#7e57c2",
  };

  const handleReserveDelete = async () => {
    try {
      await customAxios.delete(`reservation/${reservation.reservationId}`)
      const filteredReservations = MyReservations.filter(myReservation => {
        return myReservation.reservationId !== reservation.reservationId;
      });
      setMyReservations(filteredReservations)
    } catch (error) {
      // console.log("예약 삭제 요청 실패", error)
    }
  }

  return (
    <div className={classes.Reservation}>
      <div
        className={classes.TypeBar}
        style={{ backgroundColor: TypeColor[reservation.productType] }}
      ></div>

      <img
        className={classes.ReservationImg}
        src={reservation.thumbnail}
        onClick={onClick}
        alt='이미지 없음'
      />
      <div className={classes.Item} onClick={onClick}>
        <div className={classes.Company}>
          [{reservation.productType}] {reservation.company}
        </div>
        <div className={classes.At}>
          <p className={classes.Date}>
            {DisplayDate(reservation.reservedDate)}
          </p>
          <p className={classes.Time}>
            {DisplayTime(reservation.reservedTime)}
          </p>
        </div>
      </div>
      <div onClick={handleReserveDelete}>
        <BsTrash style={{position: "relative", top: "50%", transform: "translateY(-50%)"}} size={25}/>
      </div>
    </div>
  );
}
