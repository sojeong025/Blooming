import classes from './Common.module.css';

function Invitation() {
  return(
    <div className={classes.container}>
      <p className={classes.header}>모시는 글</p>
      <hr />

      <div>
        <label htmlFor="title">제목 <span className={classes.required} >(필수)</span></label><br/> 
        <input className={classes.inputField} type="text" id="title" placeholder="초대합니다." /><br/>

        <label htmlFor="content">내용 <span className={classes.required} >(필수)</span></label><br/>
        <button>샘플 인사말</button><br/>
        <textarea className={classes.inputField} name="content" id="content" cols="30" rows="10"></textarea>
      </div>
    </div>  
  )
}

export default Invitation;