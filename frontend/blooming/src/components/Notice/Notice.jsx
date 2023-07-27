import { useState } from 'react';

const SwipeableList = () => {
  const [listItems, setListItems] = useState([
    { id: 1, text: 'Item 1', x: 0, showButtons: false },
    { id: 2, text: 'Item 2', x: 0, showButtons: false },
    { id: 3, text: 'Item 3', x: 0, showButtons: false },
    // Add more list items as needed
  ]);

  let startX = 0;

  const handleTouchStart = (index, e) => {
    // 터치 시작 시 초기 x 위치를 저장합니다.
    startX = e.touches[0].clientX;
    setListItems((prevItems) =>
      prevItems.map((item, i) => (i === index ? { ...item, x: 0 } : item))
    );
  };

  const handleTouchMove = (index, e) => {
    // 터치 이동 중인 항목의 x 위치를 업데이트합니다.
    const deltaX = e.touches[0].clientX - startX;
    setListItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, x: Math.min(deltaX, 100) } : item
      )
    );
  };

  const handleTouchEnd = (index) => {
    setListItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, x: 0, showButtons: item.x <= -100 } : item
      )
    );
  };

  const handleSwipeEnd = (index) => {
    console.log(index)
    // 스와이프 종료 시 해당 아이템을 삭제 처리합니다.
    const updatedListItems = listItems.filter((_, i) => i !== index);
    setListItems(updatedListItems);
  };

  return (
    <div>
      {listItems.map((item, index) => (
        <div key={item.id}>
          <div
            style={{
              transform: `translateX(${item.x}px)`,
              cursor: 'grab',
              userSelect: 'none', // 드래그 중 텍스트 선택 방지
              position: 'relative',
            }}
            onTouchStart={(e) => handleTouchStart(index, e)}
            onTouchMove={(e) => handleTouchMove(index, e)}
            onTouchEnd={() => handleTouchEnd(index)}
          >
            {item.text}
          </div>
          <div
              style={{
                display: item.showButtons ? 'flex' : 'none',
                alignItems: 'center',
                top: 0,
                right: 100,
                width: 200,
              }}
            >
              <button
                onClick={() => handleSwipeEnd(index)}
                style={{
                  width: 100,
                  height: '100%',
                  background: 'red',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Delete
              </button>
              <button
                onClick={() => handleTouchEnd(index)}
                style={{
                  width: 100,
                  height: '100%',
                  background: 'gray',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
            </div>
          </div>
      ))}
    </div>
  );
};

export default SwipeableList;
