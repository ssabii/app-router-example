import { useForm } from "react-hook-form";

export type VerifyCodeValues = {
  code: string;
};

type Options = {
  onSuccess: () => void;
};

/**
 * 2단계: 인증번호 확인 폼.
 * 인증번호를 검증하고, 통과하면 키보드를 내린 뒤 onSuccess로 최종 처리를 넘긴다.
 */
export function useVerifyCodeForm({ onSuccess }: Options) {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<VerifyCodeValues>();

  const submit = handleSubmit(() => {
    // 마지막 제출: 포커스 해제로 모바일 키보드를 내린다.
    (document.activeElement as HTMLElement | null)?.blur();
    onSuccess();
  });

  return { register, errors, setFocus, submit };
}
