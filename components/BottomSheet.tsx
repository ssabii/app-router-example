'use client';

import { cn } from '@/utils/cn';
import { useEffect, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

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
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useLayoutEffect(() => {
    if (isOpen) {
      setMounted(true);
      // 마운트 직후 애니메이션 시작
      requestAnimationFrame(() => {
        setIsAnimating(true);
      });
    } else {
      setIsAnimating(false);
      // 애니메이션 완료 후 언마운트
      const timer = setTimeout(() => {
        setMounted(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen]);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <div
      aria-hidden={!isOpen}
      className={cn(
        "fixed inset-0 z-50 transition-opacity duration-300",
        {
          'opacity-100': isAnimating,
          'opacity-0': !isAnimating,
        }
      )}
    >
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 transition-opacity duration-300',
          {
            'opacity-100': isAnimating,
            'opacity-0': !isAnimating,
          }
        )}
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div
        className={cn(
          'fixed inset-x-0 bottom-0 rounded-t-2xl bg-white',
          'transform transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]',
          {
            'translate-y-0': isAnimating,
            'translate-y-full': !isAnimating,
          }
        )}
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
    </div>,
    document.body
  );
}