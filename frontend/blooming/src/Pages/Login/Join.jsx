import { useNavigate } from 'react-router-dom';

export default function Join() {

  const navigate = useNavigate();

  const joinSubmit = (event) => {
    event.preventDefault();
    navigate('/Question');
  }

  return (
    <>
      <h2>추가 정보 입력</h2>
      <form onSubmit={joinSubmit}>
        <div>
          <label htmlFor="email">아이디:</label>
          <input
            type="text"
            id="email"
            disabled
          />
        </div>
        <div>
          <label htmlFor="nickname">닉네임:</label>
          <input
            type="text"
            id="nickname"
            required
          />
        </div>
        <div>
          <label htmlFor="phone">전화번호:</label>
          <input
            type="text"
            id="phone"
            required
          />
        </div>
        <div>
          <label>
            신랑
            <input
              name="gender"
              type="radio"
            />
          </label>
          <label>
            신부
            <input
              name="gender"
              type="radio"
            />
          </label>
        </div>
        <div>
            <label htmlFor="recommend">추천인 코드:</label>
            <input
              type="text"
              id="recommend"
              required
            />
            <button type="submit">인증</button>
        </div>
        <button type="submit">제출</button>
      </form>
    </>
  )
}