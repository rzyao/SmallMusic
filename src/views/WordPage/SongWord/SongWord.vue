<template>
  <div class="box">
    <div class="word-box no-scroll" id="scroll">
      <div class="empty"></div>
      <div
        class="word"
        :class="selected == index ? 'word-selected' : ''"
        v-for="(item, index) in words"
        :key="index"
        v-html="item.word"
      ></div>
      <div class="empty"></div>
    </div>
    <div class="before"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive, computed } from 'vue';
import { useGetWords, useGetCurrentTime, useGetIndex } from './usefunc';
import { useSongStore } from '@/stores/song';
const store = useSongStore();
const currentTime = useGetCurrentTime();
const words: any[] = reactive([]);
const selected = ref(0);
watch(
  () => selected.value,
  () => {
    console.log('scroll');
    const item = document.getElementsByClassName('word-selected')[0] as HTMLElement;
    const div = document.getElementById('scroll');
    console.log(div?.offsetHeight);
    div?.scrollTo({ top: item.offsetTop - div?.offsetHeight / 2, left: 0, behavior: 'smooth' });
  }
);
watch(
  () => currentTime.value,
  (newValue) => {
    selected.value = useGetIndex(newValue, words);
  }
);
watch(
  () => store.currentId,
  async (newValue) => {
    const res: any = await useGetWords(Number(newValue));
    words.splice(0, words.length);
    words.push(...res);
    document.getElementsByClassName('scroll')[0].scrollTo(0, 0);
  }
);
</script>
<style lang="less" scoped>
.box {
  width: 100%;
  height: 100%;
  position: relative;
}
.word-box {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.before {
  position: absolute;
  content: '';
  height: 10%;
  width: 100%;
  top: 0;
  background-image: linear-gradient(0deg, rgba(228, 227, 227, 0) 0%, rgba(228, 227, 227, 1) 100%);
  // background-color: red;
}
.box::after {
  position: absolute;
  content: '';
  height: 10%;
  width: 100%;
  bottom: 0;
  background-image: linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
  // background-color: red;
}
.no-scroll {
  overflow-y: scroll !important;
  overflow-x: hidden;
}
.no-scroll::-webkit-scrollbar {
  display: none;
}
.empty {
  height: 50%;
}
.word {
  text-align: start;
  height: 36px;
  line-height: 36px;
}
.word-selected {
  font-size: 18px;
  font-weight: 600;
}
</style>
