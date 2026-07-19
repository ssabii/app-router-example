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

export function useSendCodeForm() {
  const methods = useForm<SendCodeValues>({
    resolver: zodResolver(sendCodeSchema),
    
  });

  return methods;
}
