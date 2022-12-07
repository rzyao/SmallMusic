<template>
  <div class="sider-menus" v-for="item in menuData" :key="item.name">
    <div
      class="sider-menu"
      @click.stop="change(item)"
      :class="index == item.name ? 'overstriking' : ''"
    >
      <router-link :to="item.path">
        <div class="sider-menu-name">{{ item.meta.title }}</div>
      </router-link>
      <div>
        <navigate v-show="selected == item.name" :menuData="item.children"></navigate>
      </div>
    </div>
  </div>
</template>
<script lang="ts" scoped>
export default {
  name: 'navigate',
  data() {
    return {
      selected: '',
      index: 'Home',
    };
  },
  props: ['menuData'],
  setup(props) {
    console.log(props);
    return {};
  },
  methods: {
    change(item: any) {
      this.index = item.name;
      if (item.children) {
        if (this.selected == item.name) {
          this.selected = '';
        } else {
          this.selected = item.name;
        }
      }
    },
  },
};
</script>
<style lang="less" scoped>
@import '@/layout/sider/navigate.less';
</style>
