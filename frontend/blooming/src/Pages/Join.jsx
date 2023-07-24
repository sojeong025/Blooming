function Join() {
  return (
    <>
      <h2>추가 정보 입력</h2>
      <form>
        <div>
          <label htmlFor="email">아이디:</label>
          <input
            type="text"
            id="email"
            value={'1'}
            disabled
          />
        </div>
        <div>
          <label htmlFor="nickname">닉네임:</label>
          <input
            type="text"
            id="nickname"
            value={'1'}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">전화번호:</label>
          <input
            type="text"
            id="phone"
            value={'2'}
            required
          />
        </div>
        <div>
          <label>
            신랑
            <input
              name="gender"
              type="radio"
              value="male"
            />
          </label>
          <label>
            신부
            <input
              name="gender"
              type="radio"
              value="female"
            />
          </label>
        </div>
        <button type="submit">제출</button>
      </form>
    </>
  )
}

export default Join