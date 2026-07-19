import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const sendCodeSchema = z.object({
  name: z.string().min(1, "이름을 입력해 주세요."),
  phone: z
    .string()
    .min(1, "휴대폰 번호를 입력해 주세요.")
    .regex(/^[0-9]{10,11}$/, "휴대폰 번호 10~11자리를 숫자만 입력해 주세요."),
});

export type SendCodeValues = z.infer<typeof sendCodeSchema>;

type Options = {
  onSuccess: () => void;
};

/**
 * 1단계: 인증번호 전송 폼.
 * zod 스키마로 이름·번호를 검증하고, 통과하면 onSuccess로 다음 단계로 흐름을 넘긴다.
 */
export function useSendCodeForm({ onSuccess }: Options) {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<SendCodeValues>({
    resolver: zodResolver(sendCodeSchema),
  });

  // native 폼 제출 → zod 검증 통과 시에만 실행
  const submit = handleSubmit(() => {
    // mock: 서버로 인증번호 전송 요청
    onSuccess();
  });

  return { register, errors, setFocus, submit };
}
