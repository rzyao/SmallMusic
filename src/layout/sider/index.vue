<template>
  <div class="sider-box">
    <div class="avatar-box"><Avatar></Avatar></div>
    <navigate :menuData="menuData.children"></navigate>
  </div>
</template>
<script lang="ts">
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import { getMenus } from '@/untils/router/getMenuData';
import navigate from '@/layout/sider/navigate.vue';
import Avatar from '@/layout/sider/avatar/index.vue';
export default {
  name: 'LayoutSider',
  components: { navigate, Avatar },
  data() {},
  setup() {
    const router = useRouter();
    const routers = router.getRoutes();
    const result = computed(() => {
      return getMenus(routers);
    });
    const menuData = result.value[0];
    return {
      menuData,
    };
  },
};
</script>
<style lang="less" scoped>
.sider-box {
  border-left: 1px solid rgba(0, 0, 0, 0.1);
}
.avatar-box {
  height: 160px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
