import { Fragment, useCallback, useEffect } from "react";
import { useMessage } from "./MessageContext";
import MessageItem from "./MessageItem";

export interface Message {
  type: 'text' | 'chip';
  message: string;
  chips?: string[];
}

function MessageList() {
  const { currentIndex, setCurrentIndex } = useMessage();
  const messages: Message[] = [
    {
      type: 'text',
      message: '안녕하세요',
    },
    {
      type: 'chip',
      message: '좋아하는 메뉴를 선택해주세요.',
      chips: ['짜장면', '짬뽕', '탕수육'],
    },
    {
      type: 'text',
      message: '좋은 선택이에요 추천 메뉴를 보여드릴게요.',
    }
  ];

  const handleRenderComplete = useCallback(() => {
    setCurrentIndex((prev) => prev + 1);
  }, [setCurrentIndex])

  return (
    <div>
      {messages.map((message, index) => (
        <Fragment key={index}>
          {(index <= currentIndex) && (
            <MessageItem
              onRenderComplete={handleRenderComplete}
              message={message}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
}

export default MessageList;