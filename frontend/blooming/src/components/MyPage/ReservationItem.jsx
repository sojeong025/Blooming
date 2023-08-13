export default function ReservationItem({reservation}) {

  return (
    <div>
      <img src={reservation.thumbnail} alt="이미지 없음" />
      <div>{reservation.company}</div>
      <div>{reservation.reservedDate} : {reservation.reservedTime}</div>
    </div>
  )
}