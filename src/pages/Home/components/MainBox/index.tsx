import { useState } from 'react';
import MonthBar from './MonthBar';
import GraphBox from '../Graph/GraphBox';

/* 
  메인 페이지에서 월별 감정 그래프를 보여주는 컴포넌트
*/

export default function MainBox() {
  const today = new Date();

  const [month, setMonth] = useState<number>(today.getMonth() + 1);
  let countLetter = 1; // 추후 서버에서 받은 편지 개수로 바뀔 예정

  return (
    <div className="w-11/12 h-3/5 flex flex-col justify-center items-center my-[10px] ㅡ border-2">
      <MonthBar month={month} setMonth={setMonth} />
      <div className="w-4/5 h-4/5 my-5 flex justify-center items-center gap-x-2">
        {countLetter == 0 ? (
          <div className="w-full h-full flex flex-col justify-center items-center gap-y-2">
            <p>아직 작성한 편지가 없어요!</p>
            <p>편지를 쓰고 내 감정을 확인해보세요!</p>
            <button>지금 바로 편지쓰기</button>
          </div>
        ) : (
          <div className="w-full h-full flex justify-around items-center">
            <GraphBox />
          </div>
        )}
      </div>
    </div>
  );
}
