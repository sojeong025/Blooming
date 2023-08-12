import classes from "./ProductDetailItem.module.css";

const ProductDetailItem = ({ product, productType }) => {
  return (
    <>
      <div className={classes.detailContainer}>
        <img src={product.thumbnail} className={classes.companyImg}></img>
        <div className={classes.titleBrief}>
          <div className={classes.subTitle}>{product.company}</div>
          <div className={classes.brief}>{product.brief}</div>
        </div>
      </div>

      <div className={classes.infoContainer}>
        <div className={classes.item}>
          <span className={classes.leftText}>주소</span>
          <span className={classes.rightText}>{product.companyAddress}</span>
        </div>
        <div className={classes.item}>
          <span className={classes.leftText}>영업 시간</span>
          <span className={classes.rightText}>
            {product.companyTime !== "None" ? product.companyTime : "-"}
          </span>
        </div>
      </div>
    </>
  );
};

export default ProductDetailItem;
