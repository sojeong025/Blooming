import { useEffect } from "react";

const KakaoShareButton = ({ code }) => {
  
  const url = "http://43.200.254.50/login"

  useEffect(() => {
  const createKakaoButton = () => {
      if (window.Kakao) {
        // 카카오 스크립트가 로드된 경우 init
        const kakao = window.Kakao;
        if (!kakao.isInitialized()) {
          kakao.init('94f660d5b29760bb7ff5e51729ad26be');
        }
        kakao.Link.createDefaultButton({
          container: "#kakao-link-btn",
          objectType: "feed",
          content: {
            title: '블루밍, 당신만을 위한 모바일 웨딩 플래너',
            description: '약혼자와 연결하기',
            imageUrl: "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/product/hall/85_thumbnail.jpg",
            link: {
              mobileWebUrl: url,
              webUrl: url,
            },
          },
          buttons: [
            {
              title: "웹으로 이동",
              link: {
                mobileWebUrl: url,
                webUrl: url,
              },
            },
          ],
        });
      }
    };
    createKakaoButton();
  }, [code]);
  

  return (
    <button id="kakao-link-btn" type="button">
      카카오톡으로 공유하기
    </button>
  );
};

export default KakaoShareButton;
