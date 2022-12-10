import Login from '@/views/login/index.vue';
import { h, render } from 'vue';

const createLogin = () => {
  if (!document.getElementById('login')) {
    const container = document.createElement('div');
    container.setAttribute('id', 'login');
    const loginVNode = h(Login);
    render(loginVNode, container);
    document.getElementById('content')?.appendChild(container);
    return loginVNode;
  }
};
const toLogin = (): void => {
  createLogin();
};
export default toLogin;
