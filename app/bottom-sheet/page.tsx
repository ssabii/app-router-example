'use client';

import BottomSheet from "@/components/BottomSheet";
import { useState } from "react";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <button
        onClick={() => setIsOpen(true)}
        className={`
          rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors
          hover:bg-blue-600
        `}
      >
        바텀 시트 열기
      </button>

      <BottomSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div className="space-y-4">
          <h2 className="text-xl font-bold">바텀 시트 제목</h2>
          <p className="text-gray-600">
            이것은 바텀 시트의 내용입니다. 원하는 컨텐츠를 자유롭게 넣을 수 있습니다.
          </p>
          <button
            onClick={() => setIsOpen(false)}
            className={`
              w-full rounded-lg bg-gray-200 px-4 py-2 text-gray-800 transition-colors
              hover:bg-gray-300
            `}
          >
            닫기
          </button>
        </div>
      </BottomSheet>
    </main>
  );
}