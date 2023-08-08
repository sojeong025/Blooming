const KakaoShareButton = ({code}) => {
  const shareToKakao = () => {
    
    Kakao.Link.sendDefault({
      ObjectType: 'feed',
      content: {
        title: '블루밍',
        description: '약혼자 링크',
        imageUrl: 'https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/product/hall/85_thumbnail.jpg',
        link: {
          mobileWebUrl: 'http://43.200.254.50/login',
          webUrl: 'http://43.200.254.50/login',
        }
      }
    })

  };

  return (
    <button type="button" onClick={shareToKakao}>
      카카오톡으로 공유하기
    </button>
  );
};

export default KakaoShareButton;
