export function secToMinStringConverter(sec) {
  return `${Math.round(sec / 60)}분 ${sec % 60}초`;
}
