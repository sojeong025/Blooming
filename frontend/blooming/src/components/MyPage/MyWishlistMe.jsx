import { useNavigate } from "react-router-dom";
import MyWishlistItem from "./MyWishlistItem";

function MyWishlistMe({ wishlist }) {
  const navigate = useNavigate();

  const handleNavigation = (wish) => {
    navigate(`/info/${wish.productId}`, {
      state: { id: wish.productId, productType: wish.productType },
    });
  };

  return (
    <>
      {wishlist ? (
        wishlist.map((wish) => (
          <MyWishlistItem key={wish.productId} wish={wish} onClick={handleNavigation} />
        ))
      ) : (
        <div>찜 목록이 없습니다.</div>
      )}
    </>
  );
}

export default MyWishlistMe;
