import { useEffect, useState } from 'react';

interface MessageTextItemProps {
  text: string;
  speed?: number;
  onRenderComplete?: () => void;
}

function MessageTextItem({
  text,
  speed = 100,
  onRenderComplete,
}: MessageTextItemProps) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let currentText = '';
    let index = 0;

    const timer = setInterval(() => {
      currentText += text[index];
      setDisplayedText(currentText);
      index += 1;

      if (index === text.length) {
        onRenderComplete?.();
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, onRenderComplete]);

  return (
    <div className={`
      flex w-full max-w-[320px] rounded-e-xl rounded-es-xl border-gray-200 bg-gray-100 p-4
    `}
    >
      {displayedText}
    </div>
  );
}

export default MessageTextItem;