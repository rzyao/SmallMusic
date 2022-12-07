<template>
  <div>
    <div class="avatar-box"><Avatar></Avatar></div>
    <navigate :menuData="menuData.children"></navigate>
  </div>
</template>
<script lang="ts">
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import { filterRouters, generateMenus } from '@/untils/router/getMenuData';
import navigate from '@/layout/sider/navigate.vue';
import Avatar from '@/layout/sider/avatar/index.vue';
export default {
  name: 'LocalList',
  components: { navigate, Avatar },
  data() {},
  setup() {
    const router = useRouter();
    const routes = router.getRoutes();
    console.log(routes);

    const data = filterRouters(routes);
    console.log(data);

    const roustes = computed(() => {
      const filterRoutes = filterRouters(router.getRoutes());
      return generateMenus(filterRoutes);
    });
    console.log(roustes.value);
    const menuData = roustes.value[0];
    return {
      menuData,
    };
  },
};
</script>
<style lang="less" scoped>
.avatar-box {
  height: 160px;
}
</style>
