/* eslint-disable no-undef */
// main.js
// Modules to control application life and create native browser window
const { ipcMain } = require('electron');
const {
  search,
  personalized,
  playlist_detail,
  playlist_track_all,
  song_url,
  song_detail,
  lyric,
} = require('NeteaseCloudMusicApi');

function defineRequest() {
  async function getSongWord(param) {
    try {
      const result = await lyric({
        id: param,
      });
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  // 搜索歌曲 默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单,
  async function searchSong(param) {
    try {
      console.log(param);
      const result = await search(param);
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  // 获取歌单
  async function getLists(param) {
    try {
      const result = await personalized({
        limit: param,
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  // 获取歌单详情
  async function getListDetails(param) {
    try {
      const result = await playlist_detail({
        id: param,
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  // 获取歌单内所有歌曲
  async function getAllSongs(param) {
    try {
      const result = await playlist_track_all({
        id: param,
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  // 获取歌曲url
  async function getSongUrl(param) {
    try {
      const result = await song_url({
        id: param,
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  // 获取歌曲详情
  async function getSongDetails(param) {
    try {
      const result = await song_detail({
        ids: param,
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  ipcMain.handle('dialog:search', async (e, data) => {
    const res = await searchSong(data);
    return res;
  });
  ipcMain.handle('dialog:getLists', async (e, param) => {
    const res = await getLists(param);
    return res;
  });
  ipcMain.handle('dialog:getListDetails', async (e, param) => {
    const res = await getListDetails(param);
    return res;
  });
  ipcMain.handle('dialog:getAllSongs', async (e, param) => {
    const res = await getAllSongs(param);
    return res;
  });
  ipcMain.handle('dialog:getSongUrl', async (e, param) => {
    const res = await getSongUrl(param);
    return res;
  });
  ipcMain.handle('dialog:getSongDetails', async (e, param) => {
    const res = await getSongDetails(param);
    return res;
  });
  ipcMain.handle('dialog:getSongWord', async (e, param) => {
    const res = await getSongWord(param);
    return res;
  });
}
module.exports = { defineRequest };
