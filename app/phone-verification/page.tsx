"use client";

import { KeyboardEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/Button";
import { cn } from "@/utils/cn";

type Status = "idle" | "sent" | "verifying" | "success";

type FormValues = {
  name: string;
  phone: string;
  code: string;
};

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
  const {
    register,
    handleSubmit,
    trigger,
    setFocus,
    formState: { errors },
  } = useForm<FormValues>();
  const [codeSent, setCodeSent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  // 인증번호 인풋이 나타나면 자동 포커스
  useEffect(() => {
    if (codeSent) setFocus("code");
  }, [codeSent, setFocus]);

  const sendCode = async () => {
    // 이름·번호가 유효할 때만 전송 (RHF가 인라인 에러 표시 + 포커스)
    if (!(await trigger(["name", "phone"]))) return;
    setCodeSent(true);
    setStatus("sent");
    // mock: 서버로 인증번호 전송 요청
  };

  const resend = () => {
    setStatus("sent");
    setFocus("code");
    // mock: 인증번호 재전송 요청
  };

  // 마지막이 아닌 필드: 엔터로 다음 필드 이동 (한글 조합 중에는 이동하지 않음)
  const focusNextOnEnter = (
    e: KeyboardEvent<HTMLInputElement>,
    next: keyof FormValues,
  ) => {
    if (e.key !== "Enter" || e.nativeEvent.isComposing) return;
    e.preventDefault();
    setFocus(next);
  };

  // 휴대폰 번호 필드: 엔터 → 인증번호 전송(이미 전송했다면 코드 칸으로 이동)
  const handlePhoneKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || e.nativeEvent.isComposing) return;
    e.preventDefault();
    if (codeSent) setFocus("code");
    else sendCode();
  };

  // 유효성 통과 시: 키보드 내림 → mock 검증
  const onValid = () => {
    (document.activeElement as HTMLElement | null)?.blur();
    setStatus("verifying");
    setTimeout(() => setStatus("success"), 800);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <form
        onSubmit={handleSubmit(onValid)}
        noValidate
        className="w-full max-w-sm space-y-5"
      >
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

        <div className="space-y-1.5">
          <label htmlFor="name" className="block text-sm font-medium">
            이름
          </label>
          <input
            {...register("name", { required: "이름을 입력해 주세요." })}
            id="name"
            type="text"
            autoComplete="name"
            enterKeyHint="next"
            required
            placeholder="홍길동"
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "name-error" : undefined}
            onKeyDown={(e) => focusNextOnEnter(e, "phone")}
            className={cn(inputClassName, "w-full")}
          />
          {errors.name && (
            <p id="name-error" role="alert" className={errorClassName}>
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="phone" className="block text-sm font-medium">
            휴대폰 번호
          </label>
          <input
            {...register("phone", {
              required: "휴대폰 번호를 입력해 주세요.",
              pattern: {
                value: /^[0-9]{10,11}$/,
                message: "휴대폰 번호 10~11자리를 숫자만 입력해 주세요.",
              },
            })}
            id="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            maxLength={11}
            enterKeyHint="send"
            required
            placeholder="01012345678"
            aria-invalid={errors.phone ? "true" : "false"}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            onKeyDown={handlePhoneKeyDown}
            className={cn(inputClassName, "w-full")}
          />
          {errors.phone && (
            <p id="phone-error" role="alert" className={errorClassName}>
              {errors.phone.message}
            </p>
          )}
          {!codeSent && (
            <Button type="button" onClick={sendCode} className="h-12 w-full">
              인증번호 전송
            </Button>
          )}
        </div>

        {codeSent && (
          <div className="space-y-1.5">
            <label htmlFor="code" className="block text-sm font-medium">
              인증번호
            </label>
            <div className="flex gap-2">
              <input
                {...register("code", {
                  required: "인증번호를 입력해 주세요.",
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: "인증번호 6자리를 입력해 주세요.",
                  },
                })}
                id="code"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                enterKeyHint="done"
                required
                placeholder="6자리 숫자"
                aria-invalid={errors.code ? "true" : "false"}
                aria-describedby={errors.code ? "code-error" : undefined}
                className={cn(inputClassName, "min-w-0 flex-1")}
              />
              <Button type="button" onClick={resend} className="h-12 shrink-0">
                재전송
              </Button>
            </div>
            {errors.code && (
              <p id="code-error" role="alert" className={errorClassName}>
                {errors.code.message}
              </p>
            )}
          </div>
        )}

        {codeSent && (
          <Button
            type="submit"
            className="h-12 w-full"
            disabled={status === "verifying"}
          >
            {status === "verifying" ? "인증 중…" : "인증 완료"}
          </Button>
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
      </form>
    </main>
  );
}
