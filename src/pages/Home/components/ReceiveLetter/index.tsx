/*
  받은 편지함 페이지로 이동하는 버튼을 포함한 컴포넌트
*/

import PrevIcon from '../../../../commons/components/icons/PrevIcon';

export default function ReceiveLetter() {
  let count = 10; // 편지 개수, 추후 API 연동 시 수정
  return (
    <div className="flex items-center justify-between px-3 w-11/12 h-[54px] bg-[#f9f9f9] border border-[#e8e8e8] rounded-[10px] text-[1rem] font-bold cursor-pointer">
      <p>받은 편지함 {count}</p>
      <PrevIcon />
    </div>
  );
}
