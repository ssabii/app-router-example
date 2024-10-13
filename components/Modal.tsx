'use client';

import { type ElementRef, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';

function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<'dialog'>>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  const onDismiss = () => {
    router.back();
  }

  return createPortal(
    <div className={`absolute inset-0 z-[1000] flex items-center justify-center bg-black/70`}>
      <dialog ref={dialogRef}
        className={`
          relative flex h-auto max-h-[500px] w-4/5 max-w-[500px] items-center justify-center
          rounded-[12px] border-none bg-white p-5 text-4xl font-medium
        `}
        onClose={onDismiss}
      >
        {children}
        <button onClick={onDismiss}
          className={`
            absolute right-[10px] top-[10px] flex size-[48px] cursor-pointer items-center
            justify-center rounded-[15px] border-none bg-transparent text-2xl font-medium
            after:content-['x']
            hover:bg-[#eee]
          `}
        />
      </dialog>
    </div>,
    document.getElementById('modal-root')!
  );
}

export default Modal;