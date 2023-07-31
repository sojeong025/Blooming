import classes from "./MyPageComponents.module.css";

const IconBox = ({ icon, name }) => {
  const iconImg = `src/assets/MyPage/${icon}.img`;

  return (
    <div className={classes.iconBox} style={{ border: "1px solid red" }}>
      <img className={classes.icon} src={iconImg} alt={icon} />
      <div>{name}</div>
    </div>
  );
};

export default IconBox;
