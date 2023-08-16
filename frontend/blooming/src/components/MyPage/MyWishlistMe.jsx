import { useNavigate } from "react-router-dom";
import MyWishlistItem from "./MyWishlistItem";
import styled from "styled-components";
import { useEffect } from "react";
import NoContent from "../../components/Common/NoContent";

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

  // together
  if (myWishlist === null && toWishlist.length === 0) {
    return (
      <Wrapper2>
        <NoContent />
      </Wrapper2>
    );
  }

  if (myWishlist === "me") {
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
        <Wrapper2>
          <NoContent />
        </Wrapper2>
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

const Wrapper2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: auto;
  margin-top: 120px;
`;
