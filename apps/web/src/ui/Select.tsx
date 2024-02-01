import { DetailedHTMLProps, SelectHTMLAttributes } from "react";

export type SelectProps = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & {};

export function Select({ children }: SelectProps) {
  return (
    <select className="transition-all focus:ring-4 rounded-lg px-2 py-1 text-slate-800 bg-slate-200 dark:bg-slate-700 dark:text-white">
      {children}
    </select>
  );
}
