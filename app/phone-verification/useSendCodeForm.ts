import { useForm } from "react-hook-form";

export type SendCodeValues = {
  name: string;
  phone: string;
};

type Options = {
  onSuccess: () => void;
};

/**
 * 1단계: 인증번호 전송 폼.
 * 이름·번호를 검증하고, 통과하면 onSuccess로 다음 단계(인증번호 확인)로 흐름을 넘긴다.
 */
export function useSendCodeForm({ onSuccess }: Options) {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<SendCodeValues>();

  // native 폼 제출 → RHF가 이름·번호 검증 → 통과 시에만 실행
  const submit = handleSubmit(() => {
    // mock: 서버로 인증번호 전송 요청
    onSuccess();
  });

  return { register, errors, setFocus, submit };
}
