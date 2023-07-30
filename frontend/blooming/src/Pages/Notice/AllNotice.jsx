import { useEffect, useState } from "react";
import NoticeList from "../../components/Notice/NoticeSwipeable";

export default function AllNotice() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1/todos")
      .then((response) => response.json())
      .then((json) => setNotices(json));
  }, []);
  // console.log(notices);

  return (
    <div style={{ padding: "60px 0" }}>
      <NoticeList />
    </div>
  );
}
