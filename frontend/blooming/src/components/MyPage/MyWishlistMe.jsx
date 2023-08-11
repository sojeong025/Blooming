import { useNavigate } from "react-router-dom";

function MyWishlistMe({ wishlist }) {
  const navigate = useNavigate();

  const handleNavigation = (wish) => {
    navigate(`/info/${wish.productId}`, {
      state: { id: wish.productId, productType: wish.productType },
    });
  };

  return (
    <>
      <div>{wishlist}</div>
      {/* {wishlist ? (
        wishlist.map((wish) => (
          <div
            key={wish.productId}
            onClick={() => handleNavigation(wish)}
          >
            <img src={wish.thumbnail} alt="" />
            <p>{wish.productType}</p>
            <p>{wish.company}</p>
            <p>{wish.address}</p>
          </div>
        ))
      ) : (
        <div>찜 목록이 없습니다.</div>
      )} */}
    </>
  );
}

export default MyWishlistMe;
