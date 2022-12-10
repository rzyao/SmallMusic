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
          class="song"
          v-for="(song, index) in CurrentPlayList"
          :key="song.id"
          :class="index % 2 != 0 ? 'background' : ''"
        >
          <div class="playing-icon"></div>
          <div class="song-name">{{ song.name }}</div>
          <div class="singers">
            <div class="singer" v-for="(singer, index) in song.singers" :key="singer.id">
              {{ singer.name }}
              <div class="oblique-line" v-if="index != song.singers.length - 1">/</div>
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
const Store = useSongStore();
const { CurrentPlayList } = Store;
const props = defineProps<{
  show: boolean;
}>();
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
