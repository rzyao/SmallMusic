<template>
  <div class="content-box no-select">
    <div class="content">
      <div class="title-header">我收藏的歌单</div>
      <div class="title">
        <div class="name">歌单</div>
        <div class="song-count">播放数</div>
        <div class="play-count">歌曲数</div>
      </div>
      <div class="lists-box">
        <div class="lists scroll">
          <div
            class="list"
            v-for="(item, index) in collectionList"
            :key="item.id"
            :class="index % 2 == 0 ? 'background' : ''"
            @click="toListDetails(Number(item.id))"
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
            <div class="name">{{ item.name }}</div>
            <div class="playCount">{{ item.playCount }}次</div>
            <div class="songCount">{{ item.songCount }}首</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { db } from '@/untils/dexie/db';
import { useRouter } from 'vue-router';
const router = useRouter();
onMounted(() => {
  queryCollectionList();
});
interface List {
  id: string;
  name: string;
  playCount: string;
  songCount: string;
}
const collectionList: List[] = reactive([]); // 收藏的歌单
const ltstIds: any[] = []; // 歌单id数组,用于发请求

// 获取歌单详情
async function queryCollectionList() {
  const res = await db.collectList.toArray();
  ltstIds.splice(0, ltstIds.length);
  collectionList.splice(0, collectionList.length);
  ltstIds.push(...res);
  ltstIds.forEach(async (item) => {
    const res2: any = await window.musicApi.getListDetails(item.id);
    const result = res2.body.playlist;
    const obj = {
      id: result.id,
      name: result.name,
      playCount: result.playCount,
      songCount: result.trackIds.length,
    };
    collectionList.push(obj);
  });
  console.log(collectionList);
}
function toListDetails(id: number) {
  router.push({
    path: '/ListDetails',
    query: {
      id: id,
    },
  });
}
</script>
<style lang="less" scoped>
@import './Collection.less';
</style>
