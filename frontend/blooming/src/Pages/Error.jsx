import { styled } from "styled-components";
import NoContent from "../components/Common/NoContent";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const Error = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/");
    }, 3000);

    () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <Wrapper>
      <NoContent />
    </Wrapper>
  );
};

export default Error;

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 80vh;
  margin-top: 100px;
  margin-left: auto;
  align-items: center;
  justify-content: center;
`;
