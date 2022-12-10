/* eslint-disable no-undef */
// main.js
// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1024,
    minWidth: 1024,
    height: 670,
    minHeight: 670,
    fullscreenable: true,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
    },
  });
  // 加载 index.html
  mainWindow.loadFile('./dist/index.html');
  // 打开开发工具
  // mainWindow.webContents.openDevTools()

  //接收最小化命令
  ipcMain.on('window-min', function () {
    mainWindow.minimize();
  });
  //接收最大化命令
  ipcMain.on('window-max', function () {
    if (mainWindow.isMaximized()) {
      mainWindow.restore();
    } else {
      mainWindow.maximize();
    }
  });
};
// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
// In this file you can include the rest of your app's specific main process
// code. 也可以拆分成几个文件，然后用 require 导入。

//当收到子渲染进程发来的close消息后关闭window
ipcMain.on('close', () => {
  app.quit();
});

const {
  search,
  personalized,
  playlist_detail,
  playlist_track_all,
  song_url,
  song_detail,
} = require('NeteaseCloudMusicApi');
// 搜索歌曲
async function searchSong(name) {
  try {
    const result = await search({
      keywords: name,
    });
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
  res = await searchSong(data);
  return res;
});
ipcMain.handle('dialog:getLists', async (e, param) => {
  res = await getLists(param);
  return res;
});
ipcMain.handle('dialog:getListDetails', async (e, param) => {
  res = await getListDetails(param);
  return res;
});
ipcMain.handle('dialog:getAllSongs', async (e, param) => {
  res = await getAllSongs(param);
  return res;
});
ipcMain.handle('dialog:getSongUrl', async (e, param) => {
  res = await getSongUrl(param);
  return res;
});
ipcMain.handle('dialog:getSongDetails', async (e, param) => {
  res = await getSongDetails(param);
  return res;
});
