import clipboardCopy from 'clipboard-copy';
import PropTypes from 'prop-types';

const CopyToClipboardButton = ({ text }) => {
  const handleCopy = () => {
    clipboardCopy(text)
      .then(() => alert('텍스트가 클립보드에 복사되었습니다!'))
      .catch((err) => alert('복사 실패: ', err));
  };

  return (
    <button onClick={handleCopy}>
      클립보드에 복사하기
    </button>
  );
};

CopyToClipboardButton.propTypes = {
  text: PropTypes.string.isRequired,
};

export default CopyToClipboardButton;
