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
    <div>
      <MessageTextItem
        text={text}
        onRenderComplete={handleRenderCompleteMessageText}
      />
      {show && chips.map((chip, index) => (
        <button key={index}>{chip}</button>
      ))}
    </div>
  );
}

export default MessageChipItem;