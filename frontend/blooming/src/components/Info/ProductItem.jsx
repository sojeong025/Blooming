import { useState } from "react";
import classes from "./ProductItem.module.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { customAxios } from "../../lib/axios";

export default function ProductItem({ product, onClick }) {
  const address = product.companyAddress.split(" ");
  const [productHeart, setProductHeart] = useState(product.wish);

  const handleCreateWish = async () => {
    try {
      await customAxios.post(`wishlist/${product.id}`);
      setProductHeart(!productHeart);
    } catch (error) {
      console.error("찜하기 에러:", error);
    }
  };

  const handleDeleteWish = async () => {
    try {
      await customAxios.delete(`wishlist/${product.id}`);
      setProductHeart(!productHeart);
    } catch (error) {
      console.error("찜취소 에러:", error);
    }
  };

  const onWish = () => {
    // 찜
    if (productHeart) {
      // true이면 DELETE
      handleCreateWish();
    } else {
      // false이면 POST
      handleDeleteWish();
    }
  };

  return (
    <div
      className={classes.ItemContainer}
      // onClick={onClick}
    >
      <img
        className={classes.itemImg}
        src={product.thumbnail}
        alt='이미지 없음'
      />
      <div className={classes.textContainer}>
        <div className={classes.address}>
          {address[0]} {address[1]}
        </div>
        <div className={classes.company}>{product.company}</div>
        <div>{product.wish.toString()}</div>
        <div className={classes.heart} onClick={onWish}>
          {productHeart ? <AiFillHeart /> : <AiOutlineHeart />}
        </div>
      </div>
    </div>
  );
}
