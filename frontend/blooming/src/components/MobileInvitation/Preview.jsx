import classes from './Preview.module.css'

function Preview({onClose}) {
  return(
    <div className={classes.form}>
      <button onClick={ onClose }>X</button>
      <p>일단 모달창 띄워지는지 함 보자</p>
      <p>일단 모달창 띄워지는지 함 보자</p>
      
    </div>
  )
}

export default Preview;