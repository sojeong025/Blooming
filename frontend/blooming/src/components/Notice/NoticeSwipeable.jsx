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

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

import InfiniteScroll from "react-infinite-scroll-component";
import { RiDeleteBin5Fill } from "react-icons/ri";

const NoticeSwipeable = () => {
  const [fullSwipe] = useState(true);
  const [notice, setNotice] = useState([]);
  const [page, setPage] = useState(0);

  // infiniteScroll
  const [hasMore, setHasMore] = useState(true);

  const fetchNotice = async () => {
    const params = { page, size: 20 };
    if (hasMore) {
      try {
        const response = await customAxios.get("notification", { params });
        setNotice((prevNotice) => [...prevNotice, ...response.data.result[0]]);
        // console.log(response);
        setPage(page + 1);
      } catch (error) {
        console.log("알림 조회 에러", error);
        setHasMore(false);
      }
    }
  };

  useEffect(() => {
    fetchNotice();
  }, []);

  // 삭제
  const handleDelete = (id) => async () => {
    try {
      customAxios.delete(`notification/${id}`);
      // console.log("[DELETE]", id);
      setNotice(notice.filter((item) => item.id !== id));
    } catch (error) {
      console.log("알림 삭제 에러", error);
    }
  };
  const trailingActions = ({ id }) => (
    <TrailingActions>
      <SwipeAction destructive={true} onClick={handleDelete(id)}>
        <div className={classes.ActionContent}>
          <RiDeleteBin5Fill className={classes.logo} />
          <div className={classes.delete}>삭제</div>
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
        setNotice((prevState) =>
          prevState.map((item) =>
            item.id === id ? { ...item, readStatus: "READ" } : item,
          ),
        );
      }
    } catch (error) {
      console.log("읽음 처리 에러", error);
    }
  };

  // 시간 변환
  dayjs.extend(relativeTime);
  dayjs.locale("ko");
  const getRelativeTime = (createdAt) => {
    const now = dayjs();
    const created = dayjs(createdAt);
    return created.from(now);
  };

  return (
    <>
      <InfiniteScroll
        dataLength={notice.length}
        next={fetchNotice}
        hasMore={hasMore}
        loader={
          hasMore ? (
            <p
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></p>
          ) : (
            <></>
          )
        }
      >
        <SwipeableList fullSwipe={fullSwipe} type={ListType.IOS}>
          {notice.map(
            ({
              id,
              readStatus,
              notificationType,
              title,
              content,
              createdAt,
            }) => (
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
                  <div className={classes.ItemContent}>{content}</div>
                  <div className={classes.ItemTime}>
                    {getRelativeTime(createdAt)}
                  </div>
                </div>
              </SwipeableListItem>
            ),
          )}
        </SwipeableList>
      </InfiniteScroll>
    </>
  );
};

export default NoticeSwipeable;
