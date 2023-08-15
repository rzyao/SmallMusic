import signUp from './index.vue';
import { h, render } from 'vue';

const create = () => {
  if (!document.getElementById('login')) {
    const container = document.createElement('div');
    container.setAttribute('id', 'login');
    const loginVNode = h(signUp);
    render(loginVNode, container);
    document.getElementById('content')?.appendChild(container);
    return loginVNode;
  }
};
const toSignUp = (): void => {
  create();
};
export default toSignUp;
