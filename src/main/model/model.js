/* eslint-disable no-undef */
// preload.js
// All the Node.js APIs are available in the preload process.
// 它拥有与Chrome扩展一样的沙盒。
window.addEventListener('DOMContentLoaded', () => {
  injectCSS(css);
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };
  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
});

const { contextBridge, ipcRenderer } = require('electron');
// 返回登录成功的tokenkkkkkkkkkk
contextBridge.exposeInMainWorld('modelApi', {
  getUserInfo: () => ipcRenderer.send('getUserInfo'),
});

function injectCSS(css) {
  const style = document.createElement('style');
  style.textContent = css;
  document.documentElement.appendChild(style);
  const div = document.createElement('div');
  div.innerHTML = ` 
  <div class="title">
      <div id="drag">
          <div class="text-baidu">百度登录</div>
      </div>
      <div id="close">
          <div id="icon" style="-webkit-app-region: no-drag;">
              <svg t="1671731937232" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                  p-id="3007" width="20" height="20">
                  <path
                      d="M548.992 503.744L885.44 167.328a31.968 31.968 0 1 0-45.248-45.248L503.744 458.496 167.328 122.08a31.968 31.968 0 1 0-45.248 45.248l336.416 336.416L122.08 840.16a31.968 31.968 0 1 0 45.248 45.248l336.416-336.416L840.16 885.44a31.968 31.968 0 1 0 45.248-45.248L548.992 503.744z"
                      p-id="3008"></path>
              </svg>
          </div>
      </div>
  </div>
  `;
  div.setAttribute('id', 'inject');
  document.documentElement.appendChild(div);
  div.addEventListener('click', () => {
    console.log('closeModel');
    window.close();
  });
}
const css = `
body {
  padding: 0;
  margin: 0;
}

#inject {
  position: fixed;
  width: 100%;
  height: 100px;
  top: 0;
  left: 0;
  -webkit-app-region: no-drag;
  border-bottom: 1px solid rgba(134, 132, 132, 0.1);
}
.title {
  width: 100%;
  height: 100px;
  white-space: nowrap;
  display: flex;
}
#drag {
  width: calc(100% - 50px);
  height: 100px;
  user-select: none;
  -webkit-app-region: drag;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
.text-baidu {
  font-size: 17px;
  letter-spacing: 2px;
  margin-left: 50px;
}
#close {
  display: inline-flex;
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
}

#icon {
  display: inline-flex;
  width: 20px;
  height: 20px;
}
// 修改百度页样式
body.popup {
  padding: 0;
  margin: 0;
  overflow: hidden;
}
.g-bd {
  margin-top: 100px;
}
.topbar{
  background: 0;
  width: 0;
  height: 0;
  overflow: hidden;
}
.g-bd-wp {
  margin-left: 50px;
}
.scope {
  margin-top: 0;
  margin-left: 0;
  display: inline-flex !important;
  flex-direction: column;
  height: 333px;
  justify-content: center;
}
.scope-from {
  margin-bottom: 50px;
}
.login .title {
  width: 0;
  height: 0;
  overflow: hidden;
}
`;
