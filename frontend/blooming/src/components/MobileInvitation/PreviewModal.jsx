import React, { useEffect } from 'react';
import classes from './PreviewModal.module.css';
import Preview from './Preview';

function PreviewModal({ onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []); 
  
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
