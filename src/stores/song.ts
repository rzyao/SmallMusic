import { ref, reactive } from 'vue';
import { defineStore } from 'pinia';
import type { Song, SongDetails } from '@/stores/type';
import picUrl from '@/assets/default_song_pic.png';
export const useSongStore = defineStore('song', () => {
  // 当前歌曲的播放时间
  const currentTime = ref(0);
  // 改变当前歌曲的播放时间
  function changeCurrentTime(time: number) {
    currentTime.value = time;
  }
  // 新的歌曲url
  const newSongUrl = ref('');
  // 当前正在播放的歌曲id
  const currentId = ref('0');
  // 当前播放模式 1:单曲循环 2:列表循环 3:随机播放
  const playMode = ref(2);
  // 当前播放歌单
  const CurrentPlayList: Song[] = reactive([]);
  // 当前播放歌曲的详情
  const currentSongDetails: SongDetails = reactive({
    id: '0',
    name: '当前无播放歌曲',
    singers: [{ id: 0, name: '未知' }],
    album: '',
    picUrl: picUrl,
  });
  // 请求歌曲详情
  async function getSongDetails(id: any) {
    const ids = String(id);
    const res: any = await window.devApi.getSongDetails(ids);
    if (res.body && res.body.code == 200) {
      const obj: SongDetails = {
        id: res.body.songs[0].id,
        name: res.body.songs[0].name,
        singers: res.body.songs[0].ar,
        album: res.body.songs[0].al.name,
        picUrl: res.body.songs[0].al.picUrl,
      };
      changeCurrentSongDetails(obj);
      return obj;
    }
  }
  // 改变当前播放歌曲的详情
  function changeCurrentSongDetails(obj: SongDetails) {
    currentSongDetails.id = obj.id;
    currentSongDetails.name = obj.name;
    currentSongDetails.singers = obj.singers;
    currentSongDetails.album = obj.album;
    currentSongDetails.picUrl = obj.picUrl;
  }
  // 切歌
  function changeSong(url: any) {
    console.log(url);
    newSongUrl.value = url;
  }

  function changeCurrentId(id: string) {
    currentId.value = id;
  }

  function changeMode(n: number) {
    playMode.value = n;
  }
  // 播放下一首
  async function playNextSong() {
    console.log('播放下一首');
    let index: number = CurrentPlayList.findIndex((item) => item.id == currentId.value);
    index++;
    const id = CurrentPlayList[index].id;
    currentId.value = id;
    const res: any = await playTheSong(id);
    if (!res) {
      playNextSong();
    }
  }
  // 播放上一首
  async function playLastSong() {
    let index: number = CurrentPlayList.findIndex((item) => item.id === currentId.value);
    index--;
    const id = CurrentPlayList[index].id;
    currentId.value = id;
    const res: any = await playTheSong(id);
    if (!res) {
      playLastSong();
    }
  }
  // 播放第一首
  async function playFirstSong() {
    console.log('playFirstSong');
    const id = CurrentPlayList[0].id;
    currentId.value = id;
    const res: any = await playTheSong(id);
    if (!res) {
      playNextSong();
    }
  }
  // 播放指定的歌曲
  async function playTheSong(id: any) {
    console.log('播放指定的歌曲');
    try {
      const res: any = await window.devApi.getSongUrl(Number(id));
      if (res.body && res.body.code == 200) {
        currentId.value = id;
        const url = res.body.data[0].url;
        changeSong(url);
        changeCurrentId(id);
        const song = await getSongDetails(id);
        // 判断当前播放列表是否存在该歌曲,如果不存在则添加到播放列表
        const index = CurrentPlayList.findIndex((item) => item.id == id);
        if (index == -1) {
          addSongToCurrentPlayList(song as Song);
        }
        return true;
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

  // 添加到当前播放歌单
  function addSongToCurrentPlayList(song: Song) {
    const obj: Song = {
      id: song.id,
      name: song.name,
      singers: song.singers,
      album: song.album,
    };
    CurrentPlayList.push(obj);
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
  }
  // 添加整个歌单到当前播放歌单
  function addAllSongToCurrentList(list: Song[]) {
    CurrentPlayList.push(...list);
    if (CurrentPlayList.length == list.length) {
      playFirstSong();
    }
  }
  return {
    newSongUrl,
    currentId,
    changeCurrentId,
    playMode,
    changeMode,
    playNextSong,
    playLastSong,
    playTheSong,
    currentSongDetails,
    changeCurrentSongDetails,
    CurrentPlayList,
    addSongToCurrentPlayList,
    insteadCurrentPlayList,
    addSongToPlayListAndPlay,
    addAllSongToCurrentList,
    currentTime,
    changeCurrentTime,
  };
});
