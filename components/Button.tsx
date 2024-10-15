import { ButtonHTMLAttributes, forwardRef } from "react"
import { twMerge } from "tailwind-merge"

const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(({
  children,
  className,
  ...rest
}, ref) => {
  return (
    <button
      ref={ref}
      className={twMerge(`
        inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-black px-4 py-2
        text-sm font-medium text-white transition-colors
        hover:bg-gray-900
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
        disabled:pointer-events-none disabled:opacity-50
      `,
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
})

Button.displayName = 'Button'

export default Button