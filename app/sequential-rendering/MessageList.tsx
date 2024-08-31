import { useEffect } from "react";
import { useMessage } from "./MessageContext";
import MessageItem from "./MessageItem";

function MessageList() {
  const { currentIndex, setCurrentIndex } = useMessage();
  const messages = ['안녕하세요', '반갑습니다', '또 만나요'];

  const handleRenderComplete = () => setCurrentIndex((prev) => prev + 1);

  return (
    <div>
      {messages.map((message, index) => (
        (index <= currentIndex) && (
          <MessageItem key={index} onRenderComplete={handleRenderComplete}>
            {message}
          </MessageItem>
        )
      ))}
    </div>
  );
}

export default MessageList;