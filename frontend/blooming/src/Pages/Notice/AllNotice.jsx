import NoticeList from "../../components/Notice/NoticeSwipeable";
import { customAxios } from "../../lib/axios";
import { PullToRefresh } from "antd-mobile";

export default function AllNotice() {
  const onReNotice = async () => {
    const params = { page: 0, size: 20 };
    try {
      const response = await customAxios.get("notification", { params });
      console.log(response);
    } catch (error) {
      console.log("알림 조회 에러", error);
    }
  };

  return (
    <div className='mainContainer'>
      <PullToRefresh
        pullingText='당겨서 새로고침'
        canReleaseText='당겨서 새로고침'
        completeText='로딩중...'
        refreshingText='로딩중...'
        onRefresh={onReNotice}
      >
        <NoticeList />
      </PullToRefresh>
    </div>
  );
}
