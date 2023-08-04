import clipboardCopy from "clipboard-copy";
import PropTypes from "prop-types";

const CopyToClipboardButton = ({ text, children }) => {
  const handleCopy = () => {
    clipboardCopy(text)
      .then(() => alert("텍스트가 클립보드에 복사되었습니다!"))
      .catch((err) => alert("복사 실패: ", err));
  };

  return <div onClick={handleCopy}>{children}</div>;
};

CopyToClipboardButton.propTypes = {
  text: PropTypes.string.isRequired,
};

export default CopyToClipboardButton;
