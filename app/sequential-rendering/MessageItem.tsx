'use client';

import { PropsWithChildren, ReactNode, useEffect } from "react";

interface MessageItemProps {
  onRenderComplete: () => void;
}

function MessageItem({
  onRenderComplete,
  children
}: PropsWithChildren<MessageItemProps>) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onRenderComplete();
    }, 1000);

    return () => {
      clearTimeout(timeout);
    }
  }, [onRenderComplete])

  return (
    <div>
      {children}
    </div>
  );
}

export default MessageItem;