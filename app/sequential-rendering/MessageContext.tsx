import { createContext, useContext, useState, ReactNode, SetStateAction, Dispatch } from 'react';

interface MessageContextProps {
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
}

const MessageContext = createContext<MessageContextProps | undefined>(undefined);

export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [index, setIndex] = useState(0);

  return (
    <MessageContext.Provider value={{ index, setIndex }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = (): MessageContextProps => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessage must be used within a MessagProvider');
  }
  return context;
};