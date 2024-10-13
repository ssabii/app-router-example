'use client';

import { MessageProvider } from "./MessageContext";
import MessageList from "./MessageList";

export default function Page() {
  return (
    <MessageProvider>
      <MessageList />
    </MessageProvider>
  );
}