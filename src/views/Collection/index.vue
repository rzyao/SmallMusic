<template>
  <div class="content-box no-select">
    <div class="content">
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="songs" tab="歌曲">
          <songsVue :songs="songs.list"></songsVue>
        </a-tab-pane>
        <a-tab-pane key="lists" tab="歌单">Content of Tab Pane 2</a-tab-pane>
        <a-tab-pane key="albums" tab="专辑">Content of Tab Pane 3</a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import songsVue from './songs.vue';
import { ref, onMounted, reactive } from 'vue';
import { db } from '@/untils/dexie/db';
const activeKey = ref('songs');
onMounted(() => {
  querysongs();
});
const list: any[] = [];
const songs = reactive({ list });
async function querysongs() {
  const res = await db.songs.toArray();
  /*  res的值,数组
  [
    {
        "id": "240515",
        "name": "香水有毒",
        "singers": "[{\"id\":1021056,\"name\":\"胡杨林\",\"tns\":[],\"alias\":[]}]",
        "album": "香水有毒(宣传单曲)"
    }
  ]
  */
  res.forEach((element) => {
    element.singers = JSON.parse(element.singers);
  });
  console.log(res);
  // songs.list = res;
}
songs.list = [
  {
    id: '115569',
    name: '护花使者',
    singers: [
      {
        id: 3699,
        name: '李克勤',
        tns: [],
        alias: [],
      },
    ],
    album: '雨中街头剧',
  },
  {
    id: '144380',
    name: '天涯',
    singers: [
      {
        id: 4895,
        name: '任贤齐',
        tns: [],
        alias: [],
      },
    ],
    album: '为爱走天涯',
  },
  {
    id: '144513',
    name: '伤心太平洋',
    singers: [
      {
        id: 4895,
        name: '任贤齐',
        tns: [],
        alias: [],
      },
    ],
    album: '爱像太平洋',
  },
  {
    id: '156374',
    name: '突然的自我',
    singers: [
      {
        id: 222871,
        name: '伍佰 & China Blue',
        tns: [],
        alias: [],
      },
    ],
    album: '忘情1015精选辑',
  },
  {
    id: '157288',
    name: '挪威的森林',
    singers: [
      {
        id: 222871,
        name: '伍佰 & China Blue',
        tns: [],
        alias: [],
      },
    ],
    album: '爱情的尽头',
  },
  {
    id: '168091',
    name: '蓝莲花',
    singers: [
      {
        id: 5770,
        name: '许巍',
        tns: [],
        alias: [],
      },
    ],
    album: '时光.漫步',
  },
  {
    id: '186315',
    name: '刀剑如梦',
    singers: [
      {
        id: 6456,
        name: '周华健',
        tns: [],
        alias: [],
      },
    ],
    album: 'Keep Wakin 1987-2002 周而复始',
  },
  {
    id: '190559',
    name: '单恋一枝花',
    singers: [
      {
        id: 6469,
        name: '张宇',
        tns: [],
        alias: [],
      },
    ],
    album: '单恋',
  },
  {
    id: '240515',
    name: '香水有毒',
    singers: [
      {
        id: 1021056,
        name: '胡杨林',
        tns: [],
        alias: [],
      },
    ],
    album: '香水有毒(宣传单曲)',
  },
  {
    id: '329218',
    name: '痴心换情深',
    singers: [
      {
        id: 10577,
        name: '周慧敏',
        tns: [],
        alias: [],
      },
    ],
    album: '痴心换情深',
  },
  {
    id: '36871866',
    name: '隐形的翅膀 (Live)',
    singers: [
      {
        id: 10562,
        name: '张韶涵',
        tns: [],
        alias: [],
      },
    ],
    album: '隐藏的歌手 第六期',
  },
  {
    id: '5250472',
    name: '有一种爱叫做放手',
    singers: [
      {
        id: 1881,
        name: '阿木',
        tns: [],
        alias: [],
      },
    ],
    album: '当流行遇上发烧时',
  },
  {
    id: '77158',
    name: '冲动的惩罚',
    singers: [
      {
        id: 2517,
        name: '刀郎',
        tns: [],
        alias: [],
      },
    ],
    album: '谢谢你',
  },
  {
    id: '86369',
    name: '偏爱',
    singers: [
      {
        id: 10572,
        name: '张芸京',
        tns: [],
        alias: [],
      },
    ],
    album: '仙剑奇侠传三 电视原声带',
  },
  {
    id: '94689',
    name: '海浪',
    singers: [
      {
        id: 3079,
        name: '黄品源',
        tns: [],
        alias: [],
      },
    ],
    album: '海浪',
  },
];
</script>
<style lang="less" scoped>
.content-box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  .content {
    width: 96%;
    height: 100%;
  }
}
.content-box /deep/ .ant-tabs-content-holder {
  overflow: visible;
}

.content-box /deep/ .ant-tabs {
  overflow: visible;
}
</style>
