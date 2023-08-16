import { useNavigate } from "react-router-dom";
import MyWishlistItem from "./MyWishlistItem";
import styled from "styled-components";
import { useEffect } from "react";

function MyWishlistMe({ myWishlist = null, toWishlist }) {
  const navigate = useNavigate();

  // 누르면 디테일로
  const handleNavigation = (wish) => {
    navigate(`/${wish.productType}/${wish.productId}`, {
      state: {
        id: wish.productId,
        productType: wish.productType,
        navAction: "info",
      },
    });
  };

  useEffect(() => {
    console.log(myWishlist);
    console.log("t0", toWishlist);
  });
  // together
  if (myWishlist === null || myWishlist === "me") {
    return (
      <Wrapper>
        <ProductFlex>
          {toWishlist.map((wish) => (
            <FlexItem key={wish.productId}>
              <MyWishlistItem
                key={wish.productId}
                wish={wish}
                onClick={handleNavigation}
                me={true}
              />
            </FlexItem>
          ))}
        </ProductFlex>
      </Wrapper>
    );
  }
  // you
  return (
    <Wrapper>
      {myWishlist.length > 0 ? (
        <ProductFlex>
          {toWishlist.map((wish) => (
            <FlexItem key={wish.productId}>
              {myWishlist.some((item) => item.productId === wish.productId) ? (
                <MyWishlistItem
                  wish={wish}
                  onClick={() => {
                    handleNavigation(wish);
                  }}
                  me={true}
                />
              ) : (
                <MyWishlistItem
                  key={wish.productId}
                  wish={wish}
                  onClick={() => {
                    handleNavigation(wish);
                  }}
                  me={false}
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
