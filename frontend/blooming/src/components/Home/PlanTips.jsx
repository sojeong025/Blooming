import { useRecoilValue } from "recoil";
import {
  weddingDateState,
  weddingDdayState,
} from "../../recoil/WeddingDdayAtom";
import { weddingPlanState } from "../../recoil/PlanTipsAtom";
import classes from "./PlanTips.module.css";
import { useEffect, useState } from "react";
// import ReactHtmlParser from "react-html-parser";

const Tips = () => {
  const weddingDate = useRecoilValue(weddingDateState);
  const weddingDday = useRecoilValue(weddingDdayState);

  const weddingPlan = useRecoilValue(weddingPlanState);

  // myTotalDay는 나중에 받아서 맞추기 일단 210 플랜으로만 간다!
  // 내가 설정한 TotalDday와 plan의 totalDay가 같은 것을 보여줌
  const myTotalDday = 210;
  const sameTotalDayPlan = weddingPlan.filter(
    (plan) => plan.totalDay === myTotalDday,
  );

  const nextPlan = sameTotalDayPlan[0]?.plan.find(
    (planItem) => planItem.leftDay <= weddingDday,
  );

  // const randomComment =
  //   nextPlan.context[Math.floor(Math.random() * nextPlan?.context.length)];

  const [randomComment, setRandomComment] = useState("");

  const updateRandomComment = () => {
    let newRandomComment;

    do {
      newRandomComment =
        nextPlan.context[Math.floor(Math.random() * nextPlan?.context.length)];
    } while (newRandomComment === randomComment);

    setRandomComment(newRandomComment);
  };

  useEffect(() => {
    if (nextPlan) {
      updateRandomComment();
    }
  }, [weddingDate, weddingDday, nextPlan]);

  return (
    <div>
      {weddingDate !== "" ? (
        weddingDday >= 0 ? (
          <>
            <img
              src={nextPlan.img}
              alt={nextPlan.title}
              className={classes.mainImg}
            />
            <div className={classes.tipContainer} onClick={updateRandomComment}>
              <p className={classes.textBold}>{nextPlan.title}일정을 앞둔
                지금!
              </p>
              {/* <p>{ReactHtmlParser(randomComment)}</p> */}
              <p>{randomComment}</p>
            </div>
          </>
        ) : (
          <>
            <img
              src='src/assets/Character/dday.png'
              className={classes.mainImg}
            />
            <div className={classes.tipContainer}>
              <p>결혼 축하해</p>
            </div>
          </>
        )
      ) : (
        <>
          <img
            src='src/assets/Character/date.png'
            className={classes.mainImg}
          />
          <div className={classes.tipContainer}>
            <p>결혼 일정을 등록하고 추천 팁을 받아보세용</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Tips;
