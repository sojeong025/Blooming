import { useEffect, useState } from "react";
import { customAxios } from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import ProductItem from "../Info/ProductItem";
import classes from "./WeddingFair.module.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";

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
    // fetchData();
    // 더미다 안지우면 내가 바보
    setLatest([
      {
        productId: 86,
        productType: "HALL",
        itemName: "상록아트홀",
        thumbnail:
          "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/product/hall/86_thumbnail.jpg",
        company: "상록아트홀",
        wish: false,
      },
      {
        productId: 85,
        productType: "HALL",
        itemName: "빌라드지디 수서",
        thumbnail:
          "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/product/hall/85_thumbnail.jpg",
        company: "빌라드지디 수서",
        wish: true,
      },
      {
        productId: 30,
        productType: "DRESS",
        itemName: "[촬영+본식] 드레스 4벌",
        thumbnail:
          "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/product/dress/30_thumbnail.jpg",
        company: "에델린",
        wish: false,
      },
      {
        productId: 61,
        productType: "MAKEUP",
        itemName: "[본식] 신부신랑 헤어메이크업(실장)",
        thumbnail:
          "https://blooming-image-bucket.s3.ap-northeast-2.amazonaws.com/product/makeup/61_thumbnail.jpg",
        company: "바이엘린",
        wish: false,
      },
    ]);
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
                <div className={`${classes.cardtext} ${classes.LastCompany}`}>
                  <div className={`${classes.cardtitle} ${classes.Company}`}>
                    {item.company}
                  </div>
                </div>
              </div>
              <div
                className={classes.heart}
                onClick={() => onWish(item.productId, item.wish)}
              >
                <div className={classes.IconWrapper}>
                  {item.wish ? (
                    <AiFillHeart size={25} className={classes.heartIconTrue} />
                  ) : (
                    <AiOutlineHeart
                      size={25}
                      className={classes.heartIconFalse}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>최근 본 상품이 없습니다.</div>
      )}
    </div>
  );
}
