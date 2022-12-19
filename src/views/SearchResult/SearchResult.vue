<template>
  <div class="page">
    <div class="content">
      <el-tabs tab-position="top" style="height: 100%" class="demo-tabs" @tab-change="go">
        <el-tab-pane label="歌曲">
          <song :serchText="serchText"></song>
        </el-tab-pane>
        <el-tab-pane label="专辑">
          <album :serchText="serchText"></album>
        </el-tab-pane>
        <el-tab-pane label="歌单">
          <list :serchText="serchText"></list>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import song from './Song/Song.vue';
import album from './Album/Album.vue';
import list from './List/List.vue';
const router = useRoute();
const serchText = String(router.query.serchText);
const activaName = ref(0);
function go(name: any) {
  activaName.value = name;
}
</script>
<style lang="less" scoped>
.page {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
  .content {
    margin-left: 4%;
    width: 96%;
    height: 100%;

    ::v-deep .el-tabs {
      display: flex;
      flex-direction: column;
    }
    ::v-deep .el-tabs__content {
      overflow: visible;
      height: calc(100% - 39px - 15px);
    }
    ::v-deep .el-tab-pane {
      height: 100%;
    }
  }
}
</style>
