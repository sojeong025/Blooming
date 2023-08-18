import classes from "./Common.module.css";
import {
  mobileInvitationState,
  mobileInvitationThemeState,
} from "../../../recoil/MobileInvitationAtom";
import { fileAxios } from "../../../lib/axios";
import { useRecoilState } from "recoil";
import { useState } from "react";

function Main({ onThemeSelected }) {
  const [invitation, setInvitation] = useRecoilState(mobileInvitationState);
  const [theme, setTheme] = useRecoilState(mobileInvitationThemeState);

  const handleThemeButtonClick = (e) => {
    const selectedTheme = parseInt(e.target.value);
    setTheme(selectedTheme);
    // console.log(theme)
    if (onThemeSelected) onThemeSelected(selectedTheme);
    // console.log("테마선택 시:" + theme);
  };

  const handleInputImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("image", file);
        const response = await fileAxios.post("INVITATION", formData);
        // console.log("모바일청첩장 이미지 Url", invitation);
        // console.log("Response data:", response.data);
        // console.log("Previous invitation:", invitation);

        setInvitation((prevInvitation) => {
          const updatedInvitation = {
            ...prevInvitation,
            thumbnail: response.data.result[0].uploadImageUrl,
          };
          // console.log("Updated invitation:", updatedInvitation);
          return updatedInvitation;
        });
      } catch (error) {
        // console.error("모바일청첩장 이미지 api 오류", error);
      }
    }
  };

  return (
    <div className={classes.container} style={{ marginTop: "70px" }}>
      <p className={classes.header}>메인</p>
      <hr className={classes.hr} />
      <div className={classes.themeSelection}>
        <p className={classes.bodytext}>테마 선택</p>
        <label className={classes.radio} htmlFor='theme1'>
          <input
            type='radio'
            id='theme1'
            name='theme'
            value={1}
            checked={theme === 1}
            onChange={handleThemeButtonClick}
          />
          테마 1
        </label>
        <label className={classes.radio} htmlFor='theme2'>
          <input
            type='radio'
            id='theme2'
            name='theme'
            value={2}
            onChange={handleThemeButtonClick}
          />
          테마 2
        </label>
        <label className={classes.radio} htmlFor='theme3'>
          <input
            type='radio'
            id='theme3'
            name='theme'
            value={3}
            onChange={handleThemeButtonClick}
          />
          테마 3
        </label>
        <label className={classes.radio} htmlFor='theme4'>
          <input
            type='radio'
            id='theme4'
            name='theme'
            value={4}
            onChange={handleThemeButtonClick}
          />
          테마 4
        </label>
      </div>
      <p className={classes.bodytext}>사진 선택</p>
      <div className={classes.imageContainer}>
        <label
          style={{ zIndex: "0" }}
          className={classes.label}
          htmlFor='image'
        >
          +
        </label>
        <input
          className={classes.img}
          type='file'
          id='image'
          accept='image/*'
          onChange={handleInputImage}
        />
        {invitation.thumbnail && (
          <img src={invitation.thumbnail} alt='preview' />
        )}
      </div>
    </div>
  );
}

export default Main;
