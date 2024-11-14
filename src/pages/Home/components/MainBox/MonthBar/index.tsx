import React from 'react';
import PrevIcon from '../../../../../commons/components/icons/PrevIcon';
import BackIcon from '../../../../../commons/components/icons/BackIcon';

/*
    원하는 월을 선택할 수 있는 네비게이터
*/
interface MonthBarProps {
  month: number;
  setMonth: React.Dispatch<React.SetStateAction<number>>; // 상태 업데이트 함수
}

const MonthBar: React.FC<MonthBarProps> = ({ month, setMonth }) => {
  const handleChangePrevMonth = () => {
    setMonth((prev: number) => (prev == 1 ? 12 : prev - 1));
  };
  const handleChangeNextMonth = () => {
    setMonth((prev: number) => (prev == 12 ? 1 : prev + 1));
  };
  return (
    <div className="w-3/5 h-16 mt-5 flex justify-center items-center gap-x-2">
      <button onClick={handleChangePrevMonth}>
        <BackIcon />
      </button>
      <p className="w-3/5 text-center">{month}월의 감정 그래프</p>
      <button onClick={handleChangeNextMonth}>
        <PrevIcon />
      </button>
    </div>
  );
};

export default MonthBar;
