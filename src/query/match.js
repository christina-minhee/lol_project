import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const matchesKeys = {
  matches: (name) => ["matches", name],
};

const getMatchesInfo = async (summonerName) => {
  const { data } = await axios.get(
    `https://codingtest.op.gg/api/summoner/${summonerName}/matches`
  );
  return data;
};

export const useGetMatches = (summonerName) => {
  return useQuery(
    matchesKeys.matches(summonerName),
    () => getMatchesInfo(summonerName),
    {
      enabled: !!summonerName,
    }
  );
};
