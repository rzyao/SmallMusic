<template>
  <div class="collect">
    <div class="button save-to-list no-save cursor-pointer" @click="showAddToList">
      <svg
        t="1671538773597"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="5872"
        width="32"
        height="32"
      >
        <path
          d="M380.3 336.9l114.1-208.7c0.6-0.1 1-0.3 1.4-0.4-2.9-1.3 4-1.3 0 0 0.4 0.2 1 0.4 1.9 0.6l112.5 208c3.8 7 10.5 11.9 18.3 13.5L877 398.4l-92.4 100.5c-7.8 8.5-6.2 21.9 3.4 28.3 7.6 5.1 17.8 3.9 24.1-2.8l104-111c8.7-9.2 10.7-23 4.8-34.2 0-0.1-0.1-0.2-0.1-0.3-4.3-8.2-12.2-14-21.3-15.7l-241.4-46.3c-7.5-1.4-13.9-6.1-17.6-12.8L515.2 77c-3.9-7.1-11.3-11.6-19.5-11.8h-0.2c-8.4-0.1-16.1 4.5-20.2 11.8l-124 225c-4.4 8-12.2 13.7-21.2 15.4L89.9 363.5c-8.7 1.7-16.4 7.1-20.6 15 0 0 0 0.1-0.1 0.1-6 11.2-3.9 25.1 4.8 34.3l168 179.4c5.6 6 8.3 14.3 7.3 22.5L219 857.1c-1.4 11.2 3.4 22.4 12.7 28.7 0.1 0 0.1 0.1 0.2 0.1 9.1 6.2 21 6.8 30.8 1.8l249.8-125.8c9.5-4.8 13.6-16 9.6-25.8-4.5-10.8-17.1-15.6-27.6-10.5l-232 112.9L294 584.8c0.9-7.5-1.7-15-7.1-20.4L119.7 399.7l242.8-49.6c7.6-1.6 14.1-6.4 17.8-13.2z m539 423.3H791.2V632.1c0-10.9-9.5-19.8-21.2-19.8s-21.2 8.9-21.2 19.8v128.1H620.7c-10.9 0-19.8 9.5-19.8 21.2s8.9 21.2 19.8 21.2h128.1v128.1c0 10.9 9.5 19.8 21.2 19.8s21.2-8.9 21.2-19.8V802.6h128.1c10.9 0 19.8-9.5 19.8-21.2s-8.9-21.2-19.8-21.2z"
          p-id="5873"
        ></path>
      </svg>
    </div>
    <div class="show-list" v-if="addToListVisible">
      <div class="top-name">收藏到歌单</div>
      <div v-if="lists.length > 0">
        <div
          class="list"
          v-for="list in lists"
          :key="list.id"
          @click="saveToList(list.id, list.name)"
        >
          <div class="icon">
            <svg
              t="1670942647731"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3264"
              width="16"
              height="16"
            >
              <path
                d="M880.245529 681.54683c3.287261 74.378806-47.322115 157.716302-134.163616 207.892194-113.067344 65.311744-244.44943 53.824391-293.469361-35.401278-47.141496-85.830035 3.034395-206.483367 116.101739-271.758986 91.356969-52.740678 193.840054-51.765337 255.936783-5.057326V117.907927c0-15.460966 12.643313-28.032032 28.104279-28.032032 15.49709 0 28.032032 12.534942 28.032032 28.032032v561.074117c0 0.86697-0.433485 1.661693-0.541856 2.564786z m-65.022754-43.492997c-39.158147-59.965428-146.517938-61.988359-230.036053-11.667972-83.518115 50.428758-123.579356 146.228948-84.421209 206.194377 39.230395 60.037676 142.869439 61.482626 226.387554 11.126115 83.518115-50.428758 127.300102-145.614845 88.069708-205.65252z m-130.767983-295.709035H179.516986c-15.49709 0-28.104279-12.534942-28.104279-28.032031 0-15.569337 12.643313-28.104279 28.104279-28.104279h504.937806c15.460966 0 28.032032 12.534942 28.032032 28.104279a28.032032 28.032032 0 0 1-28.032032 28.032031z m0-168.300561H179.516986c-15.49709 0-28.104279-12.534942-28.104279-28.032031 0-15.569337 12.643313-28.104279 28.104279-28.104279h504.937806c15.460966 0 28.032032 12.534942 28.032032 28.104279a28.032032 28.032032 0 0 1-28.032032 28.032031zM179.516986 454.509049h308.496843c15.569337 0 28.104279 12.534942 28.104279 28.104279 0 15.460966-12.534942 28.032032-28.104279 28.032031h-308.496843c-15.49709 0-28.104279-12.534942-28.104279-28.032031 0-15.533213 12.643313-28.104279 28.104279-28.104279z m0 168.336684h168.300561c15.460966 0 28.032032 12.534942 28.032031 28.104279a28.032032 28.032032 0 0 1-28.032031 28.032032H179.516986c-15.49709 0-28.104279-12.534942-28.104279-28.032032 0-15.569337 12.643313-28.104279 28.104279-28.104279z"
                fill="#231815"
                p-id="3265"
              ></path>
            </svg>
          </div>
          <div class="text">{{ list.name }}</div>
        </div>
      </div>
      <div class="create-list">
        <div class="icon">
          <svg
            t="1671541556458"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="6985"
            width="32"
            height="32"
          >
            <path
              d="M512 992C246.912 992 32 777.088 32 512 32 246.912 246.912 32 512 32c265.088 0 480 214.912 480 480 0 265.088-214.912 480-480 480z m0-64c229.76 0 416-186.24 416-416S741.76 96 512 96 96 282.24 96 512s186.24 416 416 416z"
              fill="#000000"
              p-id="6986"
            ></path>
            <path
              d="M256 544a32 32 0 0 1 0-64h512a32 32 0 0 1 0 64H256z"
              fill="#000000"
              p-id="6987"
            ></path>
            <path
              d="M480 256a32 32 0 0 1 64 0v512a32 32 0 0 1-64 0V256z"
              fill="#000000"
              p-id="6988"
            ></path>
          </svg>
        </div>
        <div class="text">创建新歌单</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive } from 'vue';
import { useSongStore } from '@/stores/song';
import { db } from '@/untils/dexie/db';
import { ElMessage } from 'element-plus';
const store = useSongStore();
// 最近播放的歌单详情
const { currentSongDetails } = store;
// 控制显示与隐藏
const addToListVisible = ref(false);
// 歌单数组
const lists: any[] = reactive([]);
// 打开函数
async function showAddToList() {
  if (!addToListVisible.value && currentSongDetails.id != '0') {
    addToListVisible.value = true;
    const res = await db.createdList.toArray();
    lists.splice(0, lists.length);
    lists.push(...res);
  }
}
watch(
  () => store.currentId,
  (newId) => {}
);
async function saveToList(id: string, name: string) {
  const song = {
    name: currentSongDetails.name,
    singers: JSON.stringify(currentSongDetails.singers),
    album: currentSongDetails.album,
    listId: id,
  };
  const res = await db.collectSongs.add(song as any);
  if (res > 0) {
    ElMessage({
      message: '收藏歌曲 ' + song.name + ' 到歌单 ' + name + ' 成功',
      type: 'success',
    });
    addToListVisible.value = false;
    const arr = await db.createdList.where('id').equals(id).toArray();
    const songCount = arr[0].songCount + 1;
    // // 更新歌单内的歌曲数量
    const update = await db.collectList.update(id, {
      songCount: songCount,
    });
    console.log(update);
  }
}
async function addMyCollection() {}
</script>
<style lang="less" scoped>
@import './collect.less';
</style>
