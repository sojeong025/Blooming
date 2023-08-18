import QRCode from "qrcode"

export default function QrCode() {

  const fileUrl = import.meta.env.VITE_QR_CODE

  QRCode.toDataURL(fileUrl, { errorCorrectionLevel: "H" })
    .then((qrCodeDataUrl) => {
        const imgElement = document.getElementById("qrCodeImage");
        imgElement.src = qrCodeDataUrl;
    })
    .catch((error) => {
        // console.error("QR 코드 생성 실패: ", error);
    });
  return (
    <div style={{
      display: "flex", alignContent: "center", justifyContent: "center"}}>
      <img style={{marginTop: "300px"}} id="qrCodeImage" alt="QR 코드" />
    </div>
  )
}