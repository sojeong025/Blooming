import WeddingDday from "../components/Home/WeddingDday";
import WeddingDateInput from "../components/Home/WeddingDateInput";
import ScheduleDday from "../components/Home/ScheduleDday";
import MainImage from "../components/Home/MainImage";

function Home() {
  return (
    <>
      <div>
        <h1>메인페이지다</h1>
        <WeddingDateInput />
        <WeddingDday />

        {/* <ScheduleDday /> */}

        <MainImage />
        {/* 팁 예약 */}
      </div>
    </>
  );
}

export default Home;
