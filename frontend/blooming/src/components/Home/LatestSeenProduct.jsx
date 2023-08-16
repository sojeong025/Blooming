import { useEffect, useState } from "react";
import { customAxios } from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import classes from "./WeddingFair.module.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { styled } from "styled-components";

export default function LatestSeenProduct() {
  const navigate = useNavigate();

  const [latest, setLatest] = useState([]);

  const fetchData = async () => {
    try {
      const response = await customAxios.get("latestSeenProduct");
      if (response.status === 200) {
        setLatest(response.data.result[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNavigation = (productType, id) => {
    navigate(`/${productType}/${id}`, {
      state: { id, productType, navAction: "info" },
    });
  };

  const handleCreateWish = async (id) => {
    try {
      await customAxios.post(`wishlist/${id}`);
      const updatedLatest = latest.map((item) => {
        if (item.productId === id) {
          return { ...item, wish: true };
        }
        return item;
      });
      setLatest(updatedLatest);
    } catch (error) {
      console.error("찜하기 에러:", error);
    }
  };
  const handleDeleteWish = async (id) => {
    try {
      await customAxios.delete(`wishlist/${id}`);
      const updatedLatest = latest.map((item) => {
        if (item.productId === id) {
          return { ...item, wish: false };
        }
        return item;
      });
      setLatest(updatedLatest);
    } catch (error) {
      console.error("찜취소 에러:", error);
    }
  };
  const onWish = (id, wishStatus) => {
    // 찜
    if (wishStatus) {
      // true이면 DELETE
      handleDeleteWish(id);
    } else {
      // false이면 POST
      handleCreateWish(id);
    }
  };

  return (
    <div className={`${classes.container}`}>
      {latest.length > 0 ? (
        latest.map((item, index) => (
          <div key={index}>
            <div className={`${classes.LastWrapper}`}>
              <div
                className={classes.lastItemContainer}
                onClick={() =>
                  handleNavigation(item.productType, item.productId)
                }
              >
                <img
                  className={`${classes.listItemImg} `}
                  src={item.thumbnail}
                  alt='이미지 없음'
                />
                <div className={`${classes.Company}`}>{item.company}</div>
              </div>
              <div className={classes.heart}>
                <div className={classes.IconWrapper}>
                  <div onClick={() => onWish(item.productId, item.wish)}>
                    {item.wish ? (
                      <AiFillHeart
                        size={25}
                        className={classes.heartIconTrue}
                      />
                    ) : (
                      <AiOutlineHeart
                        size={25}
                        className={classes.heartIconFalse}
                      />
                    )}
                  </div>
                  <div className={classes.LaViewDetail}>View Detail →</div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <NoContent>최근 본 상품이 없습니다.</NoContent>
      )}
    </div>
  );
}

const NoContent = styled.div`
  font-size: 14px;
  padding: 5px;
  margin-left: 12px;
`;
