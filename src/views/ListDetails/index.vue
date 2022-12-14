<template>
  <div class="content-box scroll">
    <div class="list-details-box no-select">
      <div class="list-pictrue">
        <img :src="listDetails.coverImgUrl" alt="歌单图像" style="width: 183px; height: 183px" />
      </div>
      <div class="list-details">
        <div class="list-name">
          <div class="gedan select">歌单</div>
          {{ listDetails.name }}
        </div>
        <div class="edit-box">
          <div class="play-all-edit eidt-max-height cursor-pointer" @click="playAll">
            <div class="triangle"></div>
            <div class="text white">播放全部</div>
          </div>
          <div class="add-to-playlist edit eidt-max-height cursor-pointer">
            <div class="icon">
              <svg
                t="1669995111154"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2918"
                width="17"
                height="17"
              >
                <path
                  d="M801.171 483.589H544V226.418c0-17.673-14.327-32-32-32s-32 14.327-32 32v257.171H222.83c-17.673 0-32 14.327-32 32s14.327 32 32 32H480v257.17c0 17.673 14.327 32 32 32s32-14.327 32-32v-257.17h257.171c17.673 0 32-14.327 32-32s-14.327-32-32-32z"
                  fill=""
                  p-id="2919"
                ></path>
              </svg>
            </div>
            <div class="text">添加播放</div>
          </div>
          <div class="collect edit eidt-max-height cursor-pointer" @click="collectList">
            <div class="icon">
              <svg
                t="1669995204807"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="7881"
                width="16"
                height="16"
              >
                <path
                  d="M380.3 336.9l114.1-208.7c0.6-0.1 1-0.3 1.4-0.4-2.9-1.3 4-1.3 0 0 0.4 0.2 1 0.4 1.9 0.6l112.5 208c3.8 7 10.5 11.9 18.3 13.5L877 398.4l-92.4 100.5c-7.8 8.5-6.2 21.9 3.4 28.3 7.6 5.1 17.8 3.9 24.1-2.8l104-111c8.7-9.2 10.7-23 4.8-34.2 0-0.1-0.1-0.2-0.1-0.3-4.3-8.2-12.2-14-21.3-15.7l-241.4-46.3c-7.5-1.4-13.9-6.1-17.6-12.8L515.2 77c-3.9-7.1-11.3-11.6-19.5-11.8h-0.2c-8.4-0.1-16.1 4.5-20.2 11.8l-124 225c-4.4 8-12.2 13.7-21.2 15.4L89.9 363.5c-8.7 1.7-16.4 7.1-20.6 15 0 0 0 0.1-0.1 0.1-6 11.2-3.9 25.1 4.8 34.3l168 179.4c5.6 6 8.3 14.3 7.3 22.5L219 857.1c-1.4 11.2 3.4 22.4 12.7 28.7 0.1 0 0.1 0.1 0.2 0.1 9.1 6.2 21 6.8 30.8 1.8l249.8-125.8c9.5-4.8 13.6-16 9.6-25.8-4.5-10.8-17.1-15.6-27.6-10.5l-232 112.9L294 584.8c0.9-7.5-1.7-15-7.1-20.4L119.7 399.7l242.8-49.6c7.6-1.6 14.1-6.4 17.8-13.2z m539 423.3H791.2V632.1c0-10.9-9.5-19.8-21.2-19.8s-21.2 8.9-21.2 19.8v128.1H620.7c-10.9 0-19.8 9.5-19.8 21.2s8.9 21.2 19.8 21.2h128.1v128.1c0 10.9 9.5 19.8 21.2 19.8s21.2-8.9 21.2-19.8V802.6h128.1c10.9 0 19.8-9.5 19.8-21.2s-8.9-21.2-19.8-21.2z"
                  p-id="7882"
                ></path>
              </svg>
            </div>
            <div
              class="text"
              v-if="
                collectionList.findIndex((item) => String(item.id) == String(listDetails.id)) == -1
              "
            >
              收藏
            </div>
            <div
              class="text"
              v-if="
                collectionList.findIndex((item) => String(item.id) == String(listDetails.id)) > -1
              "
            >
              已收藏
            </div>
          </div>
          <div class="share edit eidt-max-height cursor-pointer">
            <div class="icon">
              <svg
                t="1669995248654"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="8910"
                width="16"
                height="16"
              >
                <path
                  d="M512 939.804444c-57.612929 0-113.570909-11.274343-166.322424-33.616161-50.889697-21.514343-96.504242-52.337778-135.809293-91.539394C170.666667 775.447273 139.843232 729.729293 118.328889 678.839596 96.193939 626.191515 84.816162 570.233535 84.816162 512.620606s11.274343-113.570909 33.616161-166.322424c21.514343-50.889697 52.337778-96.504242 91.539394-135.809293 39.201616-39.201616 84.919596-70.025051 135.809293-91.539394 52.648081-22.238384 108.606061-33.616162 166.322424-33.616162h1.034344l-0.103435 57.923233h-0.930909c-98.676364 0-191.353535 38.374141-261.068282 108.192323-69.818182 69.818182-108.295758 162.495354-108.295758 261.171717s38.374141 191.353535 108.192323 261.068283c69.714747 69.818182 162.495354 108.192323 261.068283 108.192323 98.572929 0 191.250101-38.374141 261.068283-108.088889C842.78303 704.077576 881.260606 611.400404 881.260606 512.827475h57.923232c0 57.612929-11.377778 113.570909-33.616161 166.21899-21.514343 50.889697-52.337778 96.504242-91.539394 135.705858s-84.919596 69.921616-135.705859 91.43596c-52.751515 22.341818-108.606061 33.616162-166.322424 33.616161zM938.149495 352.711111h-57.923232V145.73899H672.530101v-57.923232H938.149495V352.711111z m0 0"
                  p-id="8911"
                ></path>
                <path
                  d="M888.371717 96.012929l40.96 40.96L560.484848 505.806869l-40.96-40.96L888.371717 96.012929z m0 0"
                  p-id="8912"
                ></path>
              </svg>
            </div>
            <div class="text">分享</div>
          </div>
        </div>
        <div class="list-tags-box">
          标签:
          <div class="list-tag-box select" v-for="(item, index) in listDetails.tags" :key="index">
            <div class="tag">{{ item }}</div>
            <div v-if="listDetails.tags.length > index + 1">/</div>
          </div>
        </div>
        <div class="statistics">
          <div class="songs-count">
            <div class="name">歌曲:</div>
            {{ listDetails.trackIds.length }}
          </div>
          <div class="play-count" style="margin-left: 10px">
            <div class="name">播放数:</div>
            {{
              listDetails.playCount > 10000 ? RML4(listDetails.playCount) : listDetails.playCount
            }}
            <div v-if="listDetails.playCount > 10000">万</div>
          </div>
          <div></div>
        </div>
        <div class="description" ref="down">
          <div class="name">简介:</div>
          <div class="text select" ref="text">{{ listDetails.description }}</div>
          <!-- 内容超出显示下拉按钮 -->
          <div
            class="down cursor-pointer"
            v-if="listDetails.description.byteLength() * 14 > 450"
            @click="changeHeight"
          >
            <svg
              t="1670602171086"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2140"
              width="20"
              height="20"
              v-if="!isDown"
            >
              <path
                d="M79.123059 327.850933l405.024593 413.260162c15.690354 16.009625 41.469484 16.009625 57.160861 0l405.02357-413.260162c24.819269-25.323758 6.877641-68.028373-28.579919-68.028373L107.704001 259.82256C72.245418 259.82256 54.30379 302.527175 79.123059 327.850933z"
                p-id="2141"
              ></path>
            </svg>
            <svg
              t="1670605884123"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3001"
              width="20"
              height="20"
              v-if="isDown"
            >
              <path
                d="M946.33106 697.353498 541.30749 284.093337c-15.690354-16.009625-41.469484-16.009625-57.160861 0l-405.024593 413.260162c-24.819269 25.323758-6.877641 68.028373 28.579919 68.028373l810.048163 0C953.209724 765.381871 971.150328 722.677257 946.33106 697.353498z"
                p-id="3002"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div class="songs-list no-select">
      <div class="title">
        <div class="song">歌曲</div>
        <div class="singer">歌手</div>
        <div class="album">专辑</div>
        <div class="edit">操作</div>
      </div>
      <div
        class="songs"
        v-for="(song, index) in songs"
        :key="song.id"
        :class="index % 2 == 0 ? 'zebra' : ' '"
      >
        <div class="song">{{ song.name }}</div>
        <div class="singers">
          {{ arrayToString(song.singers) }}
        </div>
        <div class="album-box">
          <div class="album">{{ song.album }}</div>
        </div>
        <div class="edit">
          <div class="download cursor-pointer">
            <svg
              t="1670158397251"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1444"
              width="16"
              height="16"
            >
              <path
                d="M897.706667 989.866667H126.293333c-51.2 0-92.16-40.96-92.16-92.16V512c0-13.653333 11.946667-25.6 25.6-25.6S85.333333 498.346667 85.333333 512v385.706667C85.333333 919.893333 104.106667 938.666667 126.293333 938.666667h769.706667c22.186667 0 40.96-18.773333 40.96-40.96V512c0-13.653333 11.946667-25.6 25.6-25.6s27.306667 11.946667 27.306667 25.6v385.706667c0 51.2-40.96 92.16-92.16 92.16z"
                fill="#7d7d76"
                p-id="1445"
              ></path>
              <path
                d="M512 738.986667c-6.826667 0-13.653333-1.706667-18.773333-6.826667L267.946667 505.173333c-10.24-10.24-10.24-25.6 0-35.84s25.6-10.24 35.84 0L512 677.546667l208.213333-208.213334c10.24-10.24 25.6-10.24 35.84 0s10.24 25.6 0 35.84L530.773333 730.453333c-5.12 5.12-11.946667 8.533333-18.773333 8.533334z"
                fill="#7d7d76"
                p-id="1446"
              ></path>
              <path
                d="M512 738.986667c-13.653333 0-25.6-11.946667-25.6-25.6V59.733333c0-13.653333 11.946667-25.6 25.6-25.6s25.6 11.946667 25.6 25.6v653.653334c0 13.653333-11.946667 25.6-25.6 25.6z"
                fill="#333333"
                p-id="1447"
              ></path>
            </svg>
          </div>
          <div class="collect cursor-pointer">
            <svg
              t="1670158679036"
              class="icon"
              viewBox="0 0 1179 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3644"
              width="16"
              height="16"
            >
              <path
                d="M142.31918 540.267127l350.13559 373.653781c54.296613 63.852817 139.806023 63.883844 195.033436-1.054906l362.204951-388.670672c42.661625-48.866952 65.466202-112.130263 65.466203-182.902021a279.239726 279.239726 0 0 0-501.018122-169.653647 30.99561 30.99561 0 0 1-25.534922 12.131415 30.99561 30.99561 0 0 1-25.503895-12.131415A279.239726 279.239726 0 0 0 62.053272 341.293309c0 72.850542 28.792718 144.242832 77.411458 195.498835 1.054906 1.116959 1.985705 2.264944 2.85445 3.474983z m-54.606879 31.926409A349.732244 349.732244 0 0 1 0 341.293309C0 152.806494 152.806184 0.00031 341.292999 0.00031c95.065613 0 183.708713 39.155615 247.313317 106.111096A340.486306 340.486306 0 0 1 835.95066 0.00031c188.486815 0 341.292999 152.806184 341.292999 341.292999 0 80.793361-25.069522 154.636755-72.198982 213.463257-1.147986 1.923651-2.482131 3.754223-4.095516 5.491715l-5.181449 5.553768c-2.699317 3.071637-5.491715 6.112247-8.315138 9.090804-0.620533 0.620533-1.210039 1.241065-1.861598 1.799545L733.810974 954.069375c-79.055869 93.048882-209.553901 93.017855-287.616918 1.147985L90.783938 576.040839a31.243823 31.243823 0 0 1-3.102664-3.847303z"
                p-id="3645"
                fill="#9f9f99"
              ></path>
            </svg>
          </div>
          <div class="play cursor-pointer" @click="playSong(song.id)">
            <svg
              t="1670158626603"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2668"
              width="16"
              height="16"
            >
              <path
                d="M772.7 217.7a32.2 32.1 0 1 0 64.4 0 32.2 32.1 0 1 0-64.4 0Z"
                fill="#7d7d76"
                p-id="2669"
              ></path>
              <path
                d="M415.8 679.9c5.9 0 11.5-1.6 16.2-4.5l231.1-134.6c10.9-5.2 18.5-16.3 18.5-29.2 0-11.9-6.4-22.3-16-27.8L439.7 352.2c-5.8-6.7-14.4-10.9-23.9-10.9-17.6 0-31.8 14.4-31.8 32.1 0 0.6 0 1.2 0.1 1.8l-0.4 0.2 0.5 269c-0.1 1.1-0.2 2.2-0.2 3.4 0 17.7 14.3 32.1 31.8 32.1z"
                fill="#7d7d76"
                p-id="2670"
              ></path>
              <path
                d="M909.8 306.6c-5.4-10.5-16.3-17.8-28.9-17.8-17.8 0-32.2 14.4-32.2 32.1 0 6 1.7 11.7 4.6 16.5l-0.1 0.1c26.9 52.4 42.1 111.8 42.1 174.7 0 211.6-171.6 383.2-383.2 383.2S128.8 723.8 128.8 512.2 300.4 129.1 512 129.1c62.5 0 121.5 15 173.6 41.5l0.2-0.4c4.6 2.6 10 4.1 15.7 4.1 17.8 0 32.2-14.4 32.2-32.1 0-13.1-7.9-24.4-19.3-29.4C653.6 81.9 584.9 64.5 512 64.5 264.7 64.5 64.3 265 64.3 512.2S264.7 959.9 512 959.9s447.7-200.4 447.7-447.7c0-74.1-18-144-49.9-205.6z"
                fill="#4D4D4D"
                p-id="2671"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useSongStore } from '@/stores/song';
