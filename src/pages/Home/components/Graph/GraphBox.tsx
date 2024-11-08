import { useEffect, useState } from 'react';
import DataFiled from '../../../../commons/components/DoughnutGraph/type';
import DoughnutGraph from '../../../../commons/components/DoughnutGraph';
import delay from '../../../../commons/utils/delay';

const data: DataFiled[] = [
  {
    value: 3,
    color: 'red', // 'rgba(.., .., .., ..)' | '#FF0000'
    label: '화남', // 범례에 표시될 문자열
    Tooltip: <MyTooltip text="화남" />,
    tooltipContainerClassName: 'bg-red-600',
  },
  {
    value: 5,
    color: 'rgba(0,0,255,1)', // 'rgba(.., .., .., ..)' | '#FF0000'
    label: '슬픔', // 범례에 표시될 문자열
    Tooltip: <MyTooltip text="슬픔" />,
    tooltipContainerClassName: 'bg-blue-600',
  },
  {
    value: 10,
    color: '#00FF00', // 'rgba(.., .., .., ..)' | '#FF0000'
    label: '편함', // 범례에 표시될 문자열
    Tooltip: <MyTooltip text="편함" />,
    tooltipContainerClassName: 'bg-green-600',
  },
];

export default function GraphBox() {
  return <DoughnutGraph className="w-11/12 margin" data={data} />;
}

function MyTooltip({ text }: { text: string }) {
  const [loadText, setLoadText] = useState<string | undefined>(undefined);
  useEffect(() => {
    mockCall(text).then((res) => {
      setLoadText(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className="w-20 h-20 bg-black opacity-60 text-white">{loadText ?? '로딩중...'}</div>;
}

const mockCall = async (text: string) => {
  await delay(1);
  return text;
};
