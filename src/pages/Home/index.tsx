import Header from '../../commons/components/Header';
import MainBox from './components/MainBox';
import ReceiveLetter from './components/ReceiveLetter';
import SendLetter from './components/SendLetter';

/* 
  메인 페이지
*/

export default function HomePage() {
  return (
    <>
      <Header title="HOME" />
      <div className="gap-3 flex flex-col justify-center items-center w-full h-[calc(100%-48px)]">
        <MainBox />
        <SendLetter />
        <ReceiveLetter />
      </div>
    </>
  );
}
