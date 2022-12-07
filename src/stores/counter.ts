import { ref, reactive } from 'vue';
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', () => {
  // 新的歌曲url
  const newSongUrl = ref('');
  // const doubleCount = computed(() => count.value * 2);
  // 切歌
  function changeSong(url: any) {
    newSongUrl.value = url;
  }
  // 当前播放列表
  const currenList: any[] = [];
  const song = reactive({ currenList });
  // 更换播放列表
  function changeCurrenList(list: any[]) {
    console.log('changeCurrenList');
    song.currenList = list;
    playFirstSong();
  }
  // 当前播放歌曲所在列表的下标
  const currentIndex = ref(0);
  // 当前正在播放的歌曲id
  const currentId = ref(0);
  function changeCurrentId(id: number) {
    currentId.value = id;
  }
  // 当前播放模式 1:单曲循环 2:列表循环 3:随机播放
  const playMode = ref(1);
  function changMode(n: number) {
    playMode.value = n;
  }
  // 播放下一首
  async function playNextSong() {
    console.log('playNextSong');
    currentIndex.value++;
    const index: number = currentIndex.value;
    const id = song.currenList[index].id;
    currentId.value = id;
    const res: any = await window.musicApi.getSongUrl(id);
    if (res && res.body.data[0].url != null) {
      const url = res.body.data[0].url;
      changeSong(url);
      console.log(res.body);
    } else {
      playNextSong;
    }
  }
  // 播放上一首
  async function playLastSong() {
    console.log('playLastSong');
    currentIndex.value--;
    const index: number = currentIndex.value;
    const id = song.currenList[index].id;
    currentId.value = id;
    const res: any = await window.musicApi.getSongUrl(id);
    if (res && res.status == 200) {
      const url = res.body.data[0].url;
      changeSong(url);
    } else {
      playLastSong;
    }
  }
  // 播放第一首
  async function playFirstSong() {
    console.log('playFirstSong');
    const id = song.currenList[0].id;
    currentId.value = id;
    const res: any = await window.musicApi.getSongUrl(id);
    console.log('getSongUrl  res');
    console.log(res);
    if (res && res.status == 200) {
      const url = res.body.data[0].url;
      changeSong(url);
    } else {
      playNextSong();
    }
  }
  return {
    newSongUrl,
    changeSong,
    song,
    changeCurrenList,
    currentId,
    changeCurrentId,
    playMode,
    changMode,
    currentIndex,
    playNextSong,
    playLastSong,
  };
});
