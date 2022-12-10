<template>
  <div class="voice-box">
    <div class="voice-hover-change">
      <div class="voice voice-close cursor-pointer" v-if="!isShowVoice" @click="openAndCloseVoice">
        <svg
          t="1669663749449"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1756"
          width="30"
          height="30"
        >
          <path
            d="M448 938.666667a21.333333 21.333333 0 0 1-15.093333-6.246667L225.833333 725.333333H53.333333a53.393333 53.393333 0 0 1-53.333333-53.333333V352a53.393333 53.393333 0 0 1 53.333333-53.333333h172.5l207.08-207.086667A21.333333 21.333333 0 0 1 469.333333 106.666667v810.666666a21.333333 21.333333 0 0 1-21.333333 21.333334zM53.333333 341.333333a10.666667 10.666667 0 0 0-10.666666 10.666667v320a10.666667 10.666667 0 0 0 10.666666 10.666667h181.333334a21.333333 21.333333 0 0 1 15.086666 6.246666L426.666667 865.833333V158.166667L249.753333 335.086667A21.333333 21.333333 0 0 1 234.666667 341.333333z m964.42 377.753334a21.333333 21.333333 0 0 0 0-30.173334L840.833333 512l176.92-176.913333a21.333333 21.333333 0 1 0-30.173333-30.173334L810.666667 481.833333 633.753333 304.913333a21.333333 21.333333 0 0 0-30.173333 30.173334L780.5 512l-176.92 176.913333a21.333333 21.333333 0 0 0 30.173333 30.173334L810.666667 542.166667l176.913333 176.92a21.333333 21.333333 0 0 0 30.173333 0z"
            fill="#333333"
            p-id="1757"
          ></path>
        </svg>
      </div>
      <div class="voice voice-open cursor-pointer" v-if="isShowVoice" @click="openAndCloseVoice">
        <svg
          t="1669664719508"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="5289"
          width="30"
          height="30"
        >
          <path
            d="M517.1 51.4c-21.6-10.6-45.5-8.6-63.7 5.5l-1.5 1.1-236.1 253.8H66.7c-36.8 0-66.7 30-66.7 66.8v266.9c0 36.8 29.9 66.7 66.7 66.7h149.1l234.9 252.5 1.8 1.9 2.2 1.5c11.3 7.4 23.8 11.2 36.2 11.2 10.1 0 20.2-2.5 29.5-7.5 22-11.8 35.7-35.1 35.7-60.8V113c0-25.7-15.3-49.9-39-61.6zM511.6 911c0 9.1-4.8 17.6-12.3 21.6-4.1 2.2-10.5 3.8-18.2-0.5l-246-264.4H66.7c-12.3 0-22.2-10-22.2-22.2V378.6c0-12.3 10-22.2 22.2-22.2h168.4l246.5-265c5.6-3.5 11.6-2 15.7 0 7.1 3.5 14.2 11.5 14.2 21.7V911zM874.4 150.3c-8.7-8.7-22.8-8.7-31.5 0s-8.7 22.8 0 31.5c182.1 182.1 182.1 478.5 0 660.6-8.7 8.7-8.7 22.8 0 31.5s22.8 8.7 31.5 0c199.5-199.6 199.5-524.2 0-723.6zM685.6 339c-8.7-8.7-22.8-8.7-31.5 0s-8.7 22.8 0 31.5c78.1 78.1 78.1 205.1 0 283.1-8.7 8.7-8.7 22.8 0 31.5s22.8 8.7 31.5 0c95.4-95.4 95.4-250.7 0-346.1z"
            fill="#333333"
            p-id="5290"
          ></path>
          <path
            d="M780 244.6c-8.7-8.7-22.8-8.7-31.5 0s-8.7 22.8 0 31.5c130.1 130.1 130.1 341.8 0 471.9-8.7 8.7-8.7 22.8 0 31.5s22.8 8.7 31.5 0c147.5-147.5 147.5-387.4 0-534.9z"
            fill="#2c2c2c"
            p-id="5291"
          ></path>
        </svg>
      </div>
      <div class="volume-adjust">
        <div class="rectangular">
          <div class="vertical-line">
            <div class="voice_progress" style="height: 50px"></div>
            <div class="circle" style="bottom: 50px" @mousedown="drag"></div>
          </div>
        </div>
        <div class="triangle"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { ref, onMounted, watch } from 'vue';
