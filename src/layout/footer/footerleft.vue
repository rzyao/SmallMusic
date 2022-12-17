<template>
  <div class="footer-left-box">
    <div class="picture" @click="showWord">
      <img :src="picUrl" alt="图片" />
      <div class="open-close-word" v-if="!showWordVue">
        <svg
          t="1671290995825"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2702"
          width="25"
          height="25"
        >
          <path
            d="M199.36 572.768a31.904 31.904 0 0 0 22.624-9.376l294.144-294.144 285.728 285.728a31.968 31.968 0 1 0 45.248-45.248l-308.352-308.352a32 32 0 0 0-45.28 0l-316.768 316.768a31.968 31.968 0 0 0 22.656 54.624z"
            p-id="2703"
            fill="#f8f8f8"
          ></path>
          <path
            d="M538.784 457.376a32 32 0 0 0-45.28 0l-316.768 316.768a31.968 31.968 0 1 0 45.248 45.248l294.144-294.144 285.728 285.728a31.968 31.968 0 1 0 45.248-45.248l-308.32-308.352z"
            p-id="2704"
            fill="#f8f8f8"
          ></path>
        </svg>
      </div>
      <div class="open-close-word" v-if="showWordVue">
        <svg
          t="1671293736749"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="10318"
          width="25"
          height="25"
        >
          <path
            d="M493.504 558.144a31.904 31.904 0 0 0 45.28 0l308.352-308.352a31.968 31.968 0 1 0-45.248-45.248l-285.728 285.728-294.176-294.144a31.968 31.968 0 1 0-45.248 45.248l316.768 316.768z"
            p-id="10319"
            fill="#f8f8f8"
          ></path>
          <path
            d="M801.888 460.576l-285.728 285.728-294.144-294.144a31.968 31.968 0 1 0-45.248 45.248l316.768 316.768a31.904 31.904 0 0 0 45.28 0l308.352-308.352a32 32 0 1 0-45.28-45.248z"
            p-id="10320"
            fill="#f8f8f8"
          ></path>
        </svg>
      </div>
    </div>
    <div class="content">
      <div class="name">{{ songDetails.name }}</div>
      <div class="singers" v-for="(singer, index) in songDetails.singers" :key="singer.id">
        {{ singer.name }}
        <div v-if="index != songDetails.singers.length - 1">/</div>
      </div>
    </div>
  </div>
  <div class="songword">
    <WordPageVue v-model:isShow="showWordVue" :imgUrl="picUrl"></WordPageVue>
  </div>
</template>
<script lang="ts" scopd>
import { useSongStore } from '@/stores/song';
import { computed, ref } from 'vue';
import WordPageVue from '@/views/WordPage/WordPage.vue';
export default {
  name: 'FooterLeft',
  components: { WordPageVue },
  setup() {
    const store = useSongStore();
    const songDetails = computed(() => store.currentSongDetails);
    const picUrl = computed(() => store.currentSongDetails.picUrl);
    const showWordVue = ref(false);
    function showWord() {
      showWordVue.value = !showWordVue.value;
      console.log(showWordVue.value);
    }
    return { songDetails, showWord, showWordVue, picUrl };
  },
};
</script>
<style lang="less" scoped>
@import '@/layout/footer/footerleft.less';
</style>
