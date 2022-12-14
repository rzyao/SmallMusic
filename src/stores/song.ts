import { ref, reactive } from 'vue';
import { defineStore } from 'pinia';
import type { Song } from '@/stores/type';
export const useSongStore = defineStore('song', () => {
  // 新的歌曲url
  const newSongUrl = ref('');
  // 切歌
  function changeSong(url: any) {
    newSongUrl.value = url;
  }
  // 当前正在播放的歌曲id
  const currentId = ref('0');
  function changeCurrentId(id: string) {
    currentId.value = id;
  }
  // 当前播放模式 1:单曲循环 2:列表循环 3:随机播放
  const playMode = ref(1);
  function changMode(n: number) {
    playMode.value = n;
  }
  // 播放下一首
  async function playNextSong() {
    console.log('播放下一首');
    let index: number = CurrentPlayList.findIndex((item) => item.id == currentId.value);
    index++;
    const id = CurrentPlayList[index].id;
    currentId.value = id;
    const res: any = await window.devApi.getSongUrl(Number(id));
    if (res && res.body.data[0].url != null) {
      const url = res.body.data[0].url;
      changeSong(url);
      console.log(res.body);
    } else {
      playNextSong();
    }
  }
  // 播放上一首
  async function playLastSong() {
    let index: number = CurrentPlayList.findIndex((item) => item.id === currentId.value);
    index--;
    const id = CurrentPlayList[index].id;
    currentId.value = id;
    const res: any = await window.devApi.getSongUrl(Number(id));
    if (res.body && res.body.code == 200) {
      const url = res.body.data[0].url;
      changeSong(url);
    } else {
      playLastSong;
    }
  }
  // 播放第一首
  async function playFirstSong() {
    console.log('playFirstSong');
    const id = CurrentPlayList[0].id;
    currentId.value = id;
    const res: any = await window.devApi.getSongUrl(Number(id));
    if (res.body && res.body.code == 200) {
      const url = res.body.data[0].url;
      changeSong(url);
    } else {
      playNextSong();
    }
  }
  // 播放指定的歌曲
  async function playTheSong(id: string) {
    console.log('播放指定的歌曲');
    try {
      const res: any = await window.devApi.getSongUrl(Number(id));
      if (res.body && res.body.code == 200) {
        currentId.value = id;
        const url = res.body.data[0].url;
        changeSong(url);
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  // 添加到歌单并播放
  async function addSongToPlayListAndPlay(song: Song) {
    CurrentPlayList.push(song);
    const id = song.id;
    const res: any = await window.devApi.getSongUrl(Number(id));
    if (res.body && res.body.code == 200) {
      currentId.value = id;
      const url = res.body.data[0].url;
      changeSong(url);
    } else {
      playNextSong();
    }
  }
  // 当前歌曲详情
  const songsDetails = reactive({
    id: '0',
    name: '',
    singers: [],
    album: '',
  });
  function changeDetails(obj: { id: string; name: string; singers: []; album: string }) {
    songsDetails.id = obj.id;
    songsDetails.name = obj.name;
    songsDetails.singers = obj.singers;
    songsDetails.album = obj.album;
  }
  // 当前播放歌单
  const CurrentPlayList: Song[] = reactive([]);
  // 添加到当前播放歌单
  function addSongToCurrentPlayList(song: Song) {
    CurrentPlayList.push(song);
    getCurrentPlayListLength();
  }
  // 清空当前播放歌单
  function clearCurrentPlayList() {
    CurrentPlayList.splice(0, CurrentPlayList.length);
  }
  // 替换当前播放歌单
  function insteadCurrentPlayList(list: Song[]) {
    clearCurrentPlayList();
    CurrentPlayList.push(...list);
    playFirstSong();
    getCurrentPlayListLength();
  }
  // 当前播放的歌单中的歌曲数量
  const CurrentPlayListLength = ref(0);
  // 获取当前播放歌单中的歌曲数量
  function getCurrentPlayListLength() {
    CurrentPlayListLength.value = CurrentPlayList.length;
  }
  return {
    newSongUrl,
    changeSong,
    currentId,
    changeCurrentId,
    playMode,
    changMode,
    playNextSong,
    playLastSong,
    playTheSong,
    songsDetails,
    changeDetails,
    CurrentPlayList,
    addSongToCurrentPlayList,
    insteadCurrentPlayList,
    CurrentPlayListLength,
    addSongToPlayListAndPlay,
  };
});
