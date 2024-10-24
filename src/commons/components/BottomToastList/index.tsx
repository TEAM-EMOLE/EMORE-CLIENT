import React, { useCallback, useEffect, useState } from 'react';
import { useStore } from 'zustand';
import delay from '../../utils/delay';
import { ToastType, useBottomToastStore } from './stores/useBottomToastStore';

/** BottomToastList 컴포넌트
 * 생성 날짜: 2024-10-24
 * 생성자: 이원찬
 * 설명: GlobalLayout 밑에 붙어있는 토스트 리스트 컴포넌트
 * 상황: 토스트 메시지를 띄우기 위해 개발
 */
function BottomToastList() {
  const toasts = useStore(useBottomToastStore, (state) => state.toasts);
  return (
    <div className="fixed z-popup bottom-0 w-full max-w-[600px]">
      {toasts.map((props) => (
        <Toast key={props.id} id={props.id}>
          {props.children}
        </Toast>
      ))}
    </div>
  );
}

function Toast({ id, children, time = 3 }: ToastType) {
  const [position, setPosition] = useState<'HIDDEN' | 'NEW' | 'DISAPEAR'>('HIDDEN');
  const removeToast = useStore(useBottomToastStore, (state) => state.removeToast);

  const init = useCallback(
    async (id: string) => {
      if (!removeToast || !time) return;
      await delay(0.1);
      setPosition('NEW');

      await delay(time);
      setPosition('DISAPEAR');

      await delay(0.5);
      removeToast(id);
    },
    [removeToast, time]
  );

  function getPosition(ps: typeof position) {
    switch (ps) {
      case 'NEW':
        return '!translate-x-0';
      case 'DISAPEAR':
        return '!translate-x-[150vh]';
      default:
        return '';
    }
  }

  useEffect(() => {
    if (!id || !init) return;
    init(id);
  }, [id, init]);

  return (
    <div
      className={`
        bg-Gray-800 opacity-80 text-white m-4 p-4 rounded-lg shadow-sm transition-transform duration-500 translate-x-[150vh] ${getPosition(
          position
        )}`}
    >
      {children}
    </div>
  );
}

export default React.memo(BottomToastList);
