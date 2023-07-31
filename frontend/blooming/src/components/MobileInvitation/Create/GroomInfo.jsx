import classes from './Common.module.css';

function GroomInfo() {
    return(
      <div className={classes.container}>
        <p className={classes.header}>신랑측 정보</p>
        <hr />
          <label htmlFor="name">아버님</label> 
          <input type="text" id="name" placeholder="이름"/> 
          <input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"/><br />
          <label htmlFor="name">어머님</label> 
          <input type="text" id="name" placeholder="이름"/> 
          <input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"/>
      </div>
    )
  }
  
  export default GroomInfo;