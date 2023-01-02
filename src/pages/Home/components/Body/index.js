import "./index.css";
import Profile from "./Profile";
import WinTable from "./WinTable";
import LeagueCards from "./LeagueCards";
import MatchOverview from "./MatchOverview";
import { useGetPlayerResult, useGetSummonerWinRate } from "../../../../query";
import { useSelector } from "react-redux";

const Body = () => {
  const { summonerName } = useSelector((state) => state.summoner);

  const { data: summonerData } = useGetPlayerResult(summonerName);
  const { data: summonerWinRate } = useGetSummonerWinRate(summonerName);

  return (
    <div className="body_layout">
      {/* TO DO no summoner case */}
      {summonerData && (
        <>
          <Profile summonerData={summonerData} />
          <div className="summoner_board">
            {/* TO DO rank section */}
            <div className="left_section">
              <LeagueCards summonerData={summonerData} />
              <WinTable summonerWinRate={summonerWinRate} />
            </div>
            <div className="right_section">
              <MatchOverview />
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
