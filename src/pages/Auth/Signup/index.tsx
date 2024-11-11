import Header from '../../../commons/components/Header';
import Container from '../../../commons/components/layout/Container';

export default function HomePage() {
  return (
    <>
      <Header title="회원가입" isBack />
      <Container>
        <div className="flex flex-col gap-[30px] font-SUIT text-left">
          <div>
            <div className="text-24 font-extrabold leading-[31.2px] tracking-[-0.02em] mt-[30px] mb-[8px]">
              반가워요!
            </div>
            <div className="text-12 font-medium leading-[18px] tracking-[-0.015em] text-gray-600">
              가입을 위해 필요한 정보를 입력해 주세요
            </div>
          </div>

          {/* 아래 박스들에만 30px 간격이 적용됩니다 */}
          <div>첫 번째 박스</div>
          <div>두 번째 박스</div>
          <div>세 번째 박스</div>
        </div>
      </Container>
    </>
  );
}
