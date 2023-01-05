import styles from "./index.module.sass";
import classNames from "classnames/bind";
import BlueWardIcon from "../../../../../images/ward_blue.png";
import RedWardIcon from "../../../../../images/ward_red.png";
import { secToMinStringConverter } from "../../../../../utils/secToMinStringConverter";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import itemJson from "../../../../../json/items.json";

const cn = classNames.bind(styles);

const MatchList = ({ games, summonerName }) => {
  return (
    <div className={cn("match_list")}>
      {games.map((game, index) => (
        <MatchItem key={index} game={game} summonerName={summonerName} />
      ))}
    </div>
  );
};

const MatchItem = ({ game, summonerName }) => {
  const {
    stats,
    spells,
    champion,
    peak,
    gameType,
    isWin,
    gameLength,
    needRenew,
    gameId,
    items,
  } = game;
  return (
    <div
      className={cn(
        "match_item",
        `${needRenew ? "redo" : isWin ? "win" : "lose"}`
      )}
    >
      <div className={cn("match_item_container")}>
        <div className={cn("match_rank_info")}>
          <p className={cn("rank_type")}>{gameType}</p>
          {/* TO DO  하루전 한달전 .. 등등*/}
          <p className={cn("time_ago")}>하루전</p>
          <p className={cn("result")}>
            {needRenew ? "다시하기" : isWin ? "승리" : "패배"}
          </p>
          <p>{secToMinStringConverter(gameLength)}</p>
        </div>
        <ChampionInfoSection champion={champion} spells={spells} peak={peak} />
        <KDAInfoSection general={stats.general} />
        <OtherDetailSection level={champion.level} general={stats.general} />
        <ItemSection
          gameId={gameId}
          ward={stats.ward}
          items={items}
          isWin={isWin}
          needRenew={needRenew}
        />
        <TeamMemberList summonerName={summonerName} gameId={gameId} />
      </div>
      <div className={cn("match_item_more")}></div>
    </div>
  );
};

const ChampionInfoSection = ({ champion, spells, peak }) => {
  const championImgUrl = champion.imageUrl;
  const splitStr = championImgUrl.split("/");
  const championName = splitStr[splitStr.length - 1].split(".")[0];
  return (
    <div className={cn("champion_info_section")}>
      <div className={cn("champion_icon_container")}>
        <div className={cn("champion_img_container")}>
          <img src={championImgUrl} alt={"champion-icon"} />
        </div>
        <div className={cn("champion_spell_gallery")}>
          {spells.map((spell, index) => (
            <img
              key={index}
              className={cn("spell_img")}
              src={spell.imageUrl}
              alt={"champion-icon"}
            />
          ))}
        </div>
        <div className={cn("champion_peak_gallery")}>
          {peak.map((peakImg, index) => (
            <img
              key={index}
              className={cn("peak_img")}
              src={peakImg}
              alt={"champion-icon"}
            />
          ))}
        </div>
      </div>
      <div className={cn("champion_name")}>{championName}</div>
    </div>
  );
};

const KDAInfoSection = ({ general }) => {
  const {
    kill,
    death,
    assist,
    kdaString,
    opScoreBadge,
    largestMultiKillString,
  } = general;
  return (
    <div className={cn("kda_info_section")}>
      <p className={cn("kda")}>
        <span className={cn("kills")}>{kill}</span> /{" "}
        <span className={cn("deaths")}>{assist}</span> /{" "}
        <span className={cn("assists")}>{death}</span>
      </p>
      <p className={cn("kda_rating")}>
        <span>{kdaString} </span>
        평점
      </p>
      <div className={cn("badge_list")}>
        {largestMultiKillString && (
          <div className={cn("badge", "multikill_badge")}>
            {largestMultiKillString}
          </div>
        )}
        {opScoreBadge && (
          <div className={cn("badge", "op_badge")}>{opScoreBadge}</div>
        )}
      </div>
    </div>
  );
};

const OtherDetailSection = ({ level, general }) => {
  const { cs, csPerMin, contributionForKillRate } = general;
  return (
    <div className={cn("other_details_section")}>
      <p>레벨 {level}</p>
      <p>
        {cs} ({csPerMin}) CS
      </p>
      <p className={cn("kill_rate")}>킬관여 {contributionForKillRate}</p>
    </div>
  );
};

const ItemSection = ({ gameId, items, isWin, needRenew, ward }) => {
  let itemList = items;
  while (items.length < 8) {
    itemList.push({});
  }
  const parseItemStr = (str) => {
    const str_array = str.split("/");
    return str_array[str_array.length - 1].split(".")[0];
  };

  return (
    <div className={cn("items_section")}>
      <div className={cn("item_container")}>
        <div className={cn("item_gallery")}>
          {itemList.map((item, index) =>
            item.imageUrl ? (
              <div key={index}>
                <img
                  className={cn("item_img")}
                  src={item.imageUrl}
                  alt={"item-icon"}
                  id={`${gameId}_${index}`}
                />
                <ReactTooltip
                  anchorId={`${gameId}_${index}`}
                  place="top"
                  content={`${
                    itemJson.data[parseItemStr(item.imageUrl)].plaintext
                  }`}
                />
              </div>
            ) : (
              <div
                className={cn(
                  "item_img",
                  `${
                    needRenew
                      ? "redo_empty"
                      : isWin
                      ? "win_empty"
                      : "lose_empty"
                  }`
                )}
                key={index}
              />
            )
          )}
        </div>
        <div className={cn("ward")}>
          <img src={!isWin ? RedWardIcon : BlueWardIcon} alt="ward-icon" />
          <span>
            제어 와드 {ward.sightWardsBought + ward.visionWardsBought}
          </span>
        </div>
      </div>
    </div>
  );
};

const TeamMemberList = ({ gameId, summonerName }) => {
  const [teams, setTeams] = useState({});

  const getTeams = () => {
    axios
      .get(
        `https://codingtest.op.gg/api/summoner/${summonerName}/matchDetail/${gameId}`
      )
      .then((res) => {
        setTeams(res.data.teams);
      });
  };

  useEffect(() => {
    getTeams();
  }, []);

  return (
    <div className={cn("members_container")}>
      {teams.length &&
        teams.map((team, index) => (
          <div key={index} className={cn("team")}>
            {team.players.map((member, index) => (
              <div key={index} className={cn("member")}>
                <img src={member.champion.imageUrl} />
                <p>{member.summonerName}</p>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default MatchList;
