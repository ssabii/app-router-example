'use client';

import { useEffect, useState } from 'react';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function BottomSheet({
  isOpen,
  onClose,
  children
}: BottomSheetProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      const timer = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className={`
          fixed inset-0 bg-black transition-opacity duration-300
          ${isOpen ? 'opacity-50' : `opacity-0`
          }
        `}
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div
        className={`
          fixed inset-x-0 bottom-0 rounded-t-2xl bg-white transition-transform duration-300
          ease-in-out${isOpen ? `translate-y-0` : `translate-y-full`
          }
        `}
      >
        {/* Handle */}
        <div className="flex w-full justify-center pb-2 pt-4">
          <div className="h-1.5 w-12 rounded-full bg-gray-300" />
        </div>

        {/* Content */}
        <div className="px-4 pb-6">
          {children}
        </div>
      </div>
    </div>
  );
}