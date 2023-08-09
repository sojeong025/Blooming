import React from 'react';
// import UploadImage from './UploadImage';
import classes from './Common.module.css';
import { mobileInvitationState } from '../../../recoil/MobileInvitationAtom';
import { customAxios, fileAxios } from "../../../lib/axios";

import { useRecoilState } from 'recoil';


function Main() {
  const [invitation, setInvitation] = useRecoilState(mobileInvitationState);

  const handleInputImage = async(e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('thumbnail', file);
        const response = await fileAxios.post('INVITATION', formData);
        console.log('모바일청첩장 이미지 Url', invitation);
        
        setInvitation((prevInvitation) => ({
          ...prevInvitation,
          main: {
            ...prevInvitation.main,
            thumbnail: response.data.result[0].uploadImageUrl,
          },
        }));
      } catch (error) {
        console.error('모바일청첩장 이미지 api 오류', error);
      }
    }
  };

  return (
    <div className={classes.container} style={{ marginTop: '70px' }}>
      <p className={classes.header}>메인</p>
      <hr />
      <div className={classes.imageContainer}>
          <label className={classes.label} htmlFor="image">+</label>
          <input
            className={classes.img}
            type="file"
            id="image"
            accept="image/*"
            onChange={handleInputImage}
          />
          {invitation.main.imageURL && (
            <img
              src={invitation.main.thumbnail}
              alt="preview"
            />
          )}
        </div>
    </div>
  );
}

export default Main;
