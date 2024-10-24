import React, { useCallback, useState } from 'react';
import { useStore } from 'zustand';
import { useBottomToastStore } from '../../../commons/components/BottomToastList/stores/useBottomToastStore';
import delay from '../../../commons/utils/delay';

export const TEXT_LIMIT = 5;

export default function useWriteLetter() {
  const addToast = useStore(useBottomToastStore, (state) => state.addToast);
  const [text, setText] = useState('');
  const [isActive, setIsActive] = useState(true);

  const handleOnChange = useCallback(
    async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (e.currentTarget.value.length > TEXT_LIMIT) {
        if (isActive) {
          addToast({ children: `텍스트는 ${TEXT_LIMIT}자 이하로 입력해주세요` });
          setIsActive(false);
          await delay(2);
          setIsActive(true);
        }
        return;
      }
      setText(e.currentTarget.value);
    },
    [addToast, isActive]
  );

  const handleOnSave = useCallback(() => {
    window.alert(text);
  }, [text]);

  const handleToStorage = useCallback(() => {
    window.alert(text);
  }, [text]);

  return { text, textLength: text.length, handleOnChange, handleOnSave, handleToStorage };
}
