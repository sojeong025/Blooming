export default function ProductItem({product, onClick}) {
  return (
    <div onClick={onClick}>
      <img src="" alt="이미지 없음" />
      <p>{product.company}</p>
      <p>{product.itemName}</p>
    </div>
  );
}