import { useCallback, useEffect } from "react";
import { styled } from "styled-components";

const GotoTop = () => {
  const showTopButton = useCallback(() => {
    const topButton = document.getElementById("topButton");

    if (topButton) {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        topButton.style.display = "block";
      } else {
        topButton.style.display = "none";
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", showTopButton);
    return () => {
      window.removeEventListener("scroll", showTopButton);
    };
  }, [showTopButton]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <TopButton id='topButton' onClick={scrollToTop}>
        Top
      </TopButton>
    </>
  );
};

export default GotoTop;

const TopButton = styled.button`
  display: none;
  position: fixed;
  bottom: 70px;
  right: 20px;
  background-color: var(--color-point);
  border: none;

  width: 50px;
  height: 50px;
  border-radius: 50%;

  color: white;
  font-weight: 600;
  font-size: 14px;
  padding: 12px;
  transition: background-color 0.3s;
`;
