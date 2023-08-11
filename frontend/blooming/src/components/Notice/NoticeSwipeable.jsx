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
        console.log(notice);
        setPage(page + 1);
      } catch (error) {
        console.log("알림 조회 에러", error);
        setHasMore(false);
      }
    }
  };

  useEffect(() => {
    fetchNotice();
    // setNotice([
    //   {
    //     id: 688,
    //     readStatus: "UNREAD",
    //     notificationType: "SCHEDULE",
    //     title: "2023-08-09 [웨딩촬영] 스미다 예약",
    //     content:
    //       "내일은 예비신랑님이 웨딩웨딩촬용 하는 날이에요. 클릭해서 팁을 알아보세요!",
    //     createdAt: "2023-08-08T00:58:23.345615",
    //   },
    //   {
    //     id: 687,
    //     readStatus: "UNREAD",
    //     notificationType: "SCHEDULE",
    //     title: "2023-08-09 [웨딩촬영] 스미다 예약",
    //     content:
    //       "내일은 예비신랑님이 웨딩웨딩촬용 하는 날이에요. 클릭해서 팁을 알아보세요!",
    //     createdAt: "2023-08-08T00:58:13.048663",
    //   },
    //   {
    //     id: 686,
    //     readStatus: "UNREAD",
    //     notificationType: "SCHEDULE",
    //     title: "2023-08-09 [웨딩촬영] 스미다 예약",
    //     content:
    //       "내일은 예비신랑님이 웨딩웨딩촬용 하는 날이에요. 클릭해서 팁을 알아보세요!",
    //     createdAt: "2023-08-08T00:58:02.844112",
    //   },
    //   {
    //     id: 685,
    //     readStatus: "UNREAD",
    //     notificationType: "SCHEDULE",
    //     title: "2023-08-09 [웨딩촬영] 스미다 예약",
    //     content:
    //       "내일은 예비신랑님이 웨딩웨딩촬용 하는 날이에요. 클릭해서 팁을 알아보세요!",
    //     createdAt: "2023-08-08T00:57:52.620322",
    //   },
    //   {
    //     id: 684,
    //     readStatus: "UNREAD",
    //     notificationType: "SCHEDULE",
    //     title: "2023-08-09 [웨딩촬영] 스미다 예약",
    //     content:
    //       "내일은 예비신랑님이 웨딩웨딩촬용 하는 날이에요. 클릭해서 팁을 알아보세요!",
    //     createdAt: "2023-08-08T00:57:42.427203",
    //   },
    //   {
    //     id: 683,
    //     readStatus: "UNREAD",
    //     notificationType: "SCHEDULE",
    //     title: "2023-08-09 [웨딩촬영] 스미다 예약",
    //     content:
    //       "내일은 예비신랑님이 웨딩웨딩촬용 하는 날이에요. 클릭해서 팁을 알아보세요!",
    //     createdAt: "2023-08-08T00:57:32.215056",
    //   },
    //   {
    //     id: 682,
    //     readStatus: "UNREAD",
    //     notificationType: "SCHEDULE",
    //     title: "2023-08-09 [웨딩촬영] 스미다 예약",
    //     content:
    //       "내일은 예비신랑님이 웨딩웨딩촬용 하는 날이에요. 클릭해서 팁을 알아보세요!",
    //     createdAt: "2023-08-08T00:57:22.004595",
    //   },
    //   {
    //     id: 681,
    //     readStatus: "UNREAD",
    //     notificationType: "SCHEDULE",
    //     title: "2023-08-09 [웨딩촬영] 스미다 예약",
    //     content:
    //       "내일은 예비신랑님이 웨딩웨딩촬용 하는 날이에요. 클릭해서 팁을 알아보세요!",
    //     createdAt: "2023-08-08T00:57:11.825431",
    //   },
    //   {
    //     id: 680,
    //     readStatus: "UNREAD",
    //     notificationType: "SCHEDULE",
    //     title: "2023-08-09 [웨딩촬영] 스미다 예약",
    //     content:
    //       "내일은 예비신랑님이 웨딩웨딩촬용 하는 날이에요. 클릭해서 팁을 알아보세요!",
    //     createdAt: "2023-08-08T00:57:01.625419",
    //   },
    //   {
    //     id: 679,
    //     readStatus: "UNREAD",
    //     notificationType: "SCHEDULE",
    //     title: "2023-08-09 [웨딩촬영] 스미다 예약",
    //     content:
    //       "내일은 예비신랑님이 웨딩웨딩촬용 하는 날이에요. 클릭해서 팁을 알아보세요!",
    //     createdAt: "2023-08-08T00:56:51.41097",
    //   },
    //   {
    //     id: 678,
    //     readStatus: "UNREAD",
    //     notificationType: "SCHEDULE",
    //     title: "2023-08-08 [웨딩촬영] 스미다 예약",
    //     content:
    //       "내일은 두 분이 그림비스튜디오 에 방문해주세요 하는 날이에요. 클릭해서 팁을 알아보세요!",
    //     createdAt: "2023-08-08T00:56:41.182956",
    //   },
    //   {
    //     id: 677,
    //     readStatus: "UNREAD",
    //     notificationType: "SCHEDULE",
    //     title: "2023-08-08 [웨딩촬영] 스미다 예약",
    //     content:
    //       "내일은 두 분이 그림비스튜디오 에 방문해주세요 하는 날이에요. 클릭해서 팁을 알아보세요!",
    //     createdAt: "2023-08-08T00:56:30.955461",
    //   },
    //   {
    //     id: 676,
    //     readStatus: "UNREAD",
    //     notificationType: "SCHEDULE",
    //     title: "2023-08-08 [웨딩촬영] 스미다 예약",
    //     content:
    //       "내일은 두 분이 그림비스튜디오 에 방문해주세요 하는 날이에요. 클릭해서 팁을 알아보세요!",
    //     createdAt: "2023-08-08T00:56:20.732396",
    //   },
    //   {
    //     id: 675,
    //     readStatus: "UNREAD",
    //     notificationType: "SCHEDULE",
    //     title: "2023-08-08 [웨딩촬영] 스미다 예약",
    //     content:
    //       "내일은 두 분이 그림비스튜디오 에 방문해주세요 하는 날이에요. 클릭해서 팁을 알아보세요!",
    //     createdAt: "2023-08-08T00:56:10.504923",
    //   },
    //   {
    //     id: 674,
    //     readStatus: "UNREAD",
    //     notificationType: "SCHEDULE",
    //     title: "2023-08-08 [웨딩촬영] 스미다 예약",
    //     content:
    //       "내일은 두 분이 그림비스튜디오 에 방문해주세요 하는 날이에요. 클릭해서 팁을 알아보세요!",
    //     createdAt: "2023-08-08T00:56:00.293909",
    //   },
    //   {
    //     id: 673,
    //     readStatus: "UNREAD",
    //     notificationType: "SCHEDULE",
    //     title: "2023-08-08 [웨딩촬영] 스미다 예약",
    //     content:
    //       "내일은 두 분이 그림비스튜디오 에 방문해주세요 하는 날이에요. 클릭해서 팁을 알아보세요!",
    //     createdAt: "2023-08-08T00:55:50.072007",
    //   },
    //   {
    //     id: 672,
    //     readStatus: "UNREAD",
    //     notificationType: "SCHEDULE",
    //     title: "2023-08-08 [웨딩촬영] 스미다 예약",
    //     content:
    //       "내일은 두 분이 그림비스튜디오 에 방문해주세요 하는 날이에요. 클릭해서 팁을 알아보세요!",
    //     createdAt: "2023-08-08T00:55:39.842356",
    //   },
    //   {
    //     id: 671,
    //     readStatus: "UNREAD",
    //     notificationType: "SCHEDULE",
    //     title: "2023-08-08 [웨딩촬영] 스미다 예약",
    //     content:
    //       "내일은 두 분이 그림비스튜디오 에 방문해주세요 하는 날이에요. 클릭해서 팁을 알아보세요!",
    //     createdAt: "2023-08-08T00:55:29.632891",
    //   },
    //   {
    //     id: 669,
    //     readStatus: "UNREAD",
    //     notificationType: "SCHEDULE",
    //     title: "2023-08-08 [웨딩촬영] 스미다 예약",
    //     content:
    //       "내일은 두 분이 그림비스튜디오 에 방문해주세요 하는 날이에요. 클릭해서 팁을 알아보세요!",
    //     createdAt: "2023-08-08T00:55:19.426384",
    //   },
    //   {
    //     id: 668,
    //     readStatus: "UNREAD",
    //     notificationType: "SCHEDULE",
    //     title: "2023-08-08 [웨딩촬영] 스미다 예약",
    //     content:
    //       "내일은 두 분이 그림비스튜디오 에 방문해주세요 하는 날이에요. 클릭해서 팁을 알아보세요!",
    //     createdAt: "2023-08-08T00:55:09.23017",
    //   },
    // ]);
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
      console.log("알림 조회 에러", error);
      setHasMore(false);
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
        console.log("읽음");
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
      <div className={classes.reload} onClick={onReNotice}>
        눌러서 새로고침 테스트중
      </div>
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
