import { useCallback, useState } from "react";
import MessageTextItem from "./MessageTextItem";

interface MessageChipItemProps {
  text: string;
  chips: string[];
  onRenderComplete?: () => void;
}

function MessageChipItem({
  text,
  chips,
  onRenderComplete,
}: MessageChipItemProps) {
  const [show, setShow] = useState(false);

  const handleRenderCompleteMessageText = useCallback(() => {
    setShow(true);
    onRenderComplete?.();
  }, [onRenderComplete])

  return (
    <div className="flex flex-col gap-4">
      <MessageTextItem
        text={text}
        onRenderComplete={handleRenderCompleteMessageText}
      />
      {show && (
        <div>
          {chips.map((chip, index) => (
            <span key={index}
              className={`me-2 rounded-full bg-gray-100 px-3 py-2 font-medium text-gray-800`}
            >{chip}</span>
          ))}
        </div>
      )}
    </div>
  );
}

export default MessageChipItem;