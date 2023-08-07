import React, { useCallback } from 'react';
import UploadImage from './UploadImage';
import classes from './Common.module.css';

function Main() {
  const requestFileFromApp = useCallback((event) => {
    event.preventDefault();
    window.location.href = 'filepicker://request';
  }, []);

  // 필요한 경우 handleSelectedFile 함수를 window 객체에 추가합니다.
  window.handleSelectedFile = (name, mimeType, base64Data) => {
    var fileInput = document.getElementById("yourFileInputId");
    var file = new File([base64Data], name, { type: mimeType });
    var dt = new DataTransfer();
    dt.items.add(file);
    fileInput.files = dt.files;
  };

  return (
    <div className={classes.container} style={{ marginTop: '70px' }}>
      <p className={classes.header}>메인</p>
      <hr />
      <div>
        <UploadImage />
      </div>
      <div>
        <input
          type="file"
          id="yourFileInputId"
          onClick={requestFileFromApp}
        />
      </div>
    </div>
  );
}

export default Main;


// import React from 'react';
// import UploadImage from './UploadImage';
// import classes from './Common.module.css';

// function Main() {
//   return (
//     <div className={classes.container} style={{ marginTop: '70px' }}>
//       <p className={classes.header}>메인</p>
//       <hr />
//       <div>
//         <UploadImage />
//       </div>
//       <div>
//         <input type="file" id="yourFileInputId"  onclick="requestFileFromApp(event)"/>
//       </div>
//     </div>
//   );
// }
// function requestFileFromApp(event) {
//   event.preventDefault();
//   window.location.href = 'filepicker://request';
// }

// function handleSelectedFile(name, mimeType, base64Data) {
//   var fileInput = document.getElementById("yourFileInputId");
//   var file = new File([base64Data], name, { type: mimeType });
//   var dt = new DataTransfer();
//   dt.items.add(file);
//   fileInput.files = dt.files;
// }

// export default Main;
