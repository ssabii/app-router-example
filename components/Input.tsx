import { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

function Input({
  className,
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={twMerge(`
        block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900
        focus:border-blue-500 focus:ring-blue-500
        dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400
        dark:focus:border-blue-500 dark:focus:ring-blue-500
      `,
        className
      )}
      {...rest}
    />
  );
}

export default Input;