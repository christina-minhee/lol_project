export function findSummary(matchList) {
  const res = {
    deaths: 0,
    assists: 0,
    kills: 0,
    wins: 0,
    losses: 0,
  };

  for (let i = 0; i < matchList.length; i++) {
    if (matchList[i].isWin) res.wins += 1;
    else res.losses += 1;

    res.deaths += matchList[i].stats.general.death;
    res.assists += matchList[i].stats.general.assist;
    res.kills += matchList[i].stats.general.kill;
  }
  return res;
}
