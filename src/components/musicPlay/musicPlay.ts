export function conversion(time: number) {
  const minutes = Math.floor(time / 60);
  let second = time % 60;
  second = Math.round(second);
  const total = minutes + ':' + second;
  return total;
}
export function getProgress(currentTime: number, totalTime: number) {
  const result = Math.floor((currentTime / totalTime) * 100);
  return result;
}
