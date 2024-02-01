import { CircularProgressbar } from "react-circular-progressbar";

export type ProgressProps = {
  progress: number;
  value: number;
};

export function Progress({}: ProgressProps) {
  return (
    // <div className="w-7 h-7 border-[3px] rounded-full border-secondary flex items-center justify-center text-sm text-secondary">
    <div className="w-7 h-">
      <CircularProgressbar
        value={50}
        text="20"
        styles={{
          text: {
            fontSize: "2.5rem",
          },
        }}
      />
    </div>
  );
}
