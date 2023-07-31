export default function DiaryItem ({ title, content, date, image }) {

  return (
    <div>
      <div>
        {title}
      </div>
      <div>
        {content}
      </div>
      <div>
        {date}
      </div>
      <img src={image} alt="사진 없다" width='100' height='100' />
    </div>
  );
}

