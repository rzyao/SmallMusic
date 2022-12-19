<template>
  <div class="page-box">
    <!-- 创建歌单的表单组件 -->
    <div class="form">
      <!-- 右上关闭按钮 -->
      <div class="close">
        <svg
          t="1671462739709"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2692"
          width="16"
          height="16"
        >
          <path
            d="M952.311261 921.328619 542.892591 510.919389 950.154131 102.671381c8.53028-8.55177 8.53028-22.416546 0-30.967292-8.532327-8.55177-22.360264-8.55177-30.892591 0l-407.262564 408.248008L104.737436 71.704089c-8.53028-8.55177-22.36231-8.55177-30.892591 0-8.529257 8.55177-8.529257 22.416546 0 30.967292l407.262564 408.248008L71.687716 921.328619c-8.529257 8.55177-8.529257 22.416546 0 30.967292 4.26514 4.27435 9.856485 6.41306 15.446807 6.41306 5.590322 0 11.181667-2.13871 15.446807-6.41306l409.41867-410.409231 409.41867 410.409231c4.266164 4.27435 9.855462 6.41306 15.446807 6.41306 5.591345 0 11.17962-2.13871 15.446807-6.41306C960.841541 943.745165 960.841541 929.879366 952.311261 921.328619z"
            fill="#272636"
            p-id="2693"
          ></path>
        </svg>
      </div>
      <!-- 表单名字 -->
      <div class="name">
        <el-input v-model="name" placeholder="请为新歌单取个名字" />
      </div>
      <!-- 是否设置为隐私歌单 -->
      <div class="private">
        <el-radio label="false" size="large" @change="change">Option 1</el-radio>
      </div>
      <!-- 提交按钮 -->
      <div class="submit">
        <el-button type="primary" loading>创建</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { func } from 'vue-types';
const emits = defineEmits(['update:show', 'submit']);
const props = defineProps({
  show: Boolean,
});
const name = ref('');
const isPrivate = ref(false);
function submit() {
  emits('update:show', false);
}
function change() {
  isPrivate.value = !isPrivate.value;
}
</script>
<style lang="less" scoped>
.page-box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  .form {
    width: 500px;
    height: 200px;
    left: calc(50% - 150px);
    top: calc(50% - 50px);
    background-color: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.5);
    position: relative;
    .close {
      position: absolute;
      top: 0;
      right: 0;
      width: 30px;
      height: 30px;
      cursor: pointer;
    }
  }
}
</style>
