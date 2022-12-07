<template>
  <div class="app">
    <audio
      class="audio"
      id="MusicPlay"
      :src="props.url"
      :volume="props.volume"
      @onplay="onplay"
      :muted="props.mute"
    ></audio>
  </div>
</template>
<script lang="ts">
import { watch, onMounted, ref } from 'vue';
import { conversion, getProgress } from './musicPlay';
export default {
  name: 'MusicPlay',
  emits: ['TotalTime', 'CurrentTime', 'onProgress', 'State', 'onEnd', 'onLoadError'],
  props: {
    url: String,
    play: Boolean,
    startTime: Number,
    volume: Number,
    mute: {
      type: Boolean,
      default: false,
    },
  },
  // props: ['url', 'play', 'startTime', 'volume', mute:{}],
  setup(props, { emit }) {
    const totalTime = ref(0);
    const currentTime = ref(0);
    /* 监听播放/暂停命令 */
    watch(
      () => props.play,
      (newValue) => {
        control(newValue);
      }
    );
    /* 监听拖动命令 */
    watch(
      () => props.startTime,
      (newValue) => {
        document.getElementsByTagName('audio')[0].currentTime = Number(newValue);
      }
    );
    onMounted(() => {
      watchCurrentTime();
      getTotalTime();
      onPlaying();
      onEnd();
      watchStalled();
    });
    function watchStalled() {
      document.getElementsByTagName('audio')[0].addEventListener('stalled', () => {
        emit('onLoadError', 'Failed to fetch data');
      });
    }
    function onEnd() {
      document.getElementsByTagName('audio')[0].addEventListener('ended', () => {
        emit('State', 'ended');
        emit('onEnd');
      });
    }
    function onPlaying() {
      document.getElementsByTagName('audio')[0].addEventListener('playing', () => {
        emit('State', 'playing');
      });
    }
    function watchCurrentTime() {
      let musicDom = document.getElementsByTagName('audio')[0];
      musicDom.addEventListener('timeupdate', () => {
        currentTime.value = musicDom.currentTime;
        const backCurrentTime = conversion(currentTime.value);
        CurrentTimeChanged(backCurrentTime);
        const progress = getProgress(currentTime.value, totalTime.value);
        ProgressChanged(progress);
      });
    }
    function ProgressChanged(progress: any) {
      emit('onProgress', progress);
    }
    function CurrentTimeChanged(backCurrentTime: string) {
      emit('CurrentTime', backCurrentTime);
    }
    function getTotalTime() {
      const audio = document.getElementsByTagName('audio')[0];
      audio.addEventListener('durationchange', () => {
        totalTime.value = Math.floor(audio.duration);
        // const backTotalTime = conversion(totalTime.value);
        const backTotalTime = totalTime.value;
        emit('TotalTime', backTotalTime);
      });
    }

    function control(play: boolean) {
      const audio = document.getElementsByTagName('audio')[0];
      if (play == true) {
        audio.play();
      }
      if (play == false) {
        console.log('pause');
        audio.pause();
      }
    }
    function onplay() {
      console.log('onplay');
    }
    return { props, onplay, onEnd };
  },
};
</script>
<style scoped>
.app {
  position: relative;
}
.audio {
  position: absolute;
  top: -200px;
}
</style>
