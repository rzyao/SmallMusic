import { reactive, watch, computed, ref } from 'vue';
import { useSongStore } from '@/stores/song';
import pinia from '@/stores/store';
const stores = useSongStore(pinia);
export function useGetCurrentTime() {
  const currentTime = computed(() => stores.currentTime);
  return currentTime;
}
// export function useGetCurrentTime() {
//   const currentTime = computed(() => useCoversion(stores.currentTime));
//   return currentTime;
// }
export async function useGetWords(id: number) {
  const result: any[] = [];
  const res: any = await window.devApi.getSongWord(Number(id));
  console.log(res.body.lrc.lyric);
  const reg2 = /]/;
  const reg = /\n/;
  const data = res.body.lrc.lyric.split(reg);
  console.log(data);
  data.forEach((element: string) => {
    const arr = element.split(reg2);
    const time = arr[0]?.replace('[', '');
    const secend = useTimeToSecond(time);
    if (arr[1] == '') {
      arr[1] = '&nbsp;';
    }
    const obj = {
      time: arr[0] + ']',
      word: arr[1],
      secend: secend,
    };
    result.push(obj);
  });
  return result;
}
export function useCoversion(time: number) {
  const minutes = Math.floor(time / 60);
  let min = '00';
  if (minutes < 10 && minutes > 0) {
    min = `0${minutes}`;
  }
  let second = time % 60;
  second = Math.round(second);
  let seconds = '';
  if (second < 10) {
    seconds = `0${second}`;
  } else {
    seconds = `${second}`;
  }
  let ms = time - Math.floor(time);
  ms = Math.round(ms * 100);
  let mss = '';
  if (ms < 10) {
    mss = `0${ms}`;
  } else {
    mss = `${ms}`;
  }
  const total = min + ':' + seconds + '.' + mss;
  return total;
}
// 传入一个数字,遍历数组,找到小于并最接近这个数字的时间,返回索引
export function useGetIndex(time: number, words: any[]) {
  let index = 0;
  words.forEach((element: any, i: number) => {
    if (element.secend && element.secend < time) {
      index = i;
    }
  });
  return index;
}
//分秒毫转化为秒
export function useTimeToSecond(time: string) {
  let result = null;
  const reg = /:/;
  if (time) {
    const arr = time.split(reg);
    console.log(arr);
    if (arr[0]) {
      result = Number(arr[0]) * 60 + Number(arr[1]);
    }
  }
  return result;
}
