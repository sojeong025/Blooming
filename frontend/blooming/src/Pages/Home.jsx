import WeddingDday from "../components/Home/WeddingDday";
import WeddingDateInput from "../components/Home/WeddingDateInput";
import ScheduleDday from "../components/Home/ScheduleDday";
import MainImage from "../components/Home/MainImage";
import Tips from "../components/Home/Tips";

function Home() {
  return (
    <>
      <div>
        <h1>메인페이지다</h1>
        <WeddingDateInput />
        <WeddingDday />

        <ScheduleDday />

        <MainImage />

        <Tips />
        {/* 예약, 좋아요 */}
      </div>
    </>
  );
}

export default Home;
