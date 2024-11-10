import React, { useCallback, useState } from 'react';
import { useStore } from 'zustand';
import { useBottomToastStore } from '../../../commons/components/BottomToastList/stores/useBottomToastStore';
import useThrottleCallback from '../../../commons/hooks/useThrottleCallback';

export const TEXT_LIMIT = 5;

export default function useWriteLetter() {
  const addToast = useStore(useBottomToastStore, (state) => state.addToast);
  const [text, setText] = useState('');
  const throttleAddToast = useThrottleCallback(
    () => {
      addToast({ children: `텍스트는 ${TEXT_LIMIT}자 이하로 입력해주세요` });
    },
    2000,
    [addToast]
  );

  const handleOnChange = useCallback(
    async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (e.currentTarget.value.length > TEXT_LIMIT) {
        throttleAddToast();
        return;
      }
      setText(e.currentTarget.value);
    },
    [throttleAddToast]
  );

  const handleOnSave = useCallback(() => {
    window.alert(text);
  }, [text]);

  const handleToStorage = useCallback(() => {
    window.alert(text);
  }, [text]);

  return { text, textLength: text.length, handleOnChange, handleOnSave, handleToStorage };
}
