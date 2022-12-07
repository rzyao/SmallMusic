import { createApp } from 'vue';
import pinia from './stores/store';

import App from './App.vue';
import router from './router';

import './assets/main.css';

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

//递归组件
import navigate from './layout/sider/navigate.vue';

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(Antd);
app.use(navigate as any);

app.mount('#app');
