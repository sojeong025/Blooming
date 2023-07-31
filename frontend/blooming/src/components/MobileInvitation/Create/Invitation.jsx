import classes from './Common.module.css';

function Invitation() {
  return(
    <div className={classes.container}>
      모시는 글
      <hr />
      <div>
      제목 :
      <input type="text" /><br/>
      내용 :
      <textarea name="content" id="content" cols="30" rows="10"></textarea>
      </div>
    </div>  
  )
}

export default Invitation;