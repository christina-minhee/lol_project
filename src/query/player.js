import {useQuery} from "@tanstack/react-query";
import axios from 'axios';

const playerKeys = {
  player: name => ["player", name],
}

const getPlayerInfo = async(summonerName) => {
  const {data} = await axios.get(`https://codingtest.op.gg/api/summoner/${summonerName}`);
  return data.summoner;
}

export const useGetPlayerResult = (summonerName) => {
  return useQuery(playerKeys.player(summonerName), () => getPlayerInfo(summonerName), {
    enabled: !!summonerName
  })
};