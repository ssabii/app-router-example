import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const verifyCodeSchema = z.object({
  code: z
    .string()
    .min(1, "인증번호를 입력해 주세요.")
    .regex(/^[0-9]{6}$/, "인증번호 6자리를 입력해 주세요."),
});

export type VerifyCodeValues = z.infer<typeof verifyCodeSchema>;

type Options = {
  onSuccess: () => void;
};

export function useVerifyCodeForm({ onSuccess }: Options) {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<VerifyCodeValues>({
    resolver: zodResolver(verifyCodeSchema),
  });

  const submit = handleSubmit(() => {
    // 포커스 해제로 모바일 키보드를 내린다.
    (document.activeElement as HTMLElement | null)?.blur();
    onSuccess();
  });

  return { register, errors, setFocus, submit };
}
