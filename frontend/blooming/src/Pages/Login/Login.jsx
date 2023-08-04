import { styled } from "styled-components";
import PreviewAnt from "../../components/Login/PreviewAnt";
import Preview from "../../components/Login/Preview";
import { PageIndicator } from "antd-mobile";

export default function Login() {
  return (
    <>
      <Wrapper>
        {/* 프리뷰 */}
        {/* <PreviewAnt /> */}
        <Preview />
      </Wrapper>
    </>
  );
}

// 가로 가운데
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 세로 가운데 맞추고
// 이미지 좀 키우면서, 진짜로 넣을 때는 같은 사이즈로 맞추고
// 카카오 로그인이랑 이미지랑 사이 좀 멀게
