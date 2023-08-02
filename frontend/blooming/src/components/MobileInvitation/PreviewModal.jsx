import React from 'react';
import classes from './PreviewModal.module.css';
import Preview from './Preview';

function PreviewModal({ onClose }) {
  return (
    <div className={classes.modalContainer}>
      <div className={classes.form}>
        <Preview onClose={onClose} />
      </div>
    </div>
  );
}

export default PreviewModal;