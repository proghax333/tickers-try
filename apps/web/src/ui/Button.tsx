import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {};

export function Button({ children, className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`transition-all focus:ring-4 ring-secondary rounded-lg px-2 py-1 text-slate-800 bg-slate-200 dark:bg-slate-700 dark:text-white ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
