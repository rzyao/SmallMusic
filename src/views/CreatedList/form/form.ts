import form from './form.vue';
import { h, render } from 'vue';
const createForm = (props: any) => {
  console.log(props);
  const creating = props.creating;
  if (!document.getElementById('createForm1')) {
    const formVNode = h(form, { creating });
    const container = document.createElement('div');
    render(formVNode, container);
    document.body?.appendChild(container);
    return formVNode;
  }
};

export default createForm;
