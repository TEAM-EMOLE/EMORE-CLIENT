import React, { useCallback, useState } from 'react';

export default function useWriteLetter() {
  const [text, setText] = useState('');

  const handleOnChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.currentTarget.value);
  }, []);

  const handleOnSave = useCallback(() => {
    window.alert(text);
  }, [text]);

  const handleToStorage = useCallback(() => {
    window.alert(text);
  }, [text]);

  return { text, textLength: text.length, handleOnChange, handleOnSave, handleToStorage };
}
