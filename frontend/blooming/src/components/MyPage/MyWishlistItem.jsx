import { useEffect, useState } from "react";
import classes from "../Info/ProductItem.module.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";
import { customAxios } from "../../lib/axios";

export default function MyWishlistItem({ wish, onClick, me }) {
  const address = wish.address.split(" ");
  const [productHeart, setProductHeart] = useState(me);

  const handleCreateWish = async (wish) => {
    try {
      await customAxios.post(`wishlist/${wish.productId}`);
      setProductHeart(!productHeart);
    } catch (error) {
      console.error("찜하기 에러:", error);
    }
  };

  const handleDeleteWish = async (wish) => {
    try {
      await customAxios.delete(`wishlist/${wish.productId}`);
      setProductHeart(!productHeart);
    } catch (error) {
      console.error("찜취소 에러:", error);
    }
  };

  const onWish = (id) => {
    // 찜
    if (productHeart) {
      // true이면 DELETE
      handleDeleteWish(id);
    } else {
      // false이면 POST
      handleCreateWish(id);
    }
  };

  useEffect(() => {
    setProductHeart(me);
    console.log(productHeart);
  });

  return (
    <div className={classes.Wrapper}>
      <div onClick={onClick} className={classes.ItemContainer}>
        <img
          className={classes.itemImg}
          src={wish.thumbnail}
          alt='이미지 없음'
        />
        <div className={classes.textContainer}>
          <div className={classes.location}>
            <span className={classes.locationIcon}>
              <MdLocationOn size={18} />
            </span>
            <span className={classes.address}>
              {address[0]} {address[1]}
            </span>
          </div>
          <div className={classes.company}>{wish.company}</div>
        </div>
      </div>
      <div className={classes.heart} onClick={() => onWish(wish.productId)}>
        <div className={classes.IconWrapper}>
          {productHeart ? (
            <AiFillHeart size={25} className={classes.heartIconTrue} />
          ) : (
            <AiOutlineHeart size={25} className={classes.heartIconFalse} />
          )}
        </div>
      </div>
    </div>
  );
}
