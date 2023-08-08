import NoticeList from "../../components/Notice/NoticeSwipeable";
import { customAxios } from "../../lib/axios";
import PullToRefresh from "react-pull-to-refresh";

export default function AllNotice() {
  // const onReNotice = async () => {
  //   const params = { page: 0, size: 20 };
  //   try {
  //     const response = await customAxios.get("notification", { params });
  //     console.log(response);
  //   } catch (error) {
  //     console.log("알림 조회 에러", error);
  //   }
  // };

  return (
    <div className='mainContainer'>
      {/* <PullToRefresh onRefresh={onReNotice}> */}
      <NoticeList />
      {/* </PullToRefresh> */}
    </div>
  );
}
