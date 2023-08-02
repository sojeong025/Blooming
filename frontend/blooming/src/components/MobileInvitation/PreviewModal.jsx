import React from 'react';
import classes from './PreviewModal.module.css';
import Preview from './Preview';

function PreviewModal({ onClose }) {
  const handleBackgroundClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  return (
    <div className={classes.modalContainer} onClick={handleBackgroundClick}>
      <div className={classes.form}>
        <Preview onClose={onClose} />
      </div>
    </div>
  );
}

export default PreviewModal;