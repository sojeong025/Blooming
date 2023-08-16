import { useRecoilState, useRecoilValue } from "recoil";
import {
  weddingDateState,
  weddingDdayState,
} from "../../recoil/WeddingDdayAtom";
import classes from "./PlanTips.module.css";
import { useEffect, useState } from "react";
import { customAxios } from "../../lib/axios";
// import ReactHtmlParser from "react-html-parser";

const Tips = () => {
  const weddingDate = useRecoilValue(weddingDateState);
  // const weddingDate = "2023-09-20"
  const weddingDday = useRecoilValue(weddingDdayState);
  const [nextPlan, setNextPlan] = useState();
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    try {
      const response = await customAxios.get(`/tipbox/${weddingDday}`)
      setNextPlan(response.data.result[0])
    } catch (error) {
      console.log("Tipbox fetch error")
      console.log(error)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (weddingDday) {
      fetchData();
    } else {
      setIsLoading(false)
    }
  }, [weddingDday])

  // const randomComment =
  //   nextPlan.content[Math.floor(Math.random() * nextPlan?.content.length)];

  const [randomComment, setRandomComment] = useState("");

  const updateRandomComment = () => {
    let newRandomComment;

    do {
      newRandomComment =
        nextPlan.content[Math.floor(Math.random() * nextPlan?.content.length)];
    } while (newRandomComment === randomComment);

    setRandomComment(newRandomComment);
  };

  useEffect(() => {
    if (nextPlan) {
      updateRandomComment();
    }
  }, [weddingDate, weddingDday, nextPlan]);

  if (isLoading) {
    return <div>...loading</div>
  }

  return (
    <div className={classes.container}>
      <img
        src={nextPlan ? nextPlan.image : 'src/assets/Character/date.png'}
        alt={nextPlan ? nextPlan.title : "결혼 일정을 등록하고 추천 팁을 받아보세요"}
        className={classes.mainImg}
      />
      <div className={classes.tipContainer} onClick={updateRandomComment}>
        <div className={classes.textBold}>
          {nextPlan ? nextPlan.title : "결혼 일정을 등록하고 추천 팁을 받아보세요"}
        </div>
        <div className={classes.tip}>
          {nextPlan && randomComment}
        </div>
      </div>
    </div>
  );
};

export default Tips;
