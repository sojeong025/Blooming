import React from "react";
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

const NoticeSwipeable = () => {
  const [fullSwipe] = useState(true);
  const [threshold, setThreshold] = useState(0.5);

  const [notice, setNotice] = useState([]);

  // 맞는 JSON 주소로 바꾸기
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1/todos")
      .then((response) => response.json())
      .then((json) => setNotice(json));
  }, []);

  React.useEffect(() => {
    setThreshold(0.5);
  }, [setThreshold]);

  const handleDelete = (id) => () => {
    console.log("[DELETE]", id);
    setNotice(notice.filter((person) => person.id !== id));
  };

  // 삭제
  const trailingActions = ({ id }) => (
    <TrailingActions>
      <SwipeAction destructive={true} onClick={handleDelete(id)}>
        <div className={classes.ActionContent}>
          <div className={classes.Icon}>
            {/* 삭제 아이콘 */}
            <img src='' alt='삭제' />
          </div>
        </div>
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <>
      <SwipeableList
        fullSwipe={fullSwipe}
        threshold={threshold}
        type={ListType.IOS}
      >
        {notice.map(({ id, title, content, time }) => (
          <SwipeableListItem key={id} trailingActions={trailingActions({ id })}>
            <div className={classes.ItemBox}>
              <div className={classes.ItemTitle}>{title}</div>
              <p className={classes.ItemContent}>
                {content}content content content content content content content
                content content content content content contet content content
                content content content content content contet content content
                content content content content content contet content content
                content content content content content contet content content
                content content content content content conte
              </p>
              <div className={classes.ItemTime}>
                {time}몇시간전 이나 받은 날짜,시간
              </div>
            </div>
          </SwipeableListItem>
        ))}
      </SwipeableList>
    </>
  );
};

export default NoticeSwipeable;
