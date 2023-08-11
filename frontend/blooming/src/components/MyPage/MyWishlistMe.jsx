import { useNavigate } from "react-router-dom"

export default function MyWishlistMe({ wishlist }) {
  
  const navigate = useNavigate()

  const handleNavigation = (wish) => {
    navigate(`/info/${wish.productId}`, {
      state: { id: wish.productId, productType: wish.productType },
    });
  };
  
  return (
    <>
      {wishlist ?
        <>
          {wishlist.map((wish) => {
            return (
              <div key={wish.productId} onClick={() => handleNavigation(wish)}>
                <img src={wish.thumbnail} alt="" />
                <p>{wish.productType}</p>
                <p>{wish.company}</p>
                <p>{wish.address}</p>
              </div>
            )
          })}
        </>
        :
        <div>찜 목록이 없습니다.</div>}
    </>
  )
}