<template>
  <transition name="fade">
    <div class="app" v-show="show">
      <div class="header">
        <WordHeaderVue @onClose="close"></WordHeaderVue>
      </div>
      <div class="content">
        <div class="left">
          <div class="background-pic">
            <div class="img-box">
              <img :src="props.imgUrl" alt="" srcset="" />
            </div>
          </div>
        </div>
        <div class="right">
          <div class="description">
            <div class="name">{{ songDetails.name }}</div>
            <div class="singers-album">
              <div class="singers">歌手: {{ getSingers(songDetails.singers) }}</div>
              <div class="album">专辑: {{ songDetails.album }}</div>
            </div>
          </div>
          <div class="song-word-box">
            <SongWordVue></SongWordVue>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import SongWordVue from './SongWord/SongWord.vue';
import WordHeaderVue from './WordHeader.vue';
import { computed, watch } from 'vue';
import { useSongStore } from '@/stores/song';
const store = useSongStore();
const songDetails = computed(() => store.currentSongDetails);
const props = defineProps({
  isShow: Boolean,
  imgUrl: String,
});
const emit = defineEmits(['update:isShow']);
watch(
  () => props.isShow,
  (n) => {
    console.log(n);
  }
);
const show = computed(() => props.isShow);
function close() {
  emit('update:isShow', false);
}
function getSingers(arr: any) {
  const singers = arr.map((item: any) => item.name).join('/');
  return singers;
}
</script>
<style lang="less" scoped>
@import './WordPage.less';
.app {
  z-index: 5;
}
</style>
