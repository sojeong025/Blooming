// import Address from './Address';
import { useRecoilState } from 'recoil';
import { mobileInvitationState } from '../../../recoil/MobileInvitationAtom';

import classes from './Common.module.css';

function WeddingHall() {
  const [invitation, setInvitation] = useRecoilState(mobileInvitationState);
  // const [openAddressDialog, setOpenAddressDialog] = useState(false);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setInvitation((preInvitation) => ({
      ...preInvitation,
      [id]: value,
    }));
  };

  return (
    <div className={classes.container}  style={{ marginBottom: '110px' }}>
      <p className={classes.header}>예식장소</p>
      <hr className={classes.hr}/>
      <div>
        <p className={classes.bodytext} htmlFor="weddingHallName">예식장 명 <span className={classes.required}>(필수)</span></p>
        <input
          className={classes.inputField}
          autocomplete="off"
          id="weddingHallName"
          placeholder="웨딩 컨벤션"
          value={invitation.weddingHallName}
          onChange={handleInputChange}
        />

        <br />
        <p className={classes.bodytext} htmlFor="floor">층 및 홀 <span className={classes.required}>(필수)</span></p>
        <input
          className={classes.inputField}
          autocomplete="off"
          id="floor"
          placeholder="1층 그레이트홀"
          value={invitation.floor}
          onChange={handleInputChange}
        />

        <br />
        <p className={classes.bodytext} htmlFor="address">주소 <span className={classes.required}>(필수)</span></p>
        <input
          className={classes.inputField}
          autocomplete="off"
          id="address"
          placeholder="선택시 주소 검색창이 노출됩니다."
          value={invitation.address}
          onChange={handleInputChange}
        />

        {/* {openAddressDialog && <Address onClose={() => setOpenAddressDialog(false)} />} */}
      </div>
    </div>
  );
}

export default WeddingHall;
