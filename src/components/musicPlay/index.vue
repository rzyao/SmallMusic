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
import { useSongStore } from '@/stores/song';
export default {
  name: 'MusicPlay',
  emits: ['TotalTime', 'CurrentTime', 'onProgress', 'onStateChange', 'onEnd', 'onLoadError'],
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
        console.log(newValue);
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
        emit('onStateChange', 'stalled');
        emit('onLoadError', 'Failed to fetch data');
        console.log('stalled');
        console.log('用户代理正在尝试获取媒体数据，但数据出乎意料地没有出现。');
      });
    }
    function onEnd() {
      document.getElementsByTagName('audio')[0].addEventListener('ended', () => {
        emit('onStateChange', 'ended');
        emit('onEnd');
        console.log('ended');
        console.log('由于到达媒体末尾，播放已停止。');
      });
    }
    function onPlaying() {
      document.getElementsByTagName('audio')[0].addEventListener('play', () => {
        emit('onStateChange', 'play');
        console.log('play');
        console.log('播放已经开始。');
      });
      document.getElementsByTagName('audio')[0].addEventListener('playing', () => {
        emit('onStateChange', 'playing');
        console.log('playing');
        console.log('由于缺少数据而暂停或延迟后，播放准备开始。');
      });
      document.getElementsByTagName('audio')[0].addEventListener('waiting', () => {
        emit('onStateChange', 'waiting');
        console.log('watting');
        console.log('由于暂时缺少数据，播放已停止');
      });
      document.getElementsByTagName('audio')[0].addEventListener('suspend', () => {
        emit('onStateChange', 'playing');
        console.log('suspend');
        console.log('媒体数据加载已暂停。');
      });
      document.getElementsByTagName('audio')[0].addEventListener('pause', () => {
        emit('onStateChange', 'pause');
        console.log('pause');
        console.log('播放已暂停。');
      });
      document.getElementsByTagName('audio')[0].addEventListener('emptied', () => {
        emit('onStateChange', 'emptied');
        console.log('emptied');
        console.log(
          '媒体变空了；例如，如果媒体已经加载（或部分加载），则发送此事件，并 HTMLMediaElement.load调用该方法重新加载它。'
        );
      });
      document.getElementsByTagName('audio')[0].addEventListener('waiting', () => {
        emit('onStateChange', 'waiting');
        console.log('watting');
        console.log('由于暂时缺少数据，播放已停止');
      });
    }
    const store = useSongStore();
    const { changeCurrentTime } = store;
    function watchCurrentTime() {
      let musicDom = document.getElementsByTagName('audio')[0];
      musicDom.addEventListener('timeupdate', () => {
        currentTime.value = musicDom.currentTime;
        changeCurrentTime(musicDom.currentTime); // 修改全局变量currentTime
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
