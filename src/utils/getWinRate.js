export function getWinRate(wins, losses) {
  if (wins == 0) return 0;
  return Math.round((wins / (wins + losses)) * 100);
}

export function getPercentageByTotal(pick, total) {
  if (pick == 0) return 0;
  return Math.round((pick / total) * 100);
}
