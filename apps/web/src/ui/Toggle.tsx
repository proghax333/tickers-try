import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";

export type ToggleProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {};

export function Toggle({ checked, onChange }: ToggleProps) {
  const toggleRef = React.useRef<HTMLInputElement | null>(null);

  function handleToggle() {
    toggleRef.current?.click();
  }

  return (
    <div className="inline-block">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        ref={toggleRef}
        className="hidden"
      />
      <button
        className="focus:ring-2 rounded-full bg-slate-200 dark:bg-slate-700 p-1 w-14 relative"
        onClick={handleToggle}
      >
        <div
          className={`w-6 h-6 bg-secondary rounded-full relative ${
            checked ? "left-6" : "left-0"
          } transition-all`}
        ></div>
      </button>
    </div>
  );
}
