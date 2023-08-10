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
      <hr />
      <div>
        <label htmlFor="weddingHallName">예식장 명 <span className={classes.required}>(필수)</span></label>
        <input
          className={classes.inputField}
          id="weddingHallName"
          placeholder="웨딩 컨벤션"
          value={invitation.weddingHallName}
          onChange={handleInputChange}
        />

        <br />
        <label htmlFor="floor">층 및 홀 <span className={classes.required}>(필수)</span></label>
        <input
          className={classes.inputField}
          id="floor"
          placeholder="1층 그레이트홀"
          value={invitation.floor}
          onChange={handleInputChange}
        />

        <br />
        <label htmlFor="address">주소 <span className={classes.required}>(필수)</span></label>
        <input
          className={classes.inputField}
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
