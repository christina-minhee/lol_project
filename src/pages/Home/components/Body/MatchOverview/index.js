import styles from "./index.module.sass";
import classNames from "classnames/bind";
import { useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import defaultIcon from "../../../../../images/no_champion.png";

const cn = classNames.bind(styles);

const MatchOverview = () => {
  const tabList = ["전체", "솔로게임", "자유랭크"];
  const [selectedTab, setSelectedTab] = useState(tabList[0]);

  const onClickTab = (tab) => {
    setSelectedTab(tab);
  };
  return (
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
        <div className={cn("table_section")}>
          <GraphSection />
        </div>
        <div className={cn("table_section")}>
          <ChampionList />
        </div>
        <div className={cn("table_section")}>
          <PreferredPosition />
        </div>
      </div>
    </div>
  );
};

const GraphSection = () => {
  const percentage = 20;
  return (
    <>
      <div className={cn("progress_left")}>
        <p>20전 11승 9패</p>
        <div className={cn("progressbar_container")}>
          <CircularProgressbar
            strokeWidth={13}
            styles={buildStyles({
              pathColor: "#ee5a52",
              trailColor: "#1f8ecd",
              strokeLinecap: "butt",
            })}
            value={percentage}
          ></CircularProgressbar>
          <span className={cn("percentage_text")}>{percentage}%</span>
        </div>
      </div>
      <div className={cn("progress_right")}>
        <p className={cn("kda")}>35.9/ 15.8/ 14.1</p>
        <p className={cn("rating")}>3.45: 1 (58%)</p>
      </div>
    </>
  );
};

const ChampionList = () => {
  return (
    <div className={cn("champion_list")}>
      <div className={cn("champion_item")}>
        <div className={cn("champion_img_container")}>
          <img src={defaultIcon} />
        </div>
        <div className={cn("champion_details")}>
          <p className={cn("champion_name")}>로블랑</p>
          <p className={cn("champion_winrate")}>48% (7승 3패) | 0.91평점</p>
        </div>
      </div>
      <div className={cn("champion_item")}>
        <div className={cn("champion_img_container")}>
          <img src={defaultIcon} />
        </div>
        <div className={cn("champion_details")}>
          <p className={cn("champion_no_info")}>챔피언 정보가 없습니다</p>
        </div>
      </div>
    </div>
  );
};

const PreferredPosition = () => {
  return (
    <div className={cn("preferred_pos")}>
      <p className={cn("preferred_title")}>선호 포지션 (랭크)</p>
      <div className={cn("pos_list")}>
        <div className={cn("pos_item")}>
          <div className={cn("pos_img_container")}>
            <img src={defaultIcon} />
          </div>
          <div className={cn("pos_details")}>
            <p className={cn("pos_name")}>탑</p>
            <p className={cn("pos_winrate")}>48% | 승률 53%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchOverview;
