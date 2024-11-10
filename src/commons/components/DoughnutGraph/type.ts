import { Color } from 'chart.js';

export default interface DataFiled {
  // 그래프 수치
  value: number;
  // 그래프 색
  color: Color;
  // 범례 문자열
  label: string;
  // 마우스 호버시 나오는 툴팁
  Tooltip: React.ReactNode;
  // 툴팁이 들어간 div (컨테이너) 의 className
  tooltipContainerClassName?: string;
}
