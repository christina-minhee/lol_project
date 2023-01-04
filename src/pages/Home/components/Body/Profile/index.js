import styles from "./index.module.sass";

const Profile = ({ summonerData }) => {
  const { previousTiers } = summonerData;
  return (
    <div className={styles.container}>
      <div className={styles.medals}>
        {previousTiers &&
          previousTiers.map((tier, index) => (
            <PrevTier key={index} tier={tier} />
          ))}
      </div>
      <div className={styles.content}>
        <img
          className={styles.img_border}
          src={summonerData.profileBorderImageUrl}
          alt="user_profle_img_border"
        />
        <div className={styles.img_container}>
          <img src={summonerData.profileImageUrl} alt="user_profile_img" />
        </div>
        <div className={styles.summoner}>
          <p className={styles.name}>{summonerData.name}</p>
          <span className={styles.title}>
            레더&nbsp;랭킹&nbsp;
            <span className={styles.rank}>{summonerData.ladderRank.rank}</span>
            위&nbsp;(상위&nbsp;{summonerData.ladderRank.rankPercentOfTop}%)
          </span>
        </div>
      </div>
    </div>
  );
};

const PrevTier = ({ tier }) => {
  return (
    <div className={styles.medal}>
      <span>S{tier.season}&nbsp;</span>
      {tier.tier}
    </div>
  );
};

export default Profile;
