import { Fragment, useCallback, useEffect, useState } from "react";
import { useMessage } from "./MessageContext";
import MessageItem from "./MessageItem";
import Button from "@/components/Button";

export interface Message {
  type: 'text' | 'chip';
  message: string;
  chips?: string[];
}

function MessageList() {
  const [messages, setMessages] = useState<Message[]>([
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
      message: '좋은 선택이에요! 맛있는 식사 하세요.',
    }
  ]);
  const { currentIndex, setCurrentIndex } = useMessage();

  const handleRenderComplete = useCallback(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      clearTimeout(timer);
    }, 500);
  }, [setCurrentIndex])

  const handleClickAddMessages = () => {
    const newMessages: Message[] = [{
      type: 'text',
      message: '새로운 메시지입니다.'
    }, {
      type: 'chip',
      message: '새로운 카테고리를 선택해 주세요.',
      chips: ['IT', '디자인', '마케팅'],
    }];

    setMessages((prev) => [
      ...prev,
      ...newMessages
    ]);
  }

  return (
    <div>
      <Button onClick={handleClickAddMessages}>추가</Button>
      <div className="flex flex-col gap-8">
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
    </div>
  );
}

export default MessageList;