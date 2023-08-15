import { useNavigate } from "react-router-dom";
import MyWishlistItem from "./MyWishlistItem";
import styled from "styled-components";

function MyWishlistMe({ myWishlist, toWishlist }) {
  const navigate = useNavigate();

  const handleNavigation = (wish) => {
    navigate(`/${wish.productType}/${wish.productId}`, {
      state: {
        id: wish.productId,
        productType: wish.productType,
        navAction: "info",
      },
    });
  };

  if (!myWishlist) {
    return toWishlist.map((wish) => (
      <MyWishlistItem
        key={wish.productId}
        wish={wish}
        onClick={handleNavigation}
        you='yes'
      />
    ));
  }

  return (
    <Wrapper>
      {myWishlist.length > 0 ? (
        <ProductFlex>
          {myWishlist.map((wish) => (
            <FlexItem key={wish.productId}>
              {toWishlist.includes(wish) ? (
                <MyWishlistItem
                  wish={wish}
                  onClick={handleNavigation}
                  you='yes'
                />
              ) : (
                <MyWishlistItem
                  key={wish.productId}
                  wish={wish}
                  onClick={handleNavigation}
                  you='no'
                />
              )}
            </FlexItem>
          ))}
        </ProductFlex>
      ) : (
        <div>찜 목록이 없습니다.</div>
      )}
    </Wrapper>
  );
}

export default MyWishlistMe;

const Wrapper = styled.div`
  margin-top: 100px;
  margin-bottom: 60px;
`;

const ProductFlex = styled.div`
  margin-left: 16px;
  margin-right: 16px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`;

const FlexItem = styled.div`
  flex-basis: 50%;
`;
