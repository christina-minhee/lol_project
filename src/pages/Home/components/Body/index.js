import "./index.css";
import Profile from "./Profile";
import WinTable from "./WinTable";
import { useGetPlayerResult } from "../../../../query/player";
import { useSelector } from "react-redux";

const Body = () => {
  const { summonerName } = useSelector((state) => state.summoner);

  const { data: summonerData } = useGetPlayerResult(summonerName);

  return (
    <div className="body_layout">
      {/* <div className="body_content"> */}
      {summonerData && (
        <>
          <Profile summonerData={summonerData} />
          <div className="summoner_board">
            {/* TO DO rank setion */}
            <div className="left_section">
              <div className="rank_card">
                <div className="solo_rank_content"></div>
              </div>
              <div className="rank_card">
                <div className="free_rank_content"></div>
              </div>
              <WinTable />
            </div>
            <div className="right_section">
              <div className="overview_table"></div>
              {/* <div className="match_list"> */}
              <div className="match_item"></div>
              {/* </div> */}
            </div>
          </div>
        </>
      )}
      {/* </div> */}
    </div>
  );
};

export default Body;
