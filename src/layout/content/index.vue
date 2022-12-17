<template>
  <div class="main-content"><RouterView /></div>
</template>
<script lang="ts">
export default {
  name: 'MainContent',
  components: {},
  setup() {
    return {};
  },
};
</script>
<style lang="less" scoped>
.main-content {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
