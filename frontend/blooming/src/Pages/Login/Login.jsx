import { styled } from "styled-components";
import Preview from "../../components/Login/Preview";

export default function Login() {
  return (
    <Wrapper>
      <Preview />
    </Wrapper>
  );
}

// 가로 가운데
const Wrapper = styled.div`
  width: 100vw;
  height: 80vh;
  margin-top: 5vh;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 세로 가운데 맞추고
// 이미지 좀 키우면서, 진짜로 넣을 때는 같은 사이즈로 맞추고
// 카카오 로그인이랑 이미지랑 사이 좀 멀게
