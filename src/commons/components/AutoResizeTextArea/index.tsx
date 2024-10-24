import React, { ReactElement, useLayoutEffect, useRef } from 'react';

/** AutoResizeTextArea 컴포넌트
 * 생성 날짜: 2024-10-24
 * 생성자: 이원찬
 * 설명: 길이가 긴 텍스트를 입력할 때 자동으로 높이가 늘어나는 텍스트 에어리어 컴포넌트
 * 상황: 길이가 긴 텍스트를 입력할 때 사용자가 텍스트 에어리어의 높이를 조절할 필요 없이 자동으로 높이가 늘어나는 기능이 필요할 때 사용
 */
function AutoResizeTextArea({
  rows = 1,
  ...props
}: Readonly<React.HTMLProps<HTMLTextAreaElement>>): ReactElement {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    if (!textAreaRef.current) return;

    const cloneNode = textAreaRef.current.cloneNode(true) as HTMLTextAreaElement;

    (textAreaRef.current as Node).parentNode!.appendChild(cloneNode);

    cloneNode.style.height = 'auto';
    textAreaRef.current.style.height = `${cloneNode.scrollHeight}px`;

    (textAreaRef.current as Node).parentNode!.removeChild(cloneNode);
  }, [textAreaRef.current?.value]);

  return (
    <textarea
      rows={rows}
      ref={textAreaRef}
      {...props}
      style={{ overflow: 'hidden', resize: 'none' }}
    />
  );
}

export default React.memo(AutoResizeTextArea);
