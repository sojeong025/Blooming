import { useCallback, useEffect, useState } from "react";

import { keyframes, styled } from "styled-components";

const ReviewForm = ({ show = false, onClose, children }) => {
  // 모달 보여졌을 때 스크롤 방지
  useEffect(() => {
    const body = document.querySelector("body");
    if (show) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
  }, [show]);

  // 모달 애니메이션 상태 관리
  const [isClosing, setIsClosing] = useState(false);
  // 모달이 닫힐 때 애니메이션 처리
  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300); // 애니메이션 지속 시간과 동일하게 설정
  }, [onClose]);

  return (
    show && (
      <>
        <ModalOverlay onClick={handleClose}>
          <ModalContent onClick={(e) => e.stopPropagation()} $show={!isClosing}>
            <Wrapper>{children}</Wrapper>
          </ModalContent>
        </ModalOverlay>
      </>
    )
  );
};

export default ReviewForm;

const Wrapper = styled.div`
  width: 100%;
  margin-top: 10px;
  padding: 20px;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUpIn = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0%);
  }
`;

const slideUpOut = keyframes`
  from {
    transform: translateY(0%);
  }
  to {
    transform: translateY(100%);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 900;
  animation: ${fadeIn} 0.3s ease-out;
`;

const ModalContent = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  transform: translateY(100%);
  width: 100%;
  height: 80vh;
  background-color: #fff;

  border-top-right-radius: 30px;
  border-top-left-radius: 30px;

  z-index: 900;
  animation: ${({ $show }) => ($show ? slideUpIn : slideUpOut)} 0.3s ease-out
    forwards;
`;
