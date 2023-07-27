const KakaoShareButton = () => {
  const shareToKakao = () => {
    // SDK를 사용해 카카오 공유하기 서비스를 호출
    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "샘플 제목",
        description: "샘플 설명",
        imageUrl:
          "https://cdn.pixabay.com/photo/2021/08/19/03/51/mountains-6560839_1280.jpg",
        link: {
          mobileWebUrl: "https://example.com",
          webUrl: "https://example.com",
        },
      },
      buttons: [
        {
          title: "웹으로 이동",
          link: {
            mobileWebUrl: "https://example.com",
            webUrl: "https://example.com",
          },
        },
        {
          title: "앱으로 이동",
          link: {
            mobileWebUrl: "https://example.com",
            webUrl: "https://example.com",
          },
        },
      ],
    });
  };

  return (
    <button type="button" onClick={shareToKakao}>
      카카오톡으로 공유하기
    </button>
  );
};

export default KakaoShareButton;