import type { Song } from './type';
import { db } from '@/untils/dexie/db';
export default {
  name: 'ListDetails',
  components: {},
  setup() {
    const down = ref<HTMLInputElement | null>(null);
    const text = ref<HTMLInputElement | null>(null);
    const store = useSongStore();
    const { changeSong, insteadCurrentPlayList } = store;
    const songs: Song[] = reactive([]);
    function RML4(num: number) {
      const length = String(num).length;
      const res = String(num).substring(0, length - 4);
      return res;
    }
    const router = useRoute();
    const listId = Number(router.query.id);
    const listDetails = reactive({
      id: 0,
      name: '',
      coverImgUrl: '',
      description: '',
      tags: [''],
      playCount: 0,
      shareCount: 0,
      trackIds: [],
    });
    // 定义收藏的歌单 数组
    const collectionList: any[] = reactive([]);
    // 从数据库查询收藏的歌单
    async function queryCollectionList() {
      const collection = await db.collectList.toArray();
      collectionList.splice(0, collectionList.length);
      collectionList.push(...collection);
    }
    // 收藏歌单或取消收藏歌单
    async function collectList() {
      const isClollected = collectionList.findIndex((item) => item.id == listDetails.id) > -1;
      if (isClollected) {
        await db.collectList.delete(String(listDetails.id));
      } else {
        await db.collectList.put({ id: String(listDetails.id) });
      }
      queryCollectionList();
    }
    onMounted(async () => {
      queryCollectionList();
      const res: any = await window.devApi.getListDetails(listId);
      const result = res.body.playlist;
      console.log('获取歌单详情');
      console.log(result);
      listDetails.id = result.id;
      listDetails.name = result.name;
      listDetails.coverImgUrl = result.coverImgUrl;
      listDetails.description = result.description;
      listDetails.tags = result.tags;
      listDetails.playCount = result.playCount;
      listDetails.shareCount = result.shareCount;
      listDetails.trackIds = result.trackIds;
      // 请求歌单所有歌曲
      const res2: any = await window.devApi.getAllSongs(listId);
      console.log('获取歌单所有歌曲');
      console.log(res2);
      const result2 = res2.body.songs;
      // 删选属性
      result2.forEach((item: any) => {
        const song: Song = {
          id: item.id,
          name: item.name,
          singers: item.ar,
          album: item.al.name,
        };
        songs.push(song);
      });
    });
    async function playSong(id: string) {
      const res: any = await window.devApi.getSongUrl(Number(id));
      console.log(res);
      console.log(res.body.data[0].url);
      const url = res.body.data[0].url;
      changeSong(url);
    }
    function playAll() {
      console.log('playAll');
      insteadCurrentPlayList(songs);
    }
    const isDown = ref(false);
    function changeHeight() {
      console.log(down.value);
      if (!isDown.value && down.value) {
        if (text.value) text.value.style.whiteSpace = 'inherit';
        isDown.value = true;
        down.value.style.height = 'auto';
        const height = down.value.offsetHeight;
        console.log(height);
        if (down.value) down.value.style.height = '22px';
        setTimeout(() => {
          // if  跳过ts提示可能为null
          if (down.value) down.value.style.height = `${height}px`;
        }, 0);
      } else if (down.value) {
        isDown.value = false;
        down.value.style.height = '22px';
        setTimeout(() => {
          if (text.value) text.value.style.whiteSpace = 'nowrap';
        }, 800);
      }
      console.log(isDown.value);
    }
    function arrayToString(arr: any) {
      let str = '';
      for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        str = str + element.name;
        if (i != arr.length - 1) {
          str = str + ' / ';
        }
      }
      return str;
    }
    return {
      listDetails,
      RML4,
      songs,
      playSong,
      playAll,
      changeHeight,
      down,
      isDown,
      text,
      collectList,
      collectionList,
      arrayToString,
    };
  },
};
</script>
<style lang="less" scoped>
@import '@/views/ListDetails/ListDetails.less';
</style>
