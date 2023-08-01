import ErrorModal from "../components/Error/ErrorModal";
import useErrorModal from "../components/Error/useErrorModal";
import InputField from "../components/MyPage/InputField";

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

  // 모듈테스트
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    displayName: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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

      <div style={{ border: "1px solid black" }}>
        <h2>모듈테스트다</h2>
        <form>
          <InputField
            label='이메일'
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
          />
        </form>
      </div>
    </div>
  );
};

export default Error;
