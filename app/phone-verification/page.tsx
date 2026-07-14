"use client";

import { KeyboardEvent, RefObject, useRef, useState } from "react";

import Button from "@/components/Button";
import { cn } from "@/utils/cn";

type Status = "idle" | "verifying" | "success";

const inputClassName = `
  block h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-3 text-base text-gray-900
  focus:border-blue-500 focus:ring-blue-500
  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400
  dark:focus:border-blue-500 dark:focus:ring-blue-500
`;

export default function Page() {
  const phoneRef = useRef<HTMLInputElement>(null);
  const codeRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  // 마지막이 아닌 필드: 엔터로 다음 필드 이동 (한글 조합 중에는 이동하지 않음)
  const focusNextOnEnter = (
    e: KeyboardEvent<HTMLInputElement>,
    nextRef: RefObject<HTMLInputElement>,
  ) => {
    if (e.key !== "Enter" || e.nativeEvent.isComposing) return;
    e.preventDefault();
    nextRef.current?.focus();
  };

  // 마지막 엔터 / 제출 버튼: native 폼 제출 → 키보드 내림 → mock 검증
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    (document.activeElement as HTMLElement | null)?.blur();
    setStatus("verifying");
    setTimeout(() => setStatus("success"), 800);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-5">
        <div className="space-y-1">
          <h1 className="text-xl font-bold">휴대폰 인증</h1>
          <p
            className={`
              text-sm text-gray-500
              dark:text-gray-400
            `}
          >
            엔터를 누르면 다음 칸으로 이동하고, 마지막 칸에서 엔터를 누르면
            제출됩니다.
          </p>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="name" className="block text-sm font-medium">
            이름
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            enterKeyHint="next"
            required
            placeholder="홍길동"
            onKeyDown={(e) => focusNextOnEnter(e, phoneRef)}
            className={inputClassName}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="phone" className="block text-sm font-medium">
            휴대폰 번호
          </label>
          <input
            ref={phoneRef}
            id="phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            pattern="[0-9]{10,11}"
            maxLength={11}
            enterKeyHint="next"
            required
            placeholder="01012345678"
            onKeyDown={(e) => focusNextOnEnter(e, codeRef)}
            className={inputClassName}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="code" className="block text-sm font-medium">
            인증번호
          </label>
          <input
            ref={codeRef}
            id="code"
            name="code"
            type="number"
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="[0-9]{6}"
            maxLength={6}
            enterKeyHint="done"
            required
            placeholder="6자리 숫자"
            className={inputClassName}
          />
        </div>

        <Button
          type="submit"
          className="h-12 w-full"
          disabled={status === "verifying"}
        >
          {status === "verifying" ? "인증 중…" : "인증 완료"}
        </Button>

        <p
          role="status"
          aria-live="polite"
          className={cn(
            "min-h-5 text-center text-sm",
            status === "success" &&
              `
                text-green-600
                dark:text-green-400
              `,
            status === "verifying" &&
              `
                text-gray-500
                dark:text-gray-400
              `,
          )}
        >
          {status === "verifying" && "인증번호를 확인하고 있어요…"}
          {status === "success" && "인증이 완료되었습니다."}
        </p>
      </form>
    </main>
  );
}
