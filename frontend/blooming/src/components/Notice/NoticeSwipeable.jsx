import {
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  Type as ListType,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

// css
import classes from "./NoticeSwipeable.module.css";

import { useState } from "react";
import { useEffect } from "react";
import { customAxios } from "../../lib/axios";

const NoticeSwipeable = () => {
  const [fullSwipe] = useState(true);

  const [notice, setNotice] = useState([]);

  const [page, setPage] = useState(0);
  const fetchNotice = async () => {
    const params = { page, size: 20 };
    try {
      const response = customAxios.get("notification", { params });
      // console.log(response);
      setNotice(response.data.result[0]);
      setPage(page + 1);
    } catch (error) {
      console.log("알림 조회 에러", error);
    }
  };
  useEffect(() => {
    fetchNotice();
    // setNotice([
    //   {
    //     id: 523,
    //     readStatus: "UNREAD",
    //     notificationType: "SCHEDULE",
    //     title: "2023-08-08 알림제목이다",
    //     content:
    //       "내일은 두 분이 알림내용이다 하는 날이에요. 클릭해서 팁을 알아보세요!",
    //   },
    //   {
    //     id: 522,
    //     readStatus: "UNREAD",
    //     notificationType: "SCHEDULE",
    //     title: "2023-08-08 알림제목이다",
    //     content:
    //       "내일은 두 분이 알림내용이다 하는 날이에요. 클릭해서 팁을 알아보세요!",
    //   },
    //   {
    //     id: 521,
    //     readStatus: "UNREAD",
    //     notificationType: "SCHEDULE",
    //     title: "2023-08-08 알림제목이다",
    //     content:
    //       "내일은 두 분이 알림내용이다 하는 날이에요. 클릭해서 팁을 알아보세요!",
    //   },
    // ]);
  }, []);

  const deleteNotice = async (id) => {
    try {
      customAxios.delete(`notification/${id}`);
      setPage(page + 1);
    } catch (error) {
      console.log("알림 삭제 에러", error);
    }
  };
  const handleDelete = (id) => () => {
    console.log("[DELETE]", id);
    deleteNotice(id);
    setNotice(notice.filter((item) => item.id !== id));
  };

  // 삭제
  const trailingActions = ({ id }) => (
    <TrailingActions>
      <SwipeAction destructive={true} onClick={handleDelete(id)}>
        <div className={classes.ActionContent}>
          <div className={classes.Icon}>
            {/* 쓰레기통 아이콘 */}
            <img src='' alt='삭제' />
          </div>
        </div>
      </SwipeAction>
    </TrailingActions>
  );

  // 읽음
  const readNotice = async ({ id, readStatus }) => {
    try {
      // 안읽은 알림만 읽음 처리 가능
      if (readStatus === "UNREAD") {
        await customAxios.put(`notification/${id}`);
        setNotice;
        console.log(id, "읽음");
      } else {
        console.log(id, "이미 읽음");
      }
    } catch (error) {
      console.log("읽음 처리 에러", error);
    }
  };

  return (
    <>
      <SwipeableList fullSwipe={fullSwipe} type={ListType.IOS}>
        {notice.map(({ id, readStatus, notificationType, title, content }) => (
          <SwipeableListItem
            onClick={() => readNotice({ id, readStatus })}
            key={id}
            trailingActions={trailingActions({ id })}
          >
            <div
              className={`${classes.ItemBox} ${
                readStatus === "UNREAD" ? classes.unread : classes.read
              }`}
            >
              <div className={classes.ItemTitle}>{title}</div>
              <p className={classes.ItemContent}>{content}</p>
              <div className={classes.ItemTime}>
                몇시간전 이나 받은 날짜,시간
              </div>
            </div>
          </SwipeableListItem>
        ))}
      </SwipeableList>
    </>
  );
};

export default NoticeSwipeable;
