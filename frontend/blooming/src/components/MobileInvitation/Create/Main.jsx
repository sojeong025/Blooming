import React from 'react';
import UploadImage from './UploadImage';
import classes from './Common.module.css';

function Main() {
  return (
    <div className={classes.container} style={{ marginTop: '70px' }}>
      <p className={classes.header}>메인</p>
      <hr />
      <div>
        <UploadImage />
      </div>
    </div>
  );
}

export default Main;
