'use client';

import MessageTextItem from "./MessageTextItem";
import { Message } from "./MessageList";
import MessageChipItem from "./MessageChipItem";

interface MessageItemProps {
  message: Message
  onRenderComplete?: () => void;
}

function MessageItem({
  message,
  onRenderComplete,
}: MessageItemProps) {
  if (message.type === 'text') {
    return (
      <MessageTextItem
        text={message.message}
        onRenderComplete={onRenderComplete}
      />
    );
  }

  if (message.type === 'chip') {
    return (
      <MessageChipItem
        text={message.message}
        chips={message.chips ?? []}
        onRenderComplete={onRenderComplete}
      />
    );
  }

  return null;
}

export default MessageItem;