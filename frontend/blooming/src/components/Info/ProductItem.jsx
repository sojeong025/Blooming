export default function ProductItem({product, onClick}) {
  return (
    <div onClick={onClick}>
      <img style={{width:'200px', height:'250px'}} src={product.thumbnail} alt="이미지 없음" />
      <p>{product.company}</p>
      <p>{product.itemName}</p>
    </div>
  );
}