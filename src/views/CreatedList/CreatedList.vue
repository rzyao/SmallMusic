<template>
  <div class="create-list-page no-select">
    <div class="page-top">
      <div class="top-pictrue">
        <img :src="imgUrl" alt="轮播图" style="width: 180px; height: 90px" />
      </div>
      <div class="page-details">
        <div class="name">
          <div class="gedan">音乐</div>
          我创建的歌单
        </div>
        <div class="page-details-button">
          <div
            class="button craete-new-list button-max-height cursor-pointer"
            @click="createNewList"
          >
            <div class="triangle"></div>
            <div class="craete-new-text white">创建新歌单</div>
          </div>
          <div class="button share button-max-height cursor-pointer">
            <div class="share-icon">
              <svg
                t="1669995248654"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="8910"
                width="16"
                height="16"
              >
                <path
                  d="M512 939.804444c-57.612929 0-113.570909-11.274343-166.322424-33.616161-50.889697-21.514343-96.504242-52.337778-135.809293-91.539394C170.666667 775.447273 139.843232 729.729293 118.328889 678.839596 96.193939 626.191515 84.816162 570.233535 84.816162 512.620606s11.274343-113.570909 33.616161-166.322424c21.514343-50.889697 52.337778-96.504242 91.539394-135.809293 39.201616-39.201616 84.919596-70.025051 135.809293-91.539394 52.648081-22.238384 108.606061-33.616162 166.322424-33.616162h1.034344l-0.103435 57.923233h-0.930909c-98.676364 0-191.353535 38.374141-261.068282 108.192323-69.818182 69.818182-108.295758 162.495354-108.295758 261.171717s38.374141 191.353535 108.192323 261.068283c69.714747 69.818182 162.495354 108.192323 261.068283 108.192323 98.572929 0 191.250101-38.374141 261.068283-108.088889C842.78303 704.077576 881.260606 611.400404 881.260606 512.827475h57.923232c0 57.612929-11.377778 113.570909-33.616161 166.21899-21.514343 50.889697-52.337778 96.504242-91.539394 135.705858s-84.919596 69.921616-135.705859 91.43596c-52.751515 22.341818-108.606061 33.616162-166.322424 33.616161zM938.149495 352.711111h-57.923232V145.73899H672.530101v-57.923232H938.149495V352.711111z m0 0"
                  p-id="8911"
                ></path>
                <path
                  d="M888.371717 96.012929l40.96 40.96L560.484848 505.806869l-40.96-40.96L888.371717 96.012929z m0 0"
                  p-id="8912"
                ></path>
              </svg>
            </div>
            <div class="share-text">分享</div>
          </div>
          <div class="songs-count">
            <div class="name">歌单数:</div>
            {{ ' ' + String(createdList.length) }}
          </div>
        </div>
      </div>
    </div>
    <div class="page-content">
      <div class="lists scroll">
        <div
          class="list"
          v-for="(item, index) in createdList"
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
          <div class="songCount">歌曲数: {{ item.songCount }}首</div>
          <div class="create-time">创建于: {{ item.createTime }}</div>
        </div>
      </div>
    </div>
    <createform v-model:show="formVisible" @onSuccess="onSuccess"></createform>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { db } from '@/untils/dexie/db';
import createform from './form/form.vue';
import imgUrl from '@/assets/current.jpg';
const formVisible = ref(false);
const createdList: any = reactive([]);
onMounted(() => {
  getList();
});
function createNewList() {
  formVisible.value = true;
}

function handleOk() {}

function toListDetails(id: any) {}
function onSuccess() {
  getList();
}
// 从数据库获取歌单
async function getList() {
  const list = await db.createdList.toArray();
  createdList.splice(0, createdList.length);
  createdList.push(...list);
}
</script>
<style lang="less" scoped>
@import '@/views/CreatedList/CreatedList.less';
</style>
