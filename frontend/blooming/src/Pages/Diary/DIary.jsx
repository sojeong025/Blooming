import { useRecoilState } from "recoil";
import { DiaryState } from "../../recoil/DiaryStateAtom";
import DiaryItem from "../../components/Diary/DiaryItem";

export default function Diary() {
  
  const [diaryState, setDiaryState] = useRecoilState(DiaryState)
  
  const style = {marginTop: '56px'}

  return (
    <div style={style}>
      <button>
        +
      </button>
      {diaryState.map((diary) => {
        if (diary) {
          return (
            <DiaryItem key={diary.title} title={diary.title} content={diary.content} date={diary.date} image={diary.image} ></DiaryItem>
          )
        }
      })}
    </div>
  );
}


