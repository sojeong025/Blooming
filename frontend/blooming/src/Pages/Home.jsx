import WeddingDday from "../components/Home/WeddingDday";
import WeddingDateInput from "../components/Home/WeddingDateInput";
import ScheduleDday from "../components/Home/ScheduleDday";

function Home() {
  return (
    <>
      <div>
        <h1>메인페이지다</h1>
        <WeddingDateInput />
        <WeddingDday />

        {/* <ScheduleDday /> */}
        {/* 그림 팁 예약 */}
      </div>
    </>
  );
}

export default Home;
