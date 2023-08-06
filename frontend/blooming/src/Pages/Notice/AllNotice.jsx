import NoticeList from "../../components/Notice/NoticeSwipeable";
import { useState } from "react";
import { PullToRefresh } from "antd-mobile";

export default function AllNotice() {
  const [data, setData] = useState(0);

  const onReNotice = () => {
    // 알림 정보 새로 고침
    setData(data + 1);
  };
  return (
    <div style={{ padding: "60px 0" }}>
      <PullToRefresh
        pullingText='당겨서 새로고침'
        canReleaseText='당겨서 새로고침'
        completeText='로딩중...'
        refreshingText='로딩중...'
        onRefresh={onReNotice}
      >
        {data}
        <NoticeList />
      </PullToRefresh>
    </div>
  );
}
