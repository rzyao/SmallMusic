<template>
  <div class="songs-box no-select">
    <div class="title">
      <div class="name">歌名</div>
      <div class="singers">歌手</div>
      <div class="album">专辑</div>
    </div>
    <div class="list">
      <div class="song" v-for="(item, index) in props.songs" :key="item.id">
        <div :class="index % 2 == 0 ? 'black' : 'white'"></div>
        <div class="name">{{ item.name }}</div>
        <div class="singers" v-for="(singer, index) in item.singers" :key="singer.id">
          {{ singer.name }}
          <div class="oblique-line" v-if="index != item.singers.length - 1">/</div>
        </div>
        <div class="album">{{ item.album }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ songs: any[] }>();
</script>
<style lang="less" scoped>
.songs-box {
  width: 100%;
  height: 100%;
}
.title {
  color: #575656;
  display: flex;
  align-items: center;
  height: 30px;
  .name,
  .singers,
  .album {
    width: 30%;
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
  }
}
.name {
  margin-left: 10px;
}
.list {
  .song {
    height: 40px;
    text-align: center;
    display: flex;
    align-items: center;
    position: relative;
  }
  .name,
  .singers,
  .album {
    width: 30%;
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
  }
  .name {
    color: #000000;
  }
  .singers {
    color: rgba(0, 0, 0, 0.6);
  }
  .album {
    color: rgba(0, 0, 0, 0.6);
  }
}
.black {
  background-color: #f0efef;
  position: absolute;
  width: calc(100% + 80px);
  height: 40px;
  left: -40px;
}
.white {
  background-color: #ffffff;
  position: absolute;
  width: calc(100% + 80px);
  height: 40px;
  left: -40px;
}
.song:hover {
  .white {
    background-color: #d3d3d3;
    position: absolute;
    width: calc(100% + 80px);
    height: 40px;
    left: -40px;
  }
  .black {
    background-color: #d3d3d3;
    position: absolute;
    width: calc(100% + 80px);
    height: 40px;
    left: -40px;
  }
}
</style>
