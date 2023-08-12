// 모달
import { useEffect } from "react";
import { styled } from "styled-components";

function Modal({ show, children, onClose }) {
  // 모달 보여졌을 때 스크롤 방지
  useEffect(() => {
    const body = document.querySelector("body");
    if (show) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
  }, [show]);

  return (
    show && (
      <>
        <ModalOverlay onClick={onClose}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            {children}
            {/* <button onClick={onClose}>닫기</button> */}
          </ModalContent>
        </ModalOverlay>
      </>
    )
  );
}
export default Modal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 900;
  /* transform: translateY(100%); */
`;

const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  /* 전체크기 */
  /* min-width: 100vw;
  min-height: 100vh; */
  /* min-height: calc(100vh - 60px); */
  padding: 20px;
  z-index: 900;
`;
