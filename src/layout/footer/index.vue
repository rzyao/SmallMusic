<template>
  <div class="footer-box">
    <div class="left-box">
      <FooterLeft></FooterLeft>
    </div>
    <div class="control-box">
      <MusicPlay
        :url="src"
        :play="isPlay"
        :startTime="startTime"
        :volume="volume"
        :mute="mute"
        @TotalTime="getTotalTime"
        @CurrentTime="getCurrentTime"
        @onProgress="getProgress"
        @onEnd="next"
        @onLoadError="LoadUrlError"
      ></MusicPlay>
      <div class="control">
        <div class="button-left" @click="last">
          <div class="vertical-left"></div>
          <div class="back"></div>
        </div>
        <div class="circal-box">
          <div class="circal button-play" @click="play">
            <div :class="isPlay ? 'play' : 'pause'">
              <div class="vertical-left"></div>
              <div class="vertical-right"></div>
            </div>
          </div>
        </div>
        <div class="button-right" @click="next">
          <div class="next"></div>
          <div class="vertical-right"></div>
        </div>
      </div>
      <div class="progress" :style="{ width: styleWidth }">
        <div class="current" unselectable="on">{{ currentTime }}</div>
        <div class="line">
          <div
            class="progress-line"
            style="
              position: absolute !important;
              top: 0;
              left: 0;
              width: 0;
              height: 3px;
              border-radius: 2px;
              opacity: 0.8;
              background-color: #5eb127;
            "
          ></div>
          <div
            class="point"
            @mousedown="mouseDown"
            style="
              position: absolute;
              width: 9px;
              height: 9px;
              border-radius: 50%;
              background-color: #d63131;
              top: -3px;
            "
          ></div>
        </div>
        <div class="total" unselectable="on">{{ m_totalTime }}</div>
      </div>
    </div>
    <div class="right-box">
      <FooterRight></FooterRight>
    </div>
  </div>
  <a-progress :percent="30" />
</template>
<script lang="ts">
import FooterLeft from '@/layout/footer/footerleft.vue';
import FooterRight from '@/layout/footer/footerright.vue';
import MusicPlay from '@/components/musicPlay/index.vue';
import { useCounterStore } from '@/stores/counter';
import { useVolumeStore } from '@/stores/volume';
import { ref, watch, nextTick, onMounted } from 'vue';
import { db } from '@/untils/dexie/db';
export default {
  name: 'LayoutFooter',
  components: { FooterLeft, FooterRight, MusicPlay },
  setup() {
    const volume = ref(0);
    async function getVolume() {
      const res = await db.options.where('id').equalsIgnoreCase('volume').toArray();
      const result = res[0].value;
      volume.value = Number(result);
    }
    getVolume();
    const mute = ref(false);
    onMounted(() => {
      // 监听声音变化
      watch(
        () => VStore.mute,
        (newV) => {
          mute.value = newV;
        }
      );
      // 监听声音变化
      watch(
        () => VStore.volume,
        (newV) => {
          volume.value = newV;
        }
      );
    });
    const store = useCounterStore();
    const VStore = useVolumeStore();
    const { playLastSong, playNextSong } = store;
    const src = ref('');
    const totalTime = ref(0);
    const m_totalTime = ref('0:00');
    const startTime = ref(0);
    const currentTime = ref('0:00');
    const isPlay = ref(false);
    const styleWidth = ref('');
    const play = (): void => {
      isPlay.value = !isPlay.value;
    };
    watch(
      () => store.newSongUrl,
      (newUrl) => {
        console.log(newUrl);
        src.value = newUrl;
        isPlay.value = false;
        nextTick(() => {
          isPlay.value = true;
        });
      }
    );
    function next() {
      console.log('next');
      playNextSong();
    }
    function last() {
      console.log('last');
      playLastSong();
    }
    function LoadUrlError() {
      console.log('url请求失败,播放下一首');
      playNextSong();
    }
    function conversion(time: any) {
      const minutes = Math.floor(time / 60);
      let second = time % 60;
      second = Math.round(second);
      const total = minutes + ':' + second;
      return total;
    }
    function getTotalTime(time: any) {
      totalTime.value = time;
      m_totalTime.value = conversion(time);
    }
    function getCurrentTime(time: any) {
      currentTime.value = time;
    }
    const progress = ref('');
    function getProgress(num: number) {
      progress.value = String(num) + '%';
      const el = document.getElementsByClassName('progress-line')[0] as HTMLElement;
      el.style.setProperty('width', progress.value);
      const el1 = document.getElementsByClassName('point')[0] as HTMLElement;
      el1.style.setProperty('left', progress.value);
    }
    function mouseDown() {
      let isMouseDown = true;
      // 鼠标初始位置
      // 外层盒子初始位置
      const line = document.getElementsByClassName('line')[0] as HTMLElement;
      const line_x = line.getBoundingClientRect().x;
      console.log(line_x);

      let point = document.getElementsByClassName('point')[0] as HTMLElement;
      point.style.cursor = 'move';

      let distance = 0;
      document.onmousemove = (ev) => {
        if (isMouseDown) {
          var mouse_current_x = ev.clientX;
          distance = parseInt(String(mouse_current_x)) - parseInt(String(line_x));
          if (distance > 360) {
            distance = 360;
          }
          if (distance < 0) {
            distance = 0;
          }
          point.style.setProperty('left', distance + 'px');
        }
      };
      document.onmouseup = () => {
        console.log('onmouseup');
        isMouseDown = false;
        point.style.cursor = 'default';
        document.onmousemove = null;
        const per = (distance / 360) * 100;
        startTime.value = (totalTime.value * per) / 100;
      };
    }
    return {
      src,
      isPlay,
      totalTime,
      currentTime,
      progress,
      styleWidth,
      startTime,
      m_totalTime,
      volume,
      mute,
      play,
      getTotalTime,
      getCurrentTime,
      getProgress,
      mouseDown,
      next,
      last,
      LoadUrlError,
    };
  },
};
</script>
<style lang="less" scoped>
@import '@/layout/footer/footer.less';
</style>
