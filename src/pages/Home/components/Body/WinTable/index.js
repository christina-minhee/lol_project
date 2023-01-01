// import "./index.css";
import styles from "./index.module.sass";
import { useState } from "react";
import classNames from "classnames/bind";

const cn = classNames.bind(styles);

const WinTable = ({ summonerWinRate }) => {
  const [selected, setSelected] = useState("champion");
  const summonerChampionWinList = summonerWinRate.champions;
  const summonerRecentWinList = summonerWinRate.recentWinRate;

  // TO DO: sort list by Most games
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
          {selected === "champion" ? (
            summonerChampionWinList &&
            summonerChampionWinList.map((champion, index) => (
              <ChampionItem champion={champion} key={index} />
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
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
            {champion.kills}&nbsp;/&nbsp;{champion.deaths}&nbsp;/&nbsp;
            {champion.assists}
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

const getRatingColor = (rating) => {
  let color = "regular";

  if (rating >= 5) {
    color = "orange";
  } else if (rating >= 4) {
    color = "blue";
  } else if (rating >= 3) {
    color = "green";
  }

  return color;
};

export default WinTable;
