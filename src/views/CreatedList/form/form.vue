<template>
  <div class="model-form" v-if="props.show">
    <Teleport to="body">
      <div class="mask no-select">
        <!-- 创建歌单的表单组件 -->
        <div class="form">
          <!-- 右上关闭按钮 -->
          <div class="close" @click="close">
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
          <div class="text">新建歌单</div>
          <!-- 表单名字 -->
          <div class="name">
            <el-input v-model="name" placeholder="请为新歌单取个名字" />
          </div>
          <!-- 是否设置为隐私歌单 -->
          <div class="private select" @click="change">
            <div class="icon-box" :class="isPrivate ? 'icon-choosed' : ''">
              <div class="icon" v-if="isPrivate">
                <svg
                  t="1671516344407"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="8787"
                  width="16"
                  height="16"
                >
                  <rect id="svg_12" height="1100" width="1100" y="0" x="0" fill="#fa290e" />
                  <path
                    d="m874.05202,245.64909l60.33978,60.33978l-543.05801,543.058l-60.33978,-60.33978l543.05801,-543.058z"
                    fill="#ffffff"
                    p-id="8788"
                    id="svg_1"
                  />
                  <path
                    d="m149.97914,486.985l301.69889,301.6989l-60.33978,60.33978l-301.69889,-301.6989l60.33978,-60.33978z"
                    fill="#ffffff"
                    p-id="8789"
                    id="svg_2"
                  />
                </svg>
              </div>
            </div>
            <div class="private-text no-select">设置为隐私歌单</div>
          </div>
          <!-- 提交按钮 -->
          <div class="submit">
            <div class="button" @click="createList">创 建</div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs } from 'vue';
import { db } from '@/untils/dexie/db';
import { any } from 'vue-types';
import { trim } from 'lodash';
import { ElMessage } from 'element-plus';
const emits = defineEmits(['update:show', 'onSuccess']);
const props = defineProps({
  show: Boolean,
});
const name = ref('');
const isPrivate = ref(false);
const list = reactive({ id: '0', name: '', songCount: 0, createTime: '' });
async function createList() {
  if (trim(name.value) === '') {
    ElMessage({
      message: '歌单不能没有名字哦',
      type: 'warning',
    });
    return;
  }
  //生成随机id
  list.id = Math.random().toString(36).substr(2);
  list.name = name.value;
  list.songCount = 0;
  list.createTime = new Date().toLocaleString();
  const obj = JSON.parse(JSON.stringify(list));
  const res = await db.createdList.add(obj); // 返回的res是id/字符串
  console.log(res);
  emits('onSuccess');
  close();
}
function change() {
  isPrivate.value = !isPrivate.value;
}
function close() {
  emits('update:show', false);
}
</script>
<style lang="less" scoped>
@import './form.less';
</style>
