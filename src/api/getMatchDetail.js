import axios from "axios";

export async function getMatchDetail(gameId) {
  return axios
    .get(
      `https://codingtest.op.gg/api/summoner/{summonerName}/matchDetail/${gameId}`
    )
    .then((res) => res.json());
}
