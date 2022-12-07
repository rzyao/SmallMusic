import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useVolumeStore = defineStore('volume', () => {
  // 音量
  const volume = ref(0);
  // 音量调节
  function changeVolume(num: number) {
    volume.value = num;
  }
  // 静音
  const mute = ref(true);
  function changeMute(bool: boolean) {
    console.log(bool);
    mute.value = bool;
  }
  return {
    volume,
    changeVolume,
    mute,
    changeMute,
  };
});
