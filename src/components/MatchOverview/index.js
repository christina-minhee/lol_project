import styles from "./index.module.sass";
import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  findSummary,
  getRating,
  getRatingColor,
  getWinRate,
  getPercentageByTotal,
} from "../../utils";
import MatchList from "../MatchList";
import defaultIcon from "../../images/no_champion.png";
import JungleIcon from "../../images/pos_jungleIcon.png";
import MidIcon from "../../images/pos_midIcon.png";
import SupIcon from "../../images/pos_supIcon.png";
import TopIcon from "../../images/pos_topIcon.png";
import ADCIcon from "../../images/pos_adcIcon.png";

const cn = classNames.bind(styles);

const MatchOverview = ({ summonerName, matchesData }) => {
  const tabList = ["전체", "솔로게임", "자유랭크"];
  const [selectedTab, setSelectedTab] = useState(tabList[0]);
  const [selectedMatchList, setSelectedMatchList] = useState(matchesData.games);

  const soloMatch = matchesData.games.filter(
    (game) => game.gameType === "솔랭"
  );
  const freeMatch = matchesData.games.filter(
    (game) => game.gameType === "자유 5:5 랭크"
  );

  const allSummary = findSummary(matchesData.games);
  const soloSummary = findSummary(soloMatch);
  const freeSummary = findSummary(freeMatch);

  useEffect(() => {
    if (selectedTab === "솔로게임") {
      setSelectedMatchList(soloMatch);
    } else if (selectedTab === "자유랭크") {
      setSelectedMatchList(freeMatch);
    } else {
      setSelectedMatchList(matchesData.games);
    }
  }, [selectedTab]);

  const onClickTab = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <>
      <div className={cn("overview_table")}>
        <div className={cn("tab_row")}>
          {tabList.map((tab, index) => (
            <p
              className={cn(selectedTab === tab && "selected")}
              onClick={() => onClickTab(tab)}
              key={index}
            >
              {tab}
            </p>
          ))}
        </div>
        <div className={cn("table_body")}>
          {matchesData && (
            <>
              <div className={cn("table_section")}>
                <GraphSection
                  summary={
                    (selectedTab === "전체" && allSummary) ||
                    (selectedTab === "솔로게임" && soloSummary) ||
                    (selectedTab === "자유랭크" && freeSummary)
                  }
                />
              </div>
              <div className={cn("table_section")}>
                <ChampionList champions={matchesData.champions} />
              </div>
              <div className={cn("table_section")}>
                <PreferredPosition
                  positions={matchesData.positions}
                  totalgames={matchesData.games.length}
                />
              </div>
            </>
          )}
        </div>
      </div>
      <MatchList summonerName={summonerName} games={selectedMatchList} />
    </>
  );
};

const GraphSection = ({ summary }) => {
  const { deaths, assists, kills, wins, losses } = summary;
  const percentage = getWinRate(wins, losses);
  const rating = getRating(kills, deaths, assists);
  const ratingColor = getRatingColor(rating);
  return (
    <>
      <div className={cn("progress_left")}>
        <p>
          {wins + losses}전 {wins}승 {losses}패
        </p>
        <div className={cn("progressbar_container")}>
          <CircularProgressbar
            strokeWidth={13}
            styles={buildStyles({
              pathColor: "#ee5a52",
              trailColor: "#1f8ecd",
              strokeLinecap: "butt",
            })}
            value={100 - percentage}
          ></CircularProgressbar>
          <span className={cn("percentage_text")}>{percentage}%</span>
        </div>
      </div>
      <div className={cn("progress_right")}>
        <p className={cn("kda")}>
          <span className={cn("text-style-bold")}>{kills}</span> /{" "}
          <span className={cn("text-style-red", "text-style-bold")}>
            {assists}
          </span>{" "}
          / <span className={cn("text-style-bold")}>{deaths}</span>
        </p>
        <p className={cn("rating")}>
          <span className={cn(`${ratingColor}`)}>
            <span className={cn("text-style-bold")}>{rating}</span>:1{" "}
            <span className={cn("text-style-red")}>({percentage}%)</span>
          </span>
        </p>
      </div>
    </>
  );
};

const ChampionList = ({ champions }) => {
  let championsMap = champions;

  while (championsMap.length < 3) {
    championsMap.push(null);
  }

  return (
    <div className={cn("champion_list")}>
      {championsMap &&
        championsMap.map((champion, index) =>
          champion ? (
            <div className={cn("champion_item")} key={index}>
              <div className={cn("champion_img_container")}>
                <img src={champion.imageUrl} />
              </div>
              <div className={cn("champion_details")}>
                <p className={cn("champion_name")}>{champion.name}</p>
                <p className={cn("champion_winrate")}>
                  <span
                    className={cn(
                      "text-style-bold",
                      `${
                        getWinRate(champion.wins, champion.losses) >= 60 &&
                        "text-style-red"
                      }`
                    )}
                  >
                    {getWinRate(champion.wins, champion.losses)}%
                  </span>{" "}
                  ({champion.wins}승 {champion.losses}
                  패) |{" "}
                  <span
                    className={cn(
                      "text-style-bold",
                      `${getRatingColor(
                        getRating(
                          champion.kills,
                          champion.deaths,
                          champion.assists
                        )
                      )}`
                    )}
                  >
                    {getRating(
                      champion.kills,
                      champion.deaths,
                      champion.assists
                    )}{" "}
                    평점
                  </span>
                </p>
              </div>
            </div>
          ) : (
            <div className={cn("champion_item")} key={index}>
              <div className={cn("champion_img_container")}>
                <img src={defaultIcon} />
              </div>
              <div className={cn("champion_details")}>
                <p className={cn("champion_no_info")}>챔피언 정보가 없습니다</p>
              </div>
            </div>
          )
        )}
    </div>
  );
};

const PreferredPosition = ({ positions, totalgames }) => {
  return (
    <div className={cn("preferred_pos")}>
      <p className={cn("preferred_title")}>선호 포지션 (랭크)</p>
      <div className={cn("pos_list")}>
        {positions.map((pos, index) => (
          <div className={cn("pos_item")} key={index}>
            <div className={cn("pos_img_container")}>
              <img
                src={
                  (pos.position === "TOP" && TopIcon) ||
                  (pos.position === "MID" && MidIcon) ||
                  (pos.position === "SUP" && SupIcon) ||
                  (pos.position === "JNG" && JungleIcon) ||
                  (pos.position === "ADC" && ADCIcon)
                }
              />
            </div>
            <div className={cn("pos_details")}>
              <p className={cn("pos_name")}>
                {pos.position === "TOP" && "탑"}
                {pos.position === "MID" && "미드"}
                {pos.position === "SUP" && "서포터"}
                {pos.position === "JNG" && "정글"}
                {pos.position === "ADC" && "바텀"}
              </p>
              {/* TO DO Total percent */}
              <p className={cn("pos_winrate")}>
                <span className={cn("text-style-bold", "text-style-blue")}>
                  {getPercentageByTotal(pos.games, totalgames)}%
                </span>{" "}
                | Win Rate{" "}
                <span className={cn("text-style-bold", "text-style-regular")}>
                  {getWinRate(pos.wins, pos.losses)}%
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchOverview;
