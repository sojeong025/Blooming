import classes from './Common.module.css';

function Main() {
  return(
    <div className={classes.container}>
      <p className={classes.header}>메인</p>
      <hr />
      <div className={classes.thumbnail}>
        <p>메인 사진 (필수)</p>
      </div>
    </div>  
  )
}

export default Main;