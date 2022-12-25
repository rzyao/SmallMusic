<template>
  <div class="page-song scroll0">
    <div class="songs-list no-select">
      <div class="title">
        <div class="song">歌曲标题</div>
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
          {{ toString(JSON.parse(JSON.stringify(song.singers))) }}
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
          <div class="collect cursor-pointer" @click="changeFavorite(song.id)">
            <svg
              t="1670855234565"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2720"
              width="16"
              height="16"
            >
              <path
                d="M669.781333 130.752c71.637333-11.093333 138.901333 11.477333 193.344 64.533333 55.317333 53.930667 81.834667 124.992 74.282667 199.530667-7.466667 73.642667-46.549333 146.368-112.32 210.474667-18.346667 17.898667-67.669333 66.218667-138.453333 135.637333-31.829333 31.232-65.706667 64.448-99.84 97.984L553.6 871.466667l-13.184 12.949333a40.554667 40.554667 0 0 1-56.832 0l-114.602667-112.64-24.213333-23.722667a677626.346667 677626.346667 0 0 0-145.856-142.762666C133.141333 541.184 94.08 468.48 86.613333 394.816c-7.552-74.538667 18.944-145.6 74.282667-199.530667 54.442667-53.056 121.706667-75.605333 193.344-64.533333 53.162667 8.213333 107.093333 34.688 157.781333 76.949333 50.709333-42.24 104.618667-68.736 157.781334-76.949333z"
                fill="#fa290e"
                p-id="2721"
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

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { useSongStore } from '@/stores/song';
import { useFavorite } from '@/stores/favorite';
const props = defineProps({
  serchText: String,
});
const songs: any = reactive([]);
const songStore = useSongStore();
const favorite = useFavorite();
onMounted(async () => {
  const res: any = await window.musicApi.search({
    keywords: String(props.serchText),
  });
  const arr = res.body.result.songs;
  console.log(arr);
  arr.forEach((item: any) => {
    songs.push({
      id: item.id,
      name: item.name,
      singers: item.ar ? item.ar : item.artists,
      album: item.album.name,
      picUrl: item.album.picUrl,
    });
  });
});
function toString(arr: any) {
  console.log(arr);
  let str = '';
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    str += element.name;
    if (i != arr.length - 1) {
      str += ' / ';
    }
  }
  return str;
}
const { playTheSong } = songStore;
function playSong(id: any) {
  playTheSong(id);
}
const { changeFavorite } = favorite;
</script>
<style lang="less" scoped>
// 定义滚动条
.scroll0 {
  overflow-y: scroll !important;
  overflow-x: visible;
}
// 定义滚动条样式
.scroll0::-webkit-scrollbar {
  width: 6px;
  height: 10px;
}
.scroll0::-webkit-scrollbar-thumb {
  background-color: #dfdfdf;
  border-radius: 5px;
}
.page-song {
  width: calc(100% + 4%);
  height: 100%;
  left: -4%;
  padding-left: 4%;
}
.songs-list {
  width: 100%;

  .title {
    width: 100%;
    height: 30px;
    color: #898585;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    div {
      width: 33%;
      font-weight: 500;
      display: inline-flex;
      justify-content: start;
      align-items: center;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .singer {
      width: 20%;
    }

    .song {
      width: 226px;
    }

    .album {
      width: 30%;
    }

    .edit {
      width: 20%;
      display: inline-flex;
      justify-content: center;

      div {
        width: 30px;
      }
    }
  }

  .songs {
    width: calc(100% + 4%);
    height: 38px;
    display: flex;
    align-items: center;
    text-align: center;
    left: -4%;
    padding-left: 4%;
    div {
      display: inline-flex;
      justify-content: start;
      align-items: center;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
      white-space: nowrap !important;
    }

    .album-box {
      width: 30%;
    }

    .album {
      display: inline-block;
      text-align: left;
      width: 150px;
      height: 22px;
    }

    .singer {
      width: 100px;
    }

    .singers {
      width: 20%;
    }

    .song {
      width: 226px;
    }

    .edit {
      width: 20%;
      display: inline-flex;
      justify-content: center;

      div {
        width: 40px;
        height: 40px;
        display: inline-flex;
        justify-content: center;
      }

      svg {
        width: 18px;
        height: 18px;
      }

      .play {
        svg {
          width: 20px;
          height: 20px;
        }
      }

      path {
        fill: #b2aeae;
      }
      .collect {
        path {
          fill: #f04a4a;
        }
      }
      .play:hover {
        path {
          fill: #333333;
        }
      }

      .download:hover {
        path {
          fill: #333333;
        }
      }

      .collect:hover {
        path {
          fill: #333333;
        }
      }
    }
  }

  .zebra {
    background-color: #fafafa;
  }

  .songs:hover {
    background-color: #e5e5e5;
  }
}
</style>
