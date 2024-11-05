// eslint-disable-next-line import/no-named-as-default
import Chart, { TooltipModel } from 'chart.js/auto';
import { useEffect, useRef, useState } from 'react';
import DataFiled from './type';

export default function DoughnutGraph({
  data,
  margin = 100,
  className,
  ...props
}: {
  data: DataFiled[];
  margin?: number;
} & React.HTMLAttributes<HTMLDivElement>) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [tooltips, setTooltips] = useState<{
    dataFiled?: DataFiled;
    tooltip?: TooltipModel<'doughnut'>;
  }>({});

  useEffect(() => {
    const chartInstance = new Chart(canvasRef.current!, {
      type: 'doughnut',
      data: {
        labels: data.map(({ label }) => label),
        datasets: [
          {
            label: '# of Votes',
            data: data.map(({ value }) => value),
            backgroundColor: data.map(({ color }) => color),
            borderWidth: 0,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            position: 'right',
            rtl: true,
            labels: {
              boxHeight: 30,
              boxWidth: 30,
            },
            fullSize: false,
          },
          tooltip: {
            enabled: false,
            external: function (context) {
              const { tooltip } = context;
              const findData = data.find(({ label }) => label === tooltip.title[0]);
              setTooltips({ dataFiled: findData, tooltip });
            },
          },
        },
      },
      plugins: [
        {
          id: 'legendMargin',
          afterInit(chart) {
            const originalFit = chart.legend?.fit;
            chart.legend!.fit = function fit() {
              if (originalFit) {
                originalFit.call(this);
              }
              this.width = (this.width ?? 0) + margin;
            };
          },
        },
      ],
    });
    return () => chartInstance.destroy();
  }, [data, margin]);
  return (
    <div className={`relative ${className}`} {...props}>
      <canvas className="relative" ref={canvasRef}></canvas>
      <Tooltip key={tooltips.dataFiled?.label} {...tooltips} />
    </div>
  );
}

function Tooltip({
  dataFiled,
  tooltip,
}: {
  dataFiled?: DataFiled;
  tooltip?: TooltipModel<'doughnut'>;
}) {
  return (
    <div
      style={{ left: tooltip?.caretX, top: tooltip?.caretY }}
      className={`pointer-events-none absolute z-10 rounded-lg transition-all duration-300 ${tooltip?.opacity === 0 ? 'opacity-0' : 'opacity-100'} ${dataFiled?.tooltipContainerClassName}`}
    >
      {dataFiled && dataFiled?.Tooltip}
    </div>
  );
}
