export function getRating(kill, death, assist) {
  return ((kill + assist) / death).toFixed(2);
}
