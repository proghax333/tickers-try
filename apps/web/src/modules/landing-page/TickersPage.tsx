import hodlinfo from "@/assets/hodlinfo.png";
import { Button } from "@/ui/Button";
import { Option } from "@/ui/Option";
import { Select } from "@/ui/Select";
import { useTheme } from "@/modules/theme/ThemeContext";
import { Progress } from "@/ui/Progress";
import { TelegramLogo } from "@/ui/icons/TelegramLogo";
import { Toggle } from "@/ui/Toggle";
import React, { ChangeEvent } from "react";
import { useGetTickersQuery } from "@/state/queries/tickers";
import { useTimer } from "react-timer-hook";

function formatNumber(numOrStr: number | string) {
  let number: number;

  if (typeof numOrStr === "string") {
    number = Number(numOrStr);
  } else {
    number = numOrStr;
  }

  return number.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "INR",
  });
}

export function getExpiryTime(inSeconds: number) {
  const time = new Date();
  time.setSeconds(time.getSeconds() + inSeconds);

  return time;
}

export const DEFAULT_COUNTDOWN_MAX = 60;

export type TickersPageProps = {};

export const TickersPage = (): JSX.Element => {
  const { theme, setTheme } = useTheme();
  const [themeToggle, setThemeToggle] = React.useState(theme === "dark");

  function handleThemeChange(e: ChangeEvent<HTMLInputElement>) {
    const checked = e.target.checked;

    setThemeToggle(checked);
    setTheme(checked ? "dark" : "light");
  }

  const {
    isSuccess: isSuccessGetTickers,
    data: tickers,
    refetch: refetchGetTickers,
  } = useGetTickersQuery();

  const timer = useTimer({
    expiryTimestamp: getExpiryTime(DEFAULT_COUNTDOWN_MAX),
    onExpire: onTimerExpire,
  });

  function onTimerExpire() {
    setTimeout(() => {
      refetchGetTickers();

      timer.restart(getExpiryTime(DEFAULT_COUNTDOWN_MAX), true);
    }, 0);
  }

  const timerProgress = (timer.totalSeconds / DEFAULT_COUNTDOWN_MAX) * 100;
  const timerText = `${timer.totalSeconds}`;

  return (
    <div className="min-h-screen bg-light dark:bg-dark font-oswald text-black dark:text-white">
      <div className="flex flex-col md:flex-row md:gap-2">
        <div className="pt-8 flex w-full items-center justify-center">
          <img src={hodlinfo} className="w-5/6 max-w-64" />
        </div>
        <div className="p-2 flex flex-row gap-2 w-full justify-center self-center">
          <Select>
            <Option value="INR">INR</Option>
          </Select>
          <Select>
            <Option value="INR">BTC</Option>
            <Option value="INR">ETH</Option>
            <Option value="INR">USDT</Option>
            <Option value="INR">XRP</Option>
            <Option value="INR">TRX</Option>
            <Option value="INR">DASH</Option>
            <Option value="INR">ZEC</Option>
            <Option value="INR">XEM</Option>
            <Option value="INR">IOST</Option>
            <Option value="INR">WIN</Option>
            <Option value="INR">BTT</Option>
            <Option value="INR">WRX</Option>
          </Select>
          <Button>Buy BTC</Button>
        </div>
        <div className="flex flex-row gap-2 w-full items-center justify-center p-2">
          <Progress value={timerProgress} text={timerText} />
          <Button className="flex items-center text-sm gap-2 bg-teal-500 dark:bg-teal-500 text-white dark:text-white">
            <TelegramLogo className="w-4" />
            <span>Connect Telegram</span>
          </Button>
          <Toggle checked={themeToggle} onChange={handleThemeChange} />
        </div>
      </div>
      <div className="py-2 flex flex-col w-full items-center">
        <div className="flex flex-row gap-4 w-full items-center justify-around max-w-[90%]">
          <div className="flex flex-col items-center">
            <p className="text-red-500 text-sm md:text-4xl">0 %</p>
            <p className="text-slate-500 text-xs md:text-lg">5 Mins</p>
          </div>

          <div className="flex flex-col items-center">
            <p className="text-secondary text-sm md:text-4xl">0.35 %</p>
            <p className="text-xs text-slate-500 md:text-lg">1 Hour</p>
          </div>

          <div className="flex flex-col items-center">
            <p className="text-slate-400 dark:text-slate-500 text-sm md:text-2xl">
              Best Price to Trade
            </p>
            <p className="text-black dark:text-white text-xl md:text-7xl lg:text-8xl">
              ₹ 38,10,773
            </p>
            <p className="text-[10px] text-gray-600 font-extrabold pt-2 md:text-sm md:font-bold">
              Average BTC/INR set price including commission
            </p>
          </div>

          <div className="flex flex-col items-center">
            <p className="text-secondary text-sm md:text-4xl">7.81 %</p>
            <p className="text-xs text-slate-500 md:text-lg">1 Day</p>
          </div>

          <div className="flex flex-col items-center">
            <p className="text-secondary text-sm md:text-4xl">14.47 %</p>
            <p className="text-xs text-slate-500 md:text-lg">7 Days</p>
          </div>
        </div>
      </div>

      {isSuccessGetTickers && (
        <div className="p-2 md:px-8 text-2xl overflow-x-auto w-full">
          <table className="w-full max-w-full border-separate border-spacing-0 border-spacing-y-4 min-w-fit">
            <thead>
              <tr className="text-gray-500 text-xs md:text-lg">
                <th>#</th>
                <th>Name</th>
                <th>Last Traded Price</th>
                <th>Buy / Sell Price</th>
                <th>Volume</th>
                <th>Base Unit</th>
              </tr>
            </thead>
            <tbody>
              {tickers.items.map((item, index) => {
                const rowNumber = index + 1;

                return (
                  <tr
                    key={`price-row-${item.id}`}
                    className="bg-gray-200 dark:bg-[#334]"
                  >
                    <td className="text-center md:py-2 px-2 whitespace-nowrap">
                      {rowNumber}
                    </td>
                    <td className="text-center md:py-2 px-2 whitespace-nowrap">
                      {item.name}
                    </td>
                    <td className="text-center md:py-2 px-2 whitespace-nowrap">
                      {formatNumber(item.last)}
                    </td>
                    <td className="text-center md:py-2 px-2 whitespace-nowrap">
                      {formatNumber(item.buy)} / {formatNumber(item.sell)}
                    </td>
                    <td className="text-center md:py-2 px-2 whitespace-nowrap">
                      {item.volume}
                    </td>
                    <td className="text-center md:py-2 px-2 whitespace-nowrap">
                      {item.base_unit}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