import { $el, dragEl } from './drag';
import { getVolume } from './qureyVolume';
import pinia from '@/stores/store';
import { useVolumeStore } from '@/stores/volume';
export default {
  name: 'Voice',
  components: {},
  setup() {
    const VStore = useVolumeStore(pinia);
    const { changeMute } = VStore;
    const mode = ref(1);
    const isShowVoice = ref(true);
    const wordOpen = ref(false);
    const isLike = ref(false);
    const isSave = ref(false);
    const changeMode = (): void => {
      if (mode.value == 3) {
        mode.value = 1;
      } else {
        mode.value++;
      }
    };
    watch(
      () => VStore.mute,
      (newV) => {
        isShowVoice.value = !newV;
      }
    );
    onMounted(async () => {
      // 获取根据音量转化的height/bottom 值
      const num: number = await getVolume();
      console.log('计算出的px值:' + num + 'px');
      $el('voice_progress').style.setProperty('height', num + 'px');
      $el('circle').style.setProperty('bottom', num + 'px');
    });
    function drag() {
      console.log('drag');
      dragEl();
    }
    const changeLike = (): void => {
      isLike.value = !isLike.value;
    };
    const openAndCloseVoice = (): void => {
      isShowVoice.value = !isShowVoice.value;
      if (isShowVoice.value == false) {
        changeMute(true);
      } else {
        changeMute(false);
      }
    };
    const openAndCloseWord = (): void => {
      wordOpen.value = !wordOpen.value;
    };

    return {
      mode,
      changeMode,
      isShowVoice,
      wordOpen,
      isLike,
      isSave,
      changeLike,
      openAndCloseVoice,
      openAndCloseWord,
      drag,
    };
  },
};
</script>
<style lang="less" scoped>
.voice-box {
  width: 24px;
  height: 24px;
  position: relative;
}
.voice-hover-change {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 25px;
  height: 25px;
}
.voice-hover-change:hover {
  height: 140px;

  .rectangular {
    position: relative;
    width: 25px;
    height: 100px;
    background-color: #ffffff;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);

    .vertical-line {
      width: 2px;
      height: 80px;
      position: relative;
      background-color: #e8e7e7;

      .voice_progress {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 2px;
        background-color: #ec4141;
      }
      .circle {
        position: absolute;
        width: 8px;
        height: 8px;
        left: -3px;
        border-radius: 50%;
        background-color: #ec4141;
      }
      .circle:hover {
        width: 8px;
        height: 8px;
        border: 1px solid #c63c3c;
      }
    }
  }
  .rectangular::after {
    content: ''; // 伪元素需要添加content才会显示
    position: absolute;
    margin-left: 8px;
    bottom: 1px;
    left: -4px;
    width: 16px;
    height: 8px;
    background-color: #ffffff;
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
  .rectangular::before {
    content: ''; // 伪元素需要添加content才会显示
    position: absolute;
    margin-left: 8px;
    bottom: -4px;
    left: -1px;
    width: 10px;
    height: 10px;
    background-color: #ffffff;
    transform: rotate(45deg);
    box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.2);
  }
}
.on_mouse_down {
  height: 140px;

  .rectangular {
    position: relative;
    width: 25px;
    height: 100px;
    background-color: #ffffff;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);

    .vertical-line {
      width: 2px;
      height: 80px;
      position: relative;
      background-color: #e8e7e7;

      .voice_progress {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 2px;
        background-color: #ec4141;
      }
      .circle {
        position: absolute;
        width: 8px;
        height: 8px;
        left: -3px;
        border-radius: 50%;
        background-color: #ec4141;
      }
      .circle:hover {
        width: 8px;
        height: 8px;
        border: 1px solid #c63c3c;
      }
    }
  }
  .rectangular::after {
    content: ''; // 伪元素需要添加content才会显示
    position: absolute;
    margin-left: 8px;
    bottom: 1px;
    left: -4px;
    width: 16px;
    height: 8px;
    background-color: #ffffff;
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
  .rectangular::before {
    content: ''; // 伪元素需要添加content才会显示
    position: absolute;
    margin-left: 8px;
    bottom: -4px;
    left: -1px;
    width: 10px;
    height: 10px;
    background-color: #ffffff;
    transform: rotate(45deg);
    box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.2);
  }
}
.voice {
  position: absolute;
  left: 0;
  bottom: 0;
  display: inline-flex;
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
}
</style>
