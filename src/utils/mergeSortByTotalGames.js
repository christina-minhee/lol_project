function merge(left, right) {
  const res = [];
  while (left.length !== 0 && right.length !== 0) {
    if (left[0].games === right[0].games) {
      left[0].wins > right[0].wins
        ? res.push(left.shift())
        : res.push(right.shift());
    } else {
      left[0].games > right[0].games
        ? res.push(left.shift())
        : res.push(right.shift());
    }
  }
  return [...res, ...left, ...right];
}

export function mergeSortByTotalGames(list) {
  if (list.length === 1) return list;
  const midIndex = Math.floor(list.length / 2);
  const left = list.slice(0, midIndex);
  const right = list.slice(midIndex);

  return merge(mergeSortByTotalGames(left), mergeSortByTotalGames(right));
}
