import DatePicker from 'react-datepicker'
import classes from './Common.module.css';
// import { useRecoilState } from "recoil";
// import {
//   weddingDateState,
// } from "../../../recoil/WeddingDdayAtom";


function WeddingDay() {
  // const [weddingDate, setWeddingDate] = useRecoilState(weddingDateState);

  // function dateChangeHandler(date) {
  //   setWeddingDate(date);
  // }

  return(
    <div className={classes.container}>
      예식일
      <hr />
      <div>
      <label htmlFor="date">예식일</label><br />
        {/* <DatePicker
          showPopperArrow={false}
          id="date"
          selected={weddingDate}
          onChange={dateChangeHandler}
          dateFormat="yyyy-MM-dd"
          required
        /> */}
        </div>
    </div>  
  )
}

export default WeddingDay;