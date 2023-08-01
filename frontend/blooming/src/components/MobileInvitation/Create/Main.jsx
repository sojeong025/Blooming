import classes from './Common.module.css';
import UploadImage from './UploadImage';

function Main() {
  return (
    <div className={classes.container}>
      <p className={classes.header}>메인</p>
      <hr />
      <div>
        <UploadImage />
      </div>
    </div>
  );
}

export default Main;
