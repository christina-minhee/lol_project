import "./index.css";
import Profile from "../../../components/Profile";
import WinTable from "../../../components/WinTable";
import LeagueCards from "../../../components/LeagueCards";
import MatchOverview from "../../../components/MatchOverview";
import {
  useGetPlayerResult,
  useGetSummonerWinRate,
  useGetMatches,
} from "../../../query";
import { useSelector } from "react-redux";

const Body = () => {
  const { summonerName } = useSelector((state) => state.summoner);

  const { isLoading: summonerLoading, data: summonerData } =
    useGetPlayerResult(summonerName);
  const { isLoading: winLoading, data: summonerWinRate } =
    useGetSummonerWinRate(summonerName);
  const { isLoading: matchesLoading, data: matchesData } =
    useGetMatches(summonerName);

  return (
    <div className="body_layout">
      {/* TO DO no summoner case */}
      {!summonerLoading && !winLoading && !matchesLoading ? (
        <>
          <Profile summonerData={summonerData} />
          <div className="summoner_board">
            <div className="left_section">
              <LeagueCards summonerData={summonerData} />
              <WinTable summonerWinRate={summonerWinRate} />
            </div>
            <div className="right_section">
              <MatchOverview
                summonerName={summonerName}
                matchesData={matchesData}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="no_search_body">
          <p className="no_search_message">OP.GG에 소환사를 검색해보세요.</p>
        </div>
      )}
    </div>
  );
};

export default Body;
