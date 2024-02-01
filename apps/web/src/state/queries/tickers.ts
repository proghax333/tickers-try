import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

type GetTickersQueryResponse = {
  items: {
    id: string;
    base_unit: string;
    last: string;
    volume: string;
    sell: string;
    buy: string;
    name: string;
  }[];
};

export function useGetTickersQuery() {
  return useQuery({
    queryKey: ["tickers"],
    queryFn: async () => {
      const response = await api.get<GetTickersQueryResponse>("/tickers");
      return response.data;
    },
  });
}
