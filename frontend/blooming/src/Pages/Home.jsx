import WeddingDday from "../components/Home/WeddingDday";
import ScheduleDday from "../components/Home/ScheduleDday";
import MainImage from "../components/Home/MainImage";
import PlanTips from "../components/Home/PlanTips";

function Home() {
  return (
    <>
      <div>
        <WeddingDday />

        <ScheduleDday />

        <MainImage />

        <PlanTips />
        {/* 예약, 좋아요 */}
      </div>
    </>
  );
}

export default Home;
