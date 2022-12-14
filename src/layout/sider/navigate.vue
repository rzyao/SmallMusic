<template>
  <div class="sider-menus" v-for="item in menuData" :key="item.name">
    <div
      class="sider-menu"
      @click.stop="change(item)"
      :class="$route.path.indexOf(item.name) > -1 ? 'overstriking' : ''"
    >
      <router-link :to="item.path">
        <div class="sider-menu-name">{{ item.meta.title }}</div>
      </router-link>
      <div v-show="selected == item.name">
        <navigate :menuData="item.children"></navigate>
      </div>
    </div>
  </div>
</template>
<script lang="ts" scoped>
import { ref } from 'vue';
export default {
  name: 'navigate',
  props: ['menuData'],
  setup() {
    const selected = ref('');
    const index = ref('Home');
    function change(item: any) {
      if (item.children) {
        if (selected.value == item.name) {
          selected.value = '';
        } else {
          selected.value = item.name;
        }
      }
    }
    return { selected, index, change };
  },
};
</script>
<style lang="less" scoped>
@import '@/layout/sider/navigate.less';
</style>
