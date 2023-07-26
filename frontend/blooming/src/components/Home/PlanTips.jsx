import { useRecoilValue } from "recoil";
import {
  weddingDateState,
  weddingDdayState,
} from "../../recoil/WeddingDdayAtom";
import { weddingPlanState } from "../../recoil/PlanTipsAtom";

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

  return (
    <>
      {weddingDate !== "" && (
        <div>
          {/* <span>{nextPlan.leftDay}일 전에 하면 좋을</span> */}
          <span>{nextPlan.title} 하셨나요?</span>
        </div>
      )}
    </>
  );
};

export default Tips;
