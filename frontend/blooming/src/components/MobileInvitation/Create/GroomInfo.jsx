import classes from './Common.module.css';

function GroomInfo() {
    return(
      <div className={classes.container}>
        신랑측 정보
        <hr />
        아버님 <input type="text" placeholder="이름"/> <input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"/>
        어머님 <input type="text" placeholder="이름"/> <input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"/>
      </div>    
    )
  }
  
  export default GroomInfo;