
/** Footer 컴포넌트
 * 생성 날짜: 2024-11-08
 * 생성자: 장영주
 * 설명: footer
 */

import { useNavigate } from "react-router-dom";
import Button from "./components/Button";
import WriteButton from "./components/WriteButton";

interface FooterProps {
  isHome?: boolean;
  isFriend?: boolean;
}

export default function Footer({ isHome, isFriend }: FooterProps) {
  const navigate = useNavigate();

  return (
    <div className="w-full h-[48px] flex justify-evenly items-center relative border-t border-[rgba(249, 249, 249, 0.8)]">
      <Button
        isDisabled={isHome}
        text="홈"
        onClick={() => navigate('/')}
      />
      <WriteButton onClick={() => navigate('/letter/write')} />
      <Button
        isDisabled={isFriend}
        text="친구"
        onClick={() => navigate('/friend')}
      />
    </div>
  );
}
