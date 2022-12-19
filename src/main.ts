String.prototype.byteLength = function () {
  let totalLength = 0;
  Array.from(this).map(function (char) {
    if (char.charCodeAt(0) > 255) {
      //字符编码大于255，说明是双字节字符
      totalLength += 2;
    } else {
      totalLength++;
    }
  });
  return totalLength;
};
import MusicApi from '../env.musicapi.development';
window.devApi = window.musicApi;
// if (import.meta.env.DEV) {
//   window.devApi = MusicApi as any;
// } else {
//   window.devApi = window.musicApi;
// }
import { createApp } from 'vue';
import pinia from './stores/store';

import App from './App.vue';
import router from './router';

import './assets/main.css';

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

//递归组件
import navigate from './layout/sider/navigate.vue';

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(Antd);
app.use(ElementPlus);
app.component(navigate as any);

app.mount('#app');
