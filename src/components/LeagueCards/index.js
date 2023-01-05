import styles from "./index.module.sass";
import unrankIcon from "../../images/unranked_league.png";
import classNames from "classnames/bind";

const cn = classNames.bind(styles);

const LeagueCards = ({ summonerData }) => {
  const { leagues } = summonerData;
  return (
    leagues &&
    leagues.map((league, index) => <LeagueCard key={index} league={league} />)
  );
};

const LeagueCard = ({ league }) => {
  const totalgames = league.losses + league.wins;
  const winrate = Math.round((league.wins / totalgames) * 100);
  return (
    <div className={cn("container")}>
      <div className={cn("content", `${!league.hasResults && "unranked"}`)}>
        <img
          className={cn(
            "leagueIcon",
            `${!league.hasResults && "unrankedIcon"}`
          )}
          src={league.hasResults ? league.tierRank.imageUrl : unrankIcon}
          alt="league_rank-img"
        />
        <div className={cn("content_detail")}>
          <p className={cn("tier_rank_name")}>
            {league.tierRank.name === "솔랭"
              ? "솔로랭크"
              : league.tierRank.name}
          </p>
          {league.hasResults ? (
            // {/* TO DO Positon */}
            <>
              <p className={cn("position")}>
                <span className={cn("bold")}>탑</span> (총 27 게임)
              </p>
              <p className={cn("tier")}>{league.tierRank.tier}</p>
              <p className={cn("win_losses")}>
                <span className={cn("bold")}>{league.tierRank.lp}LP</span>{" "}
                /&nbsp;
                {league.wins}승 {league.losses}패
              </p>
              <span className={cn("winrate")}>승률 {winrate}%</span>
            </>
          ) : (
            <p className={cn("unrank_tier")}>Unranked</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeagueCards;
