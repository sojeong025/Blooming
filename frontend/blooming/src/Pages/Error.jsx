import ErrorModal from "../components/Error/ErrorModal";
import useErrorModal from "../components/Error/useErrorModal";

import Modal from "../components/Error/Modal";
import { useState } from "react";

const Error = () => {
  // 에러 모달
  // const [ErrorModal, handleError] = useErrorModal();
  // const onClickButton = (event) => {
  //   handleError("데이터 요청 에러");
  // };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className='mainContainer'>
      <p>여긴 사공사</p>
      {/* 왜안돼 */}
      {/* <button onClick={onClickButton}>나와라모달</button>
      <ErrorModal /> */}

      {/* 모달 테스트 */}
      <button onClick={openModal}>나와라모달</button>
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <h2>Error</h2>
        <p>이런저런에러</p>
      </Modal>
    </div>
  );
};

export default Error;
