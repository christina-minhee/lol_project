import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const winListKeys = {
  winlist: (name) => ["winlist", name],
};

const getSummonerWinRateList = async (summonerName) => {
  const { data } = await axios.get(
    `https://codingtest.op.gg/api/summoner/${summonerName}/mostInfo`
  );
  return data;
};

export const useGetSummonerWinRate = (summonerName) => {
  return useQuery(
    winListKeys.winlist(summonerName),
    () => getSummonerWinRateList(summonerName),
    {
      enabled: !!summonerName,
    }
  );
};
