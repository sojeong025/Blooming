import { useState } from "react";
import classes from "./Notice.module.css";

const SwipeableList = ({ notice }) => {
  // const { id, title, completed } = notice;
  const [listItems, setListItems] = useState([
    { id: 1, text: "Item 1", x: 0, showButtons: false },
    { id: 2, text: "Item 2", x: 0, showButtons: false },
    { id: 3, text: "Item 3", x: 0, showButtons: false },
    // Add more list items as needed
  ]);

  let startX = 0;

  const handleTouchStart = (index, e) => {
    // 터치 시작 시 초기 x 위치를 저장합니다.
    startX = e.touches[0].clientX;
    setListItems((prevItems) =>
      prevItems.map((item, i) => (i === index ? { ...item, x: 0 } : item)),
    );
    // console.log(startX);
  };

  const handleTouchMove = (index, e) => {
    // 터치 이동 중인 항목의 x 위치를 업데이트합니다.
    const deltaX = e.touches[0].clientX - startX;

    // console.log(deltaX, listItems);
    // 오른쪽으로 안가게 하고 싶은데
    setListItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, x: Math.max(deltaX, -100) } : item,
      ),
    );
  };

  const handleTouchEnd = (index) => {
    setListItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, x: 0, showButtons: item.x <= -100 } : item,
      ),
    );
  };

  const handleSwipeEnd = (index) => {
    console.log(index);
    // 스와이프 종료 시 해당 아이템을 삭제 처리합니다.
    const updatedListItems = listItems.filter((_, i) => i !== index);
    setListItems(updatedListItems);
  };

  return (
    <div className={classes.noticeContainer}>
      {listItems.map((item, index) => (
        <div key={item.id} className={classes.noticeWrapper}>
          <div
            className={classes.listItem}
            style={{
              transform: `translateX(${item.x}px)`,
              cursor: "grab",
              userSelect: "none", // 드래그 중 텍스트 선택 방지
            }}
            onTouchStart={(e) => handleTouchStart(index, e)}
            onTouchMove={(e) => handleTouchMove(index, e)}
            onTouchEnd={() => handleTouchEnd(index)}
          >
            {item.text}
          </div>
          <div
            className={classes.actionButtons}
            style={{
              display: item.showButtons ? "flex" : "none",
              // alignItems: "center",
              // top: 0,
              // right: 100,
              // width: 200,
            }}
          >
            <button
              className={classes.deleteButton}
              onClick={() => handleSwipeEnd(index)}
            >
              삭제
            </button>
            <button
              className={classes.cancelButton}
              onClick={() => handleTouchEnd(index)}
            >
              취소
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SwipeableList;
