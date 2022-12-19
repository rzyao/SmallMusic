/* eslint-disable no-undef */
// preload.js
// All the Node.js APIs are available in the preload process.
// 它拥有与Chrome扩展一样的沙盒。
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };
  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
});

const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('electronApi', {
  send: (event) => {
    ipcRenderer.send(event);
  },
  searchSong: (param) => {
    return ipcRenderer.invoke('dialog:search', param);
  },
});
contextBridge.exposeInMainWorld('musicApi', {
  search: (param) => {
    return ipcRenderer.invoke('dialog:search', param);
  },
  getLists: (param) => {
    return ipcRenderer.invoke('dialog:getLists', param);
  },
  getListDetails: (param) => {
    return ipcRenderer.invoke('dialog:getListDetails', param);
  },
  getAllSongs: (param) => {
    return ipcRenderer.invoke('dialog:getAllSongs', param);
  },
  getSongUrl: (param) => {
    return ipcRenderer.invoke('dialog:getSongUrl', param);
  },
  getSongDetails: (param) => {
    return ipcRenderer.invoke('dialog:getSongDetails', param);
  },
  getSongWord: (param) => {
    return ipcRenderer.invoke('dialog:getSongWord', param);
  },
});
