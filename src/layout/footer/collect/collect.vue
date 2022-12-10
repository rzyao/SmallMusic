<template>
  <div class="collect">
    <div class="button save-to-list no-save cursor-pointer" v-if="!isSave" @click="addMyCollection">
      <svg
        t="1670424626549"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="6274"
        width="32"
        height="32"
      >
        <path
          d="M949.888 457.258667c26.069333-29.824 13.866667-67.52-24.789333-76.309334L681.728 325.546667l-127.786667-214.677334c-20.266667-34.069333-59.925333-34.090667-80.213333 0l-127.786667 214.677334-243.370666 55.381333c-38.442667 8.746667-50.858667 46.506667-24.789334 76.309333l164.394667 188.053334-22.613333 248.917333c-3.584 39.466667 28.458667 62.805333 64.896 47.146667l237.781333-102.037334a21.333333 21.333333 0 0 0-16.810667-39.210666L267.626667 902.186667c-6.698667 2.88-6.229333 3.221333-5.568-4.096l24.277333-267.093334-176.426667-201.813333c-4.757333-5.461333-4.906667-5.034667 2.133334-6.634667l261.205333-59.434666 137.152-230.4c3.733333-6.293333 3.136-6.293333 6.869333 0l137.173334 230.4 261.205333 59.434666c7.125333 1.621333 6.954667 1.088 2.133333 6.613334l-176.426666 201.813333 24.256 267.093333a21.333333 21.333333 0 1 0 42.496-3.84l-22.613334-248.917333 164.394667-188.053333z"
          p-id="6275"
        ></path>
      </svg>
    </div>
    <div class="button save-to-list saved cursor-pointer" v-if="isSave" @click="removeMyCollection">
      <svg
        t="1670424607677"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="6120"
        width="32"
        height="32"
      >
        <path
          d="M284.458667 941.397333c-36.437333 15.637333-68.48-7.68-64.896-47.168l22.613333-248.917333-164.394667-188.053333c-26.069333-29.824-13.653333-67.562667 24.789334-76.309334l243.370666-55.381333 127.786667-214.677333c20.288-34.090667 59.946667-34.069333 80.213333 0l127.786667 214.677333 243.370667 55.381333c38.656 8.789333 50.858667 46.485333 24.789333 76.309334l-164.394667 188.053333 22.741334 249.002667c3.605333 39.509333-28.458667 62.805333-64.896 47.146666l-229.504-98.517333-229.376 98.453333z"
          fill="#000000"
          p-id="6121"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useSongStore } from '@/stores/song';
import { db } from '@/untils/dexie/db';
const store = useSongStore();
const { songsDetails } = store;
const isSave = ref(false);
watch(
  () => store.currentId,
  (newId) => {
    isSave.value = false;
    querySongIsSave(Number(newId));
  }
);
async function querySongIsSave(id: number) {
  const res = await db.songs.where('id').equalsIgnoreCase(String(id)).toArray();
  if (res.length > 0) {
    isSave.value = true;
  }
}
async function removeMyCollection() {
  const id = songsDetails.id;
  const res = await db.songs.where('id').equalsIgnoreCase(id).delete();
  // 返回数字/删除数量
  if (res > 0) {
    console.log('取消收藏成功');
    isSave.value = false;
  }
}
async function addMyCollection() {
  if (songsDetails.id == '0') {
    console.log('当前无歌曲');
    return;
  }
  const obj = {
    id: songsDetails.id,
    name: songsDetails.name,
    singers: JSON.stringify(songsDetails.singers),
    album: songsDetails.album,
  };
  const res = await db.songs.put(obj);
  if (res == obj.id) {
    console.log('收藏成功');
    isSave.value = true;
  }
}
</script>
<style lang="less" scoped>
.collect {
  width: 24px;
  height: 24px;
}
svg {
  width: 24px;
  height: 24px;
  fill: #000000;
}
.save-to-list {
  display: inline-flex;
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
}
</style>
