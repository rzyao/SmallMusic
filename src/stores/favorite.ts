import { reactive, ref } from 'vue';
import { defineStore } from 'pinia';
import { db } from '@/untils/dexie/db';
interface Song {
  id: string;
  name: string;
  singers: string;
  album: string;
  resource: string;
  coverImgUrl: string;
}
export const useFavorite = defineStore('favorite', () => {
  // 列表封面
  const coverImgUrl = ref('');
  // 获取列表封面
  function getCoverImgUrl() {
    if (favoriteList.length > 0) {
      coverImgUrl.value = favoriteList[0].coverImgUrl;
    } else {
      coverImgUrl.value = '';
    }
  }
  // 列表详情
  const ListDetails = reactive({
    id: '',
    name: '',
    description: '',
    tags: [],
    playCount: 0,
    shareCount: 0,
  });
  const favoriteList = reactive<Song[]>([]);
  // 改变列表
  function changeFavorite(id: any) {
    const songId = String(id);
    //判断列表是否存在该歌曲
    const index = favoriteList.findIndex((item) => item.id == songId);
    if (index > -1) {
      console.log('存在则移除');
      //存在则移除
      return removeFavorite(songId);
    } else {
      console.log('不存在则添加');
      //不存在则添加
      return addFavorite(songId);
    }
  }
  // 添加歌曲到列表
  async function addFavorite(songId: any) {
    const id = String(songId);
    // 请求获取歌曲详情
    const res: any = await window.musicApi.getSongDetails(id);
    console.log(res);
    if (res.body.code !== 200) {
      return;
    } else {
      const song: Song = {
        id: '',
        name: '',
        singers: '',
        album: '',
        resource: '',
        coverImgUrl: '',
      };
      song.id = res.body.songs[0].id;
      song.name = res.body.songs[0].name;
      song.singers = JSON.stringify(res.body.songs[0].ar);
      song.album = res.body.songs[0].al.name;
      song.resource = '网易云';
      song.coverImgUrl = res.body.songs[0].al.picUrl;
      favoriteList.push(song);
      // 同步添加到数据库
      const result = await db.favorite.add(song);
      console.log(result);
      if (result) {
        console.log('添加成功');
        getFavoriteListFromDB();
      }
      return result;
    }
  }
  // 从列表移除歌曲
  async function removeFavorite(id: string) {
    console.log('从列表移除歌曲');
    console.log(favoriteList);
    console.log(id);
    const index = favoriteList.findIndex((item) => item.id == id);
    if (index > -1) {
      favoriteList.splice(index, 1);
      // 同步从数据库移除
      const res = await syncFavoriteListToDB();
      return res;
    }
  }
  // 从数据库获取列表
  async function getFavoriteListFromDB() {
    const res = await db.favorite.toArray();
    console.log('getFavoriteListFromDB');
    console.log(res);
    // 清空列表
    favoriteList.splice(0, favoriteList.length);
    favoriteList.push(...res);
    getCoverImgUrl();
  }
  // 同步列表到数据库
  async function syncFavoriteListToDB() {
    console.log('清空数据库');
    await db.favorite.clear();
    // 获取reactive的原始对象
    const arr: any = JSON.parse(JSON.stringify(favoriteList));
    console.log(arr);
    const res = await db.favorite.bulkAdd(arr);
    console.log(res);
  }

  return {
    coverImgUrl,
    ListDetails,
    favoriteList,
    addFavorite,
    removeFavorite,
    changeFavorite,
    getFavoriteListFromDB,
  };
});
