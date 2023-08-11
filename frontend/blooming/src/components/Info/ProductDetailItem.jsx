import { useState } from "react";

import classes from "./ProductDetailItem.module.css";
import { MdLocationOn } from "react-icons/md";

const ProductDetailItem = ({ product, productType }) => {
  const address = product.companyAddress.split(" ");

  return (
    <>
      <div className={classes.ProductTitle}>
        <div className={classes.companyTitle}>{product.company}</div>
        <div className={classes.location}>
          <span className={classes.locationIcon}>
            <MdLocationOn size={18} />
          </span>
          <span className={classes.address}>
            {address[0]} {address[1]}
          </span>
        </div>
      </div>
      <hr className={classes.hr} />

      <div className={classes.detailContainer}>
        <img src={product.thumbnail} className={classes.companyImg}></img>
        <div>
          <div className={classes.subTitle}>{product.company}</div>
          <div className={classes.brief}>{product.brief}</div>
        </div>
      </div>

      <div>주소 {product.companyAddress}</div>
      <div>{product.companyTime !== "None" ? product.companyTime : "-"}</div>

      {/* hall 뺴고 다 있음 */}
      {/* 걍 뺄까 */}
      {/* {productType !== "HALL" && (
        <div className={classes.itemName}>{product.itemName}</div>
      )} */}
    </>
  );
};

export default ProductDetailItem;
