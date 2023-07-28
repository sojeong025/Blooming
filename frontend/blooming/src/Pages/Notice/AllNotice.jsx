import Notice from "../../components/Notice/Notice";
import NoticeLibrary from "../../components/Notice/Notice_library";
import { useNavigate } from "react-router-dom";

export default function AllNotice() {
  const navigate = useNavigate();
  const handleHistory = () => {
    navigate(-1);
  };

  return (
    <>
      <div onClick={handleHistory}>엑스버튼</div>
      <Notice />
      <NoticeLibrary />
    </>
  );
}
