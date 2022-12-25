/* eslint-disable no-undef */
// main.js
// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron');
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';
const path = require('path');
const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
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
  console.log('process.argv[2] : ' + process.argv[2]);
  // mainWindow.loadFile(process.argv[2]);
  mainWindow.loadURL(process.argv[2]);
  // 打开开发工具
  // mainWindow.webContents.openDevTools();
  //接收最小化命令
  ipcMain.on('window-min', function () {
    console.log('window-min');
    mainWindow.minimize();
  });
  //接收最大化命令
  ipcMain.on('window-max', function () {
    console.log('window-max');
    if (mainWindow.isMaximized()) {
      mainWindow.restore();
    } else {
      mainWindow.maximize();
    }
  });
  ipcMain.on('window-hide', function () {
    console.log('window-hide');
  });
  // 当窗口隐藏时,发送隐藏消息
  mainWindow.on('hide', () => {
    console.log('hide');
  });
  // 当窗口显示时,发送显示消息
  mainWindow.on('show', () => {
    console.log('show');
  });
};
// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  clearCookies();
  if (process.platform !== 'darwin') app.quit();
});
ipcMain.on('close', () => {
  app.quit();
});
const { defineRequest } = require('./request');
defineRequest();

ipcMain.handle('dialog:openModelWindow', async (e, url) => {
  createModelWindow(url);
  return 'res';
});
const createModelWindow = (url) => {
  console.log(url);
  modelWindow = new BrowserWindow({
    frame: false, //设置无边框
    skipTaskbar: true, //设置不在任务栏显示
    alwaysOnTop: true, //设置窗口置顶
    fullscreenable: false, //禁止全屏
    resizable: false, // 禁止缩放
    parent: mainWindow,
    modal: true,
    webPreferences: {
      preload: path.join(__dirname, './model/model.js'),
      nodeIntegration: false,
    },
  });
  // mainWindow.loadFile(process.argv[2]);
  modelWindow.loadURL(url);
  ipcMain.on('dialog:closeModelWindow', () => {
    modelWindow.close();
  });
};
// ipcMain.on('closeModel', () => {
//   app.quit();
// });
const { session } = require('electron');
function clearCookies() {
  // 查询所有 cookies。删除。
  session.defaultSession.cookies
    .get({})
    .then((cookies) => {
      cookies.forEach((cookie) => {
        let url = '';
        // get prefix, like https://www.
        url += cookie.secure ? 'https://' : 'http://';
        url += cookie.domain?.charAt(0) === '.' ? 'www' : '';
        // append domain and path
        url += cookie.domain;
        url += cookie.path;
        session.defaultSession.cookies.remove(url, cookie.name);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
