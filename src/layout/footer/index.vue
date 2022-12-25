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
        @onStateChange="changePlayState"
      ></MusicPlay>
      <div class="control">
        <div class="button-left cursor-pointer" @click="last">
          <div class="vertical-left"></div>
          <div class="back"></div>
        </div>
        <div class="circal-box">
          <div class="circal button-play cursor-pointer" @click="play">
            <div :class="isPlay ? 'play' : 'pause'">
              <div class="vertical-left"></div>
              <div class="vertical-right"></div>
            </div>
          </div>
        </div>
        <div class="button-right cursor-pointer" @click="next">
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
              background-color: #ff3434;
            "
          ></div>
          <div
            class="point cursor-pointer"
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
</template>
<script lang="ts">
import FooterLeft from '@/layout/footer/footerleft.vue';
import FooterRight from '@/layout/footer/footerright.vue';
import MusicPlay from '@/components/musicPlay/index.vue';
import { useSongStore } from '@/stores/song';
import { useVolumeStore } from '@/stores/volume';
import { ref, watch, nextTick, onMounted } from 'vue';
import { db } from '@/untils/dexie/db';
import { useAudioStore } from '@/stores/audio';
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
      // 监听静音变化
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
          console.log('监听声音变化', newV);
          volume.value = newV;
        }
      );
    });
    const store = useSongStore();
    const VStore = useVolumeStore();
    const { playLastSong, playNextSong } = store;
    const src = ref('');
    const totalTime = ref(0);
    const m_totalTime = ref('0:00');
    const startTime = ref(0);
    const currentTime = ref('0:00');
    const isPlay = ref(false);
    const styleWidth = ref('');
    const draging = ref(false);
    const play = (): void => {
      isPlay.value = !isPlay.value;
      if (mute.value) {
        //如果本来是静音,播放依然是静音
        mute.value = true;
      }
    };
    watch(
      () => store.newSongUrl,
      (newUrl) => {
        console.log(newUrl);
        src.value = newUrl;
        isPlay.value = false;
        nextTick(() => {
          isPlay.value = true;
          if (mute.value) {
            //如果本来是静音,播放依然是静音
            mute.value = true;
          }
        });
      }
    );
    function next() {
      isPlay.value = false;
      console.log('next');
      if (store.playMode == 1) {
        console.log('单曲循环');
        startTime.value = 0;
        setTimeout(() => {
          isPlay.value = true;
        }, 0);
      } else {
        console.log('播放下一首');
        playNextSong();
      }
    }
    function last() {
      console.log('播放上一首');
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
      let seconds = '';
      if (second < 10) {
        seconds = `0${second}`;
      } else {
        seconds = `${second}`;
      }
      const total = minutes + ':' + seconds;
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
      if (!draging.value) {
        progress.value = String(num) + '%';
        const el = document.getElementsByClassName('progress-line')[0] as HTMLElement;
        el.style.setProperty('width', progress.value);
        const el1 = document.getElementsByClassName('point')[0] as HTMLElement;
        el1.style.setProperty('left', progress.value);
      }
    }
    function mouseDown() {
      draging.value = true;
      let isMouseDown = true;
      // 鼠标初始位置
      // 外层盒子初始位置
      const line = document.getElementsByClassName('line')[0] as HTMLElement;
      const line_x = line.getBoundingClientRect().x;
      const progress = document.getElementsByClassName('progress-line')[0] as HTMLElement;
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
          progress.style.setProperty('width', distance + 'px');
        }
      };
      document.onmouseup = () => {
        isMouseDown = false;
        point.style.cursor = 'default';
        document.onmousemove = null;
        const per = (distance / 360) * 100;
        startTime.value = (totalTime.value * per) / 100;
        draging.value = false;
        document.onmouseup = null;
      };
    }
    const audioStore = useAudioStore();
    const { changeState } = audioStore;
    function changePlayState(state: string) {
      if (state == 'play' || state == 'playing') {
        changeState('playing');
      } else if (state == 'pause') {
        changeState('pause');
      }
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
      changePlayState,
    };
  },
};
</script>
<style lang="less" scoped>
@import '@/layout/footer/footer.less';
</style>
