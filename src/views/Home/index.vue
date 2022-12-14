<template>
  <div class="content-box">
    <div class="content">
      <div class="recommend">
        <div class="recommend-word">推荐歌单</div>
      </div>
      <div class="lists-box">
        <div
          class="song-lists cursor-pointer"
          v-for="list in songLists"
          :key="list.id"
          @click="toListDetails(list.id)"
        >
          <div class="song-list">
            <div class="pictrue">
              <img :src="list.picUrl" style="width: 135px; height: 135px" alt="" />
              <div class="play-button">
                <div class="triangle"></div>
              </div>
            </div>
            <div class="name">{{ list.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { useRouter } from 'vue-router';
import { ref, reactive, onMounted } from 'vue';
import type { Songlist } from './type';
export default {
  name: 'Home',
  components: {},
  setup() {
    const user = ref('');
    const password = ref('');
    const router = useRouter();
    const menuData = router.getRoutes();
    const songLists: Songlist[] = reactive([]);
    onMounted(async () => {
      const res: any = await window.devApi.getLists(20);
      const result = res.body.result;
      songLists.push(...result);
    });
    function toListDetails(id: number) {
      router.push({
        path: '/ListDetails',
        query: {
          id: id,
        },
      });
    }
    return { menuData, user, password, songLists, toListDetails };
  },
};
</script>
<style lang="less" scoped>
@import '@/views/Home/home.less';
</style>
