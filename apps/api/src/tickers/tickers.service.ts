import { Context } from "../common/context";

import { TickerItem } from "@prisma/client";

export const MAX_TICKER_LIMIT = 10;
export const TICKER_REFRESH_INTERVAL = 1000 * 30;

export class TickersService {
  private intervalHandle: NodeJS.Timeout | null;

  constructor(private context: Context) {
    this.intervalHandle = null;
  }

  async getTickers() {
    const { db } = this.context;
    const items = await db.tickerItem.findMany();

    return {
      items,
    };
  }

  enableRefresh() {
    if (this.intervalHandle) {
      clearInterval(this.intervalHandle);
    }

    this.refreshTickersEntries();
    this.intervalHandle = setInterval(() => {
      this.refreshTickersEntries();
    }, TICKER_REFRESH_INTERVAL);
  }

  disableRefresh() {
    if (this.intervalHandle) {
      clearInterval(this.intervalHandle);
      this.intervalHandle = null;
    }
  }

  private async refreshTickersEntries() {
    try {
      const newEntries = await this.fetchTickersFromApi();
      await this.updateTickersEntries(newEntries);
    } catch (e) {
      console.error("Could not refresh tickers", e);
    }
  }

  private async updateTickersEntries(tickersEntries: Omit<TickerItem, "id">[]) {
    const { db } = this.context;

    await db.$transaction([
      db.tickerItem.deleteMany(),
      db.tickerItem.createMany({
        data: tickersEntries,
      }),
    ]);
  }

  private async fetchTickersFromApi(maxTickerLimit = MAX_TICKER_LIMIT) {
    const response = await this.context.fetcher.get<{
      [K: string]: TickerItem;
    }>("https://api.wazirx.com/api/v2/tickers");
    const data = response.data;

    let firstFew: Omit<TickerItem, "id">[] = Array.from(Object.values(data))
      .slice(0, maxTickerLimit)
      .map(({ base_unit, last, volume, sell, buy, name }) => ({
        base_unit,
        last,
        volume,
        sell,
        buy,
        name,
      }));

    return firstFew;
  }
}

export type ITickersService = TickersService;
