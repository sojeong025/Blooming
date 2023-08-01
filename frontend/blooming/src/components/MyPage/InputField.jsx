// InputField.js
import styles from "./InputField.module.css";

const InputField = ({ label, type, name, value, onChange, placeholder }) => {
  return (
    <div className={styles.inputField}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;

// recoil
// import React from 'react';
// import { useRecoilState } from 'recoil';
// import { formState } from '../state/formState';

// const InputField = ({ label, type, name, placeholder }) => {
//   const [formValues, setFormValues] = useRecoilState(formState);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues({ ...formValues, [name]: value });
//   };

//   return (
//     <div className="input-field">
//       {label && <label htmlFor={name}>{label}</label>}
//       <input
//         type={type}
//         name={name}
//         id={name}
//         value={formValues[name]}
//         onChange={handleChange}
//         placeholder={placeholder}
//       />
//     </div>
//   );
// };

// export default InputField;

// 모듈 쓸 곳
// src/components/UserProfile.js
// import React from 'react';
// import { useRecoilValue } from 'recoil';
// import { formState } from '../state/formState';
// import InputField from './InputField';

// const UserProfile = () => {
//   const formValues = useRecoilValue(formState);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formValues);
//   };

//   return (
//     <div className="user-profile">
//       <h2>회원정보 수정</h2>
//       <form onSubmit={handleSubmit}>
//         <InputField
//           label="이메일"
//           type="email"
//           name="email"
//           placeholder="이메일을 입력해주세요"
//         />

//         <InputField
//           label="비밀번호"
//           type="password"
//           name="password"
//           placeholder="새 비밀번호를 입력해주세요"
//         />

//         <InputField
//           label="닉네임"
//           type="text"
//           name="displayName"
//           placeholder="닉네임을 입력해주세요"
//         />

//         <button type="submit">정보 수정</button>
//       </form>
//     </div>
//   );
// };

// export default UserProfile;
