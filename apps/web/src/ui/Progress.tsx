import { CircularProgressbar } from "react-circular-progressbar";

export type ProgressProps = {
  value: number;
  text: string;
};

export function Progress({ value, text }: ProgressProps) {
  return (
    // <div className="w-7 h-7 border-[3px] rounded-full border-secondary flex items-center justify-center text-sm text-secondary">
    <div className="w-7 h-">
      <CircularProgressbar
        value={value}
        text={text}
        styles={{
          text: {
            fontSize: "2.5rem",
          },
        }}
      />
    </div>
  );
}
