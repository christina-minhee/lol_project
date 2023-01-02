import "./index.css";
import Profile from "./Profile";
import WinTable from "./WinTable";
import LeagueCards from "./LeagueCards";
import MatchOverview from "./MatchOverview";
import {
  useGetPlayerResult,
  useGetSummonerWinRate,
  useGetMatches,
} from "../../../../query";
import { useSelector } from "react-redux";

const Body = () => {
  const { summonerName } = useSelector((state) => state.summoner);

  const { isLoading: summonerLoading, data: summonerData } =
    useGetPlayerResult(summonerName);
  const { isLoading: winLoading, data: summonerWinRate } =
    useGetSummonerWinRate(summonerName);
  const { isLoading: matchesLoading, data: matchesData } =
    useGetMatches(summonerName);

  // console.log(11, summonerName, summonerData, summonerWinRate, matchesData);

  return (
    <div className="body_layout">
      {/* TO DO no summoner case */}
      {!summonerLoading && !winLoading && !matchesLoading && (
        <>
          <Profile summonerData={summonerData} />
          <div className="summoner_board">
            {/* TO DO rank section */}
            <div className="left_section">
              <LeagueCards summonerData={summonerData} />
              <WinTable summonerWinRate={summonerWinRate} />
            </div>
            <div className="right_section">
              <MatchOverview matchesData={matchesData} />
              <div className="match_item"></div>
            </div>
          </div>
        </>
      )}
      {/* </div> */}
    </div>
  );
};

export default Body;
