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
  width: calc(100% - 17px);
  height: 100%;
}
</style>
