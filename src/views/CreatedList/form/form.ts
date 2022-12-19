import form from './form.vue';
import { h, render } from 'vue';
const createForm = (props: any) => {
  const creating = props.creating;
  if (!document.getElementById('createForm')) {
    const formVNode = h('div', [creating ? h('div', { id: 'createForm' }, form) : null]);
    const container = document.createElement('div');
    container.setAttribute('id', 'createForm');
    render(formVNode, container);
    document.body?.appendChild(container);
    return formVNode;
  }
};

export default createForm;
