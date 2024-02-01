export type OptionProps = {
  children?: JSX.Element | string;
  value?: string;
};

export function Option({ children, value }: OptionProps) {
  return (
    <option value={value} className="w-[12rem]">
      {children}
    </option>
  );
}
