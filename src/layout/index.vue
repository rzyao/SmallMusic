<template>
  <div id="header">
    <LayoutHeader></LayoutHeader>
  </div>
  <div id="content">
    <MainContent></MainContent>
  </div>
  <div id="sider">
    <LayoutSider></LayoutSider>
  </div>
  <div id="footer">
    <LayoutFooter></LayoutFooter>
  </div>
</template>
<script lang="ts">
import LayoutHeader from '@/layout/header/index.vue';
import LayoutSider from '@/layout/sider/index.vue';
import LayoutFooter from '@/layout/footer/index.vue';
import MainContent from '@/layout/content/index.vue';
import { useFavorite } from '@/stores/favorite';
export default {
  name: 'defaultLayout',
  components: { LayoutHeader, LayoutSider, LayoutFooter, MainContent },
  setup() {
    const store = useFavorite();
    console.log(store);
    store.getFavoriteListFromDB();
    return {};
  },
};
</script>
<style lang="less" scoped>
@header-height: 62px;
@footer-height: 71px;
@middle-height: calc(100vh - @header-height - @footer-height);
@sider-width: 200px;
@middle-top: @header-height;
@middle-bottom: @footer-height;
@content-width: calc(100vw - @sider-width);

#header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: @header-height;
}

#content {
  position: fixed;
  left: 0;
  top: @middle-top;
  bottom: @middle-bottom;
  width: calc(@content-width + 17px);
  overflow-x: hidden;
  overflow-y: scroll;
}

#sider {
  position: fixed;
  right: 0;
  top: @middle-top;
  bottom: @middle-bottom;
  width: @sider-width;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
}

#footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: @footer-height;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
