import ErrorModal from "../components/Error/ErrorModal";
import useErrorModal from "../components/Error/useErrorModal";
import InputField from "../components/MyPage/InputField";
import IconList from "../components/Icons/IconList";

import Modal from "../components/Error/Modal";
import { useCallback, useState } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import { errorState } from "../recoil/ErrorAtom";

import CustomButton from "../components/Common/AntButton";
const Error = () => {
  // 에러 모달
  // const [ErrorModal, handleError] = useErrorModal();
  // const onClickButton = (event) => {
  //   handleError("데이터 요청 에러");
  // };

  // 모달 테스트
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  // const onClose = () => setIsModalOpen(false);

  // 에러 모달 테스트
  const [errorModal, setErrorModal] = useRecoilState(errorState);
  const triggerError = useCallback(async () => {
    try {
      await axios.get("https://non-existing-url.com/api/data");
    } catch (error) {
      console.log(error);
      setErrorModal(true);
    }
  }, [setErrorModal]);

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
      <Modal
        buttonText={"닫기"}
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <h2>나는모달</h2>
        <p>나는모달내용</p>
      </Modal>
      <button onClick={triggerError}>나와라에러</button>
      <Modal
        buttonText={"뒤로가기"}
        show={errorModal}
        onClose={() => setErrorModal(false)}
      >
        <h2>Error</h2>
        <p>에러등장</p>
        <button>g</button>
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
      <div style={{ border: "1px solid black" }}>
        <h2>아이콘리스트다</h2>
        <IconList />
      </div>
    </div>
  );
};

export default Error;
