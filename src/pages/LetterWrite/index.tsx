import AutoResizeTextArea from '../../commons/components/AutoResizeTextArea';
import Header from '../../commons/components/Header';
import WriteFeatureHeader from './components/WriteFeatureHeader';
import useWriteLetter from './hooks/useWriteLetter';

const TEXT_LIMIT = 1000;

export default function LetterWritePage() {
  const {
    text, //
    textLength,
    handleOnChange,
    handleOnSave,
    handleToStorage,
  } = useWriteLetter();
  return (
    <div className="px-4 pb-4">
      <Header title="편지 쓰기" service="완료" />
      <WriteFeatureHeader handleOnSave={handleOnSave} handleToStorage={handleToStorage} />
      <AutoResizeTextArea
        value={text}
        onChange={handleOnChange}
        className="w-full outline-none"
        placeholder="편지를 입력해 주세요"
      />
      <div className="flex justify-end text-gray-400">
        {textLength}/{TEXT_LIMIT}
      </div>
    </div>
  );
}
