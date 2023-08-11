import { useNavigate } from "react-router-dom";
import MyWishlistItem from "./MyWishlistItem";

function MyWishlistMe({ myWishlist, toWishlist }) {
  const navigate = useNavigate();

  const handleNavigation = (wish) => {
    navigate(`/info/${wish.productId}`, {
      state: { id: wish.productId, productType: wish.productType },
    });
  };

  return (
    <>
      {myWishlist ? (
        myWishlist.map((wish) => (
          toWishlist.includes(wish) ? (
            <MyWishlistItem key={wish.productId} wish={wish} onClick={handleNavigation} you="yes" />
          ): (
            <MyWishlistItem key={wish.productId} wish={wish} onClick={handleNavigation} you="no" />
          )
        ))
      ) : (
        <div>찜 목록이 없습니다.</div>
      )}
    </>
  );
}

export default MyWishlistMe;
