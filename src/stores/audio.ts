import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useAudioStore = defineStore('audio', () => {
  /*@param initial: 初始状态
    @param loading: 加载状态
    @param playing: 播放状态
    @param pause: 暂停状态
    @param end: 结束状态
    @param error: 错误状态
   */
  const state = ref('initial');
  // 改变状态
  function changeState(stateName: string) {
    state.value = stateName;
  }
  return { state, changeState };
});
