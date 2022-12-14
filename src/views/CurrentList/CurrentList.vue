<template>
  <transition name="fade">
    <div class="current-list-box" v-show="props.show" @click.stop="">
      <div class="list-details">
        <div class="name">当前播放</div>
        <div class="edit">
          <div class="songs-count">总{{ CurrentPlayList.length }}首</div>
          <div class="collect-all cursor-pointer">
            <div class="icon">
              <svg
                t="1670686797993"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="8878"
                width="32"
                height="32"
              >
                <path d="M866 158H158v866h866V158H866z m88 796H228V228h726v726z" p-id="8879"></path>
                <path
                  d="M626 556h197.8v70H626zM358.2 556H556v70H358.2zM556 823.8h70V358.2h-70V626z"
                  p-id="8880"
                ></path>
                <path d="M70 796V70h726v88h70V0H0v866h158v-70z" p-id="8881"></path>
              </svg>
            </div>
            <div class="text">收藏全部</div>
          </div>
          <div class="clear-all cursor-pointer">清空列表</div>
        </div>
      </div>
      <div class="songs-box">
        <div
          class="song cursor-default"
          v-for="(song, index) in CurrentPlayList"
          :key="song.id"
          :class="index % 2 != 0 ? 'background' : ''"
        >
          <div class="playing-icon">
            <div class="icon" v-if="song.id == currentId">
              <svg
                t="1670739569951"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2255"
                width="16"
                height="16"
              >
                <path
                  d="M544 128v768h-64V128h64z m-192 128v512H288V256h64z m384 0v512h-64V256h64zM160 384v256H96v-256h64z m768 0v256h-64v-256h64z"
                  fill="#d81e06"
                  p-id="2256"
                ></path>
              </svg>
            </div>
          </div>
          <div class="song-name">{{ song.name }}</div>
          <div class="singers">
            <div class="singer" v-for="(singer, index) in song.singers" :key="singer.id">
              {{ singer.name }}
              <div class="oblique-line" v-if="index != song.singers.length - 1">/</div>
            </div>
          </div>
          <div class="play-icon">
            <div class="icon cursor-pointer" @click="nextSong(song.id)">
              <svg
                t="1670741384320"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="3237"
                width="32"
                height="32"
              >
                <path
                  d="M772.7 217.7a32.2 32.1 0 1 0 64.4 0 32.2 32.1 0 1 0-64.4 0Z"
                  fill="#dddddd"
                  p-id="3238"
                ></path>
                <path
                  d="M415.8 679.9c5.9 0 11.5-1.6 16.2-4.5l231.1-134.6c10.9-5.2 18.5-16.3 18.5-29.2 0-11.9-6.4-22.3-16-27.8L439.7 352.2c-5.8-6.7-14.4-10.9-23.9-10.9-17.6 0-31.8 14.4-31.8 32.1 0 0.6 0 1.2 0.1 1.8l-0.4 0.2 0.5 269c-0.1 1.1-0.2 2.2-0.2 3.4 0 17.7 14.3 32.1 31.8 32.1z"
                  fill="#dddddd"
                  p-id="3239"
                ></path>
                <path
                  d="M909.8 306.6c-5.4-10.5-16.3-17.8-28.9-17.8-17.8 0-32.2 14.4-32.2 32.1 0 6 1.7 11.7 4.6 16.5l-0.1 0.1c26.9 52.4 42.1 111.8 42.1 174.7 0 211.6-171.6 383.2-383.2 383.2S128.8 723.8 128.8 512.2 300.4 129.1 512 129.1c62.5 0 121.5 15 173.6 41.5l0.2-0.4c4.6 2.6 10 4.1 15.7 4.1 17.8 0 32.2-14.4 32.2-32.1 0-13.1-7.9-24.4-19.3-29.4C653.6 81.9 584.9 64.5 512 64.5 264.7 64.5 64.3 265 64.3 512.2S264.7 959.9 512 959.9s447.7-200.4 447.7-447.7c0-74.1-18-144-49.9-205.6z"
                  fill="#dddddd"
                  p-id="3240"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <button @click="showData">按钮</button>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useSongStore } from '@/stores/song';
import { computed } from 'vue';
const props = defineProps<{
  show: boolean;
}>();
const Store = useSongStore();
const CurrentPlayList = computed(() => Store.CurrentPlayList);
const currentId = computed(() => Store.currentId);
const { playTheSong } = Store;
function nextSong(id: string) {
  console.log('nextSong');
  playTheSong(id);
}
function showData() {
  console.log(CurrentPlayList);
}
</script>
<style lang="less" scoped>
@import './CurrentList.less';
.fade-enter-active,
.fade-leave-active {
  transition: height 1s;
}
.fade-enter-from,
.fade-leave-to {
  height: 0px;
}
.fade-enter-to,
.fade-leave-from {
  height: @middle-height;
}
</style>
