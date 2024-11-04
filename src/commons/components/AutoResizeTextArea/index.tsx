import React, { useRef } from 'react';

/** AutoResizeTextArea 컴포넌트
 * 생성 날짜: 2024-10-24
 * 생성자: 이원찬
 * 설명: 길이가 긴 텍스트를 입력할 때 자동으로 높이가 늘어나는 텍스트 에어리어 컴포넌트
 * 상황: 길이가 긴 텍스트를 입력할 때 사용자가 텍스트 에어리어의 높이를 조절할 필요 없이 자동으로 높이가 늘어나는 기능이 필요할 때 사용
 */
import { useCallback, useEffect } from 'react';

const AutoResizeTextArea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(function AutoResizeTextArea(
  { className, ...props }, //
  ref?
) {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const tempRef = useRef<HTMLDivElement>(null);

  const setRef = useCallback(
    (el: HTMLTextAreaElement | null) => {
      if (typeof ref === 'function') {
        ref(el);
      } else if (ref) {
        ref.current = el;
      }
      textAreaRef.current = el;
    },
    [ref]
  );

  useEffect(() => {
    const textArea = textAreaRef.current;
    const temp = tempRef.current;
    if (!textArea || !temp) return;

    const resize = () => {
      temp.style.height = textArea.style.height;

      textArea.style.height = 'auto';
      textArea.style.height = textArea.scrollHeight + 'px';

      temp.style.height = '0px';
    };

    textArea.addEventListener('input', resize);

    return () => textArea.removeEventListener('input', resize);
  }, []);

  return (
    <>
      <textarea className={`overflow-hidden resize-none ${className}`} {...props} ref={setRef} />
      <div ref={tempRef} />
    </>
  );
});

export default AutoResizeTextArea;
