import { ref, reactive } from 'vue';
import { defineStore } from 'pinia';

export const useSongsDetailsStore = defineStore('SongsDetails', () => {
  // 音量
  const name = ref('');
  // 音量调节
  function changeName(str: string) {
    name.value = str;
  }
  // 专辑
  const album = ref('');
  // 专辑
  function changeAlbum(str: string) {
    album.value = str;
  }
  // 歌手
  const list: any[] = [];
  const singers = reactive({ list });
  // 专辑
  function changeSingers(arr: any[]) {
    singers.list = arr;
  }
  return {
    name,
    changeName,
    album,
    changeAlbum,
    singers,
    changeSingers,
  };
});
