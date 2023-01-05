import styles from "./index.module.sass";
import { useState } from "react";
import classNames from "classnames/bind";
import "./index.css";
import { getRatingColor, mergeSortByTotalGames } from "../../utils";

const cn = classNames.bind(styles);

const WinTable = ({ summonerWinRate }) => {
  const [selected, setSelected] = useState("champion");
  const summonerChampionWinList = mergeSortByTotalGames(
    summonerWinRate.champions
  );
  const summonerRecentWinList = mergeSortByTotalGames(
    summonerWinRate.recentWinRate
  );

  return (
    <>
      <div className={cn("win_table")}>
        <div className={cn("tabs")}>
          <div
            className={cn("tab", selected !== "champion" && "inactive")}
            onClick={() => setSelected("champion")}
          >
            챔피언 승률
          </div>
          <div
            className={cn("tab", selected === "champion" && "inactive")}
            onClick={() => setSelected("recent")}
          >
            7일간 랭크 승률
          </div>
        </div>
        <div className={cn("contents")}>
          {/* TO DO 없을때 */}
          {selected === "champion"
            ? summonerChampionWinList &&
              summonerChampionWinList.map((champion, index) => (
                <ChampionItem champion={champion} key={index} />
              ))
            : summonerRecentWinList &&
              summonerRecentWinList.map((championWin, index) => (
                <ChampionWin championWin={championWin} key={index} />
              ))}
        </div>
      </div>
    </>
  );
};

const ChampionWin = ({ championWin }) => {
  const total = championWin.wins + championWin.losses;
  const winrate = Math.round((championWin.wins / total) * 100);
  return (
    <div className={cn("championWin_item")}>
      <div className={cn("championWin_content")}>
        <div className={cn("championWin_img_container")}>
          <img src={championWin.imageUrl} alt="championWin-img" />
        </div>
        <div className={cn("championWin_name_section")}>
          <p>{championWin.name}</p>
        </div>
        <div className={cn("championWin_winrate")}>
          <p className={cn("rate")}>{winrate}%</p>
        </div>
        <WinProgressBar championWin={championWin} winrate={winrate} />
      </div>
    </div>
  );
};

const WinProgressBar = ({ championWin, winrate }) => {
  if (winrate < 30) {
    winrate = 30;
  } else if (winrate > 70) {
    winrate = 70;
  }
  return (
    <div className="progress">
      <div
        className="progress-bar"
        role="progressbar"
        aria-label="Example with label"
        style={{
          width: `${winrate}%`,
          backgroundColor: "#1f8ecd",
        }}
      />
      <span className="progress_win">{championWin.wins}승</span>
      <span className="progress_loss">{championWin.losses}패</span>
    </div>
  );
};

const ChampionItem = ({ champion }) => {
  const winrate = Math.round((champion.wins / champion.games) * 100);
  const rating = (
    (champion.kills + champion.assists) /
    champion.deaths
  ).toFixed(2);

  const rating_color = getRatingColor(rating);

  return (
    <div className={cn("champion_item")}>
      <div className={cn("champion_item_content")}>
        <div className={cn("champion_img_container")}>
          <img src={champion.imageUrl} alt="champion-img" />
        </div>
        <div className={cn("champion_name_section")}>
          <p>{champion.name}</p>
          <span>CS&nbsp;{champion.cs}&nbsp;(2.4)</span>
        </div>
        <div className={cn("champion_rating")}>
          <p className={cn(`${rating_color}`)}>{rating}:1&nbsp;평점</p>
          <span>
            {champion.kills}&nbsp;/&nbsp;{champion.assists}&nbsp;/&nbsp;
            {champion.deaths}
          </span>
        </div>
        <div className={cn("champion_winrate")}>
          <p className={cn("rate", `${winrate >= 60 && "high_winrate"}`)}>
            {winrate}%
          </p>
          <span>{champion.games}게임</span>
        </div>
      </div>
    </div>
  );
};

export default WinTable;
