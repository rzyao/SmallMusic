<template>
  <div class="avatar">
    <img class="img" src="@/assets/avatar.webp" alt="" />
    <div class="username">小趴菜</div>
    <div class="description-box"></div>
  </div>
</template>
<script lang="ts">
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
export default {
  name: 'Avatar',
  components: {},
  data() {},
  setup() {
    const router = useRouter();
    const routes = router.getRoutes();
    console.log(routes);

    const data = {
      username: '小趴菜',
      description:
        '你要多学点东西，你要多看会书，你要多跑些步，时间慢慢流，你想有一个更好的未来，那么从现在开始，你要就好好努力。',
    };
    createDom();
    function createDom() {
      const d = document.createElement('div');
      d.innerHTML = data.description;
      d.style.setProperty('white-space', 'nowrap;');
      d.style.setProperty('display', 'inline-block;');
      document.body.appendChild(d);
      const width = d.clientWidth;
      document.body.removeChild(d);
      const div = document.createElement('div');
      div.setAttribute('class', 'description');
      div.innerHTML = data.description;
      onMounted(() => {
        document.querySelector('.description-box')?.appendChild(div);
        move(width);
      });
    }
    function move(width: number) {
      const element = document.querySelector('.description-box') as HTMLElement;
      // @totalWidth  .description-box的宽度
      const totalWidth = element.offsetWidth;
      console.log(typeof totalWidth);
      if (width < totalWidth) return;
      let str = String(width / 40);
      let time = parseInt(str) + 's';
      const avatar = document.getElementsByClassName('avatar')[0] as HTMLElement;
      avatar.style.setProperty('--time', time);
      let w = width - totalWidth;
      avatar.style.setProperty('--totalWidth', '-' + w + 'px');
      avatar.style.setProperty('--begin', totalWidth + 'px');
      console.log('over');
    }
    return {
      data,
    };
  },
};
</script>
<style lang="less">
.avatar {
  --time: 0;
  --totalWidth: 0;
  --begin: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .description-box {
    position: relative;
    width: 100%;
    overflow: hidden;
  }
  .description {
    position: relative;
    top: 0;
    white-space: nowrap;
    animation: moveto var(--time) linear infinite;
  }
  @keyframes moveto {
    from {
      left: var(--begin);
    }

    to {
      left: var(--totalWidth);
    }
  }
}
</style>
