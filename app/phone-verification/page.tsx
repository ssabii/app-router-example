"use client";

import { KeyboardEvent, useState } from "react";

import Button from "@/components/Button";
import { cn } from "@/utils/cn";

import { useSendCodeForm } from "./useSendCodeForm";
import { useVerifyCodeForm } from "./useVerifyCodeForm";

type Status = "idle" | "sent" | "verifying" | "success";

const inputClassName = `
  block h-12 rounded-lg border border-gray-300 bg-gray-50 px-3 text-base text-gray-900
  focus:border-blue-500 focus:ring-blue-500
  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400
  dark:focus:border-blue-500 dark:focus:ring-blue-500
`;

const errorClassName = `
  text-sm text-red-600
  dark:text-red-400
`;

const statusMessage: Record<Status, string> = {
  idle: "",
  sent: "인증번호를 전송했습니다.",
  verifying: "인증번호를 확인하고 있어요…",
  success: "인증이 완료되었습니다.",
};

export default function Page() {
  const [codeSent, setCodeSent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  const send = useSendCodeForm();

  const verify = useVerifyCodeForm({
    onSuccess: () => {
      setStatus("verifying");
      setTimeout(() => setStatus("success"), 800);
    },
  });

  const handleNameKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    // 한글 조합 중 엔터는 조합 확정이므로 필드 이동에서 제외한다.
    if (e.key !== "Enter" || e.nativeEvent.isComposing) return;
    e.preventDefault();
    const valid = await send.trigger("name");
    if (valid) send.setFocus("phone");
  };

  const resend = () => {
    setStatus("sent");
    verify.setFocus("code");
  };

  const handleSendSubmit = send.handleSubmit(() => {
    setCodeSent(true);
    setStatus("sent");
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-5">
        <div className="space-y-1">
          <h1 className="text-xl font-bold">휴대폰 인증</h1>
          <p
            className={`
              text-sm text-gray-500
              dark:text-gray-400
            `}
          >
            번호 입력 후 인증번호를 전송하고, 마지막 칸에서 엔터를 누르면
            제출됩니다.
          </p>
        </div>

        <form onSubmit={handleSendSubmit} noValidate className="space-y-5">
          <div className="space-y-1.5">
            <label htmlFor="name" className="block text-sm font-medium">
              이름
            </label>
            <input
              {...send.register("name")}
              id="name"
              type="text"
              autoComplete="name"
              enterKeyHint="next"
              required
              placeholder="홍길동"
              aria-invalid={send.formState.errors.name ? "true" : "false"}
              aria-describedby={
                send.formState.errors.name ? "name-error" : undefined
              }
              onKeyDown={handleNameKeyDown}
              className={cn(inputClassName, "w-full")}
            />
            {send.formState.errors.name && (
              <p id="name-error" role="alert" className={errorClassName}>
                {send.formState.errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="phone" className="block text-sm font-medium">
              휴대폰 번호
            </label>
            <input
              {...send.register("phone")}
              id="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              maxLength={11}
              enterKeyHint="send"
              required
              placeholder="01012345678"
              aria-invalid={send.formState.errors.phone ? "true" : "false"}
              aria-describedby={
                send.formState.errors.phone ? "phone-error" : undefined
              }
              className={cn(inputClassName, "w-full")}
            />
            {send.formState.errors.phone && (
              <p id="phone-error" role="alert" className={errorClassName}>
                {send.formState.errors.phone.message}
              </p>
            )}
            {!codeSent && (
              <Button type="submit" className="h-12 w-full">
                인증번호 전송
              </Button>
            )}
          </div>
        </form>

        {codeSent && (
          <form onSubmit={verify.submit} noValidate className="space-y-5">
            <div className="space-y-1.5">
              <label htmlFor="code" className="block text-sm font-medium">
                인증번호
              </label>
              <div className="flex gap-2">
                <input
                  {...verify.register("code")}
                  id="code"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  enterKeyHint="done"
                  required
                  autoFocus
                  placeholder="6자리 숫자"
                  aria-invalid={verify.errors.code ? "true" : "false"}
                  aria-describedby={
                    verify.errors.code ? "code-error" : undefined
                  }
                  className={cn(inputClassName, "min-w-0 flex-1")}
                />
                <Button
                  type="button"
                  onClick={resend}
                  className="h-12 shrink-0"
                >
                  재전송
                </Button>
              </div>
              {verify.errors.code && (
                <p id="code-error" role="alert" className={errorClassName}>
                  {verify.errors.code.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="h-12 w-full"
              disabled={status === "verifying"}
            >
              {status === "verifying" ? "인증 중…" : "인증 완료"}
            </Button>
          </form>
        )}

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
            (status === "sent" || status === "verifying") &&
              `
                text-gray-500
                dark:text-gray-400
              `,
          )}
        >
          {statusMessage[status]}
        </p>
      </div>
    </main>
  );
}
