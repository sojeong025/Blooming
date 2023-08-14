import { useCallback, useEffect, useState } from "react";

import { keyframes, styled } from "styled-components";

const DeleteForm = ({ userData, deleteProfile, show = false, onClose }) => {
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

  const handleDelete = () => {
    deleteProfile();
    onClose();
  };

  return (
    show && (
      <>
        <ModalOverlay onClick={handleClose}>
          <ModalContent onClick={(e) => e.stopPropagation()} $show={!isClosing}>
            <Wrapper>
              <TitleText>회원 탈퇴 전 꼭 확인해주세요!</TitleText>
              <SubText>
                블루밍을 떠나면 {userData.name}님의 데이터가 모두 사라져요.
              </SubText>
              <SubText>
                추후 같은 회원 정보로 재가입 하시더라도 데이터는 복구할 수
                없어요.
              </SubText>
            </Wrapper>
            <DeleteBtn onClick={handleDelete}>회원 탈퇴</DeleteBtn>
          </ModalContent>
        </ModalOverlay>
      </>
    )
  );
};

export default DeleteForm;

const Wrapper = styled.div`
  width: 100%;
  margin-top: 10px;
  padding: 20px;
`;

const TitleText = styled.div`
  font-size: 20px;
  font-weight: 600;
  padding: 10px 0;
  margin-left: 5px;
`;
const SubText = styled.div`
  font-size: 16px;
  word-break: keep-all;
  width: 80vw;
  margin-left: 5px;
  padding: 5px 0;
`;
const DeleteBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: red;
  border: 1.5px solid red;
  border-radius: 20px;
  margin-top: 50px;
  margin-left: 5vw;

  width: 90vw;
  height: 40px;
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
  height: 35vh;
  background-color: #fff;

  border-top-right-radius: 10%;
  border-top-left-radius: 10%;

  z-index: 900;
  animation: ${({ $show }) => ($show ? slideUpIn : slideUpOut)} 0.3s ease-out
    forwards;
`;
