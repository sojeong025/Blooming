import CopyToClipboardButton from "../../components/Login/CopyToClipboardButton";
import KakaoShareButton from "../../components/Login/KakaoShareButton";

export default function Share() {
  
  const verifyCode = '복사될코드다...'

  return (
    <>
      <h3>[사용자 이름]님의 약혼자를 연결해주세요</h3>
      <div>이미지</div>
      <CopyToClipboardButton text={verifyCode} />
      <KakaoShareButton />
      <button>
        메인으로 이동하기
      </button>
    </>
  )
}