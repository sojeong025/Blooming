import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { invitationState } from "../../recoil/PreviewAtom";
import { useRecoilValue } from "recoil";
import { useState } from "react";

import classes from './ConceptsList.module.css'

function ConceptsList() {

  const invitation = useRecoilValue(invitationState);
  const [currentInvitationIndex, setCurrentInvitationIndex] = useState(0);

  const currentContext = invitation[currentInvitationIndex].context;

  const handleCarouselChange = (index) => {
    setCurrentInvitationIndex(index);
  };

  return (
    <div>
      <Carousel
        infiniteLoop
        autoPlay
        interval={3000}
        showThumbs={false}
        showStatus={false}
        showArrows={false}
        emulateTouch
        swipeable
        className={classes.image}
        onChange={handleCarouselChange}
        selectedItem={currentInvitationIndex}
        renderIndicator={() => {}}
      >
        {invitation.map((invitation, index) => (
          <div key={index}>
            <img src={invitation.src} alt={invitation.caption} className={classes.resizedImage} />
          </div>
        ))}
      </Carousel>
      <div className={classes.context} dangerouslySetInnerHTML={{ __html: currentContext }} />
    </div>
  )
}

export default ConceptsList;
