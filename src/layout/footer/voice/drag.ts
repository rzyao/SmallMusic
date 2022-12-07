import { useVolumeStore } from '@/stores/volume';
import pinia from '@/stores/store';
import { db } from '@/untils/dexie/db';
const store = useVolumeStore(pinia);
const { changeVolume, changeMute } = store;
export function $el(className: string) {
  const el = document.getElementsByClassName(className)[0] as HTMLElement;
  return el;
}

export function dragEl() {
  // 外层盒子到上边界的距离
  const box_y = $el('rectangular').getBoundingClientRect().y;
  // line到外层盒子的距离
  const line_y = $el('vertical-line').getBoundingClientRect().y;
  // 圆点初始点/顶点y0
  const start_y = box_y + line_y;
  let num = store.volume;
  // 鼠标在按下时 设置class  防止鼠标移动时移出元素后 :hover 元素样式消失
  $el('voice-hover-change').setAttribute('class', 'voice-hover-change on_mouse_down');
  document.onmousemove = (ev) => {
    // 鼠标当前点
    const mouse_y = ev.clientY;
    // 鼠标当前点和y0的距离
    let circle_y = mouse_y - start_y;
    if (circle_y < 0) {
      circle_y = 0;
    }
    if (circle_y > 80) {
      circle_y = 80;
    }
    // y值是从上到下,bottom是从下到上,取反
    circle_y = 80 - circle_y;
    circle_y = parseInt(String(circle_y));
    $el('circle').style.setProperty('bottom', circle_y + 'px');
    $el('voice_progress').style.setProperty('height', circle_y + 'px');
    // 静音
    console.log('circle_y');
    console.log(circle_y);
    if (circle_y == 0) {
      changeMute(true);
    }
    if (circle_y != 0) {
      changeMute(false);
    }
    num = circle_y;
    num = num / 80;
    num = Number(num.toFixed(4));
    changeVolume(num);
  };
  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;
    save(num);
    // 鼠标抬起一秒后  取消样式
    setTimeout(() => {
      $el('voice-hover-change').setAttribute('class', 'voice-hover-change');
    }, 1000);
  };
}
async function save(num: number) {
  const value = String(num);
  const res = await db.options.put({ id: 'volume', value: value });
  console.log('音量保存结果:' + res);
}
