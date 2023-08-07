export default function InfoDetail({product}) {
  


  return (
    <div>
      <p>{product.id}</p>
      <p>{product.itemName}</p>
      <p>{product.brief}</p>
      <p>{product.company}</p>
      <p>{product.companyTime}</p>
      <p>{product.companyAddress}</p>
      <p>{product.thumbnail}</p>
      <p>{product.deatilImage1}</p>
      <p>{product.deatilImage2}</p>
      <p>{product.deatilImage3}</p>
      <button>예약하기</button>
      <button>찜하기</button>
    </div>
  );
}