import {
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  Type as ListType,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

import classes from "./NoticeSwipeable.module.css";

import { useState } from "react";
import { useEffect } from "react";
import { customAxios } from "../../lib/axios";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

import TopBtn from "../Common/TopBtn";
import InfiniteScroll from "react-infinite-scroll-component";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IoMdRefresh } from "react-icons/io";
import { styled } from "styled-components";

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
        // console.log(notice);
        setPage(page + 1);
      } catch (error) {
        // console.log("알림 조회 에러", error);
        setHasMore(false);
      }
    }
  };

  useEffect(() => {
    fetchNotice();
  }, []);

  // 새로고침
  const onReNotice = async () => {
    await setPage(0);
    await setNotice([]);
    await setHasMore(true);
    try {
      const response = await customAxios.get("notification", {
        params: {
          page: 0,
          size: 20,
        },
      });
      setNotice(response.data.result[0]);
      console.log(notice);
      setPage(page + 1);
    } catch (error) {
      // console.log("알림 조회 에러", error);
      setHasMore(false);
    }
  };

  const deleteAllNotice = async () => {
    try {
      await customAxios.delete("notifiation");
      onReNotice();
    } catch (error) {
      console.log("알림 전체 삭제:", error);
    }
  };

  // 삭제
  const handleDelete = (id) => async () => {
    try {
      customAxios.delete(`notification/${id}`);
      setNotice(notice.filter((item) => item.id !== id));
      console.log("[DELETE]", id);
    } catch (error) {
      console.log("알림 삭제 에러", error);
    }
  };
  const trailingActions = ({ id }) => (
    <TrailingActions>
      <SwipeAction destructive={true} onClick={handleDelete(id)}>
        <div className={classes.ActionContent}>
          <RiDeleteBin5Fill className={classes.deleteIcon} />
          <div className={classes.deleteText}>삭제</div>
        </div>
      </SwipeAction>
    </TrailingActions>
  );

  // 읽음
  const readNotice = async ({ id, readStatus }) => {
    try {
      // 안읽은 알림만 읽음 처리
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
  dayjs.extend(timezone);
  dayjs.extend(utc);
  dayjs.extend(relativeTime);
  dayjs.locale("ko");

  const getRelativeTime = (createdAt) => {
    const now = dayjs().tz("Asia/Seoul");
    const created = dayjs.utc(createdAt).tz("Asia/Seoul");
    return created.from(now);
  };

  return (
    <>
      <TopBtn onClick={onReNotice}>
        <IoMdRefresh size={25} />
      </TopBtn>
      <AllDelete onClick={deleteAllNotice}>알림 전체 삭제</AllDelete>

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

const AllDelete = styled.div`
  height: 20px;
  width: 100px;

  position: absolute;
  margin-top: 5px;
  right: 2px;
  color: black;
  font-size: 14px;
  font-weight: 600;
`;
