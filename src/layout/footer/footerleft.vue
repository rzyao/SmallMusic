<template>
  <div class="footer-left-box">
    <div class="picture">
      <img :src="picUrl ? picUrl : '@/assets/default_song_pic.png'" alt="图片" />
    </div>
    <div class="content">
      <div class="name">{{ name }}</div>
      <div class="singers" v-for="(singer, index) in singers.list" :key="singer.id">
        {{ singer.name }}
        <div v-if="index != singers.list.length - 1">/</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { useSongStore } from '@/stores/song';
import { ref, watch, reactive } from 'vue';
import imgUrl from '@/assets/default_song_pic.png';
export default {
  name: 'FooterLeft',
  components: {},
  setup() {
    const store = useSongStore();
    const { changeDetails } = store;
    const name = ref('当前无歌曲');
    const picUrl = ref(imgUrl);
    const album = ref('');
    const list: any[] = [{ name: '未知' }];
    const singers = reactive({ list });
    const isPlay = ref(false);
    const play = (): void => {
      isPlay.value = !isPlay.value;
    };
    watch(
      () => store.currentId,
      (newId) => {
        getSongDetails(String(newId));
      }
    );
    async function getSongDetails(ids: string) {
      const res: any = await window.musicApi.getSongDetails(ids);
      name.value = res.body.songs[0].name;
      picUrl.value = res.body.songs[0].al.picUrl;
      album.value = res.body.songs[0].al.name;
      singers.list = res.body.songs[0].ar;
      // 赋值公共变量songsDetails
      const obj = {
        id: ids,
        name: res.body.songs[0].name,
        singers: res.body.songs[0].ar,
        album: res.body.songs[0].al.name,
      };
      changeDetails(obj);
    }
    return { isPlay, play, name, picUrl, album, singers };
  },
};
</script>
<style lang="less" scoped>
@import '@/layout/footer/footerleft.less';
</style>
