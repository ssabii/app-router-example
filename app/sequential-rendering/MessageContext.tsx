import { createContext, useContext, useState, ReactNode, SetStateAction, Dispatch } from 'react';

interface MessageContextProps {
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
}

const MessageContext = createContext<MessageContextProps | undefined>(undefined);

export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <MessageContext.Provider value={{ currentIndex, setCurrentIndex }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = (): MessageContextProps => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessage must be used within a MessageProvider');
  }
  return context;
};