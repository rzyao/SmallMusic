<template>
  <div class="content-box">
    <div class="content">
      <div class="recommend">
        <div class="recommend-word">推荐歌单</div>
      </div>
      <div class="lists-box">
        <div
          class="song-lists"
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
import { ref, onMounted, reactive } from 'vue';
export default {
  name: 'Home',
  components: {},
  setup() {
    const user = ref('');
    const password = ref('');
    const router = useRouter();
    const menuData = router.getRoutes();
    console.log(menuData);
    const res = {
      hasTaste: false,
      code: 200,
      category: 0,
      result: [
        {
          id: 3067882013,
          type: 0,
          name: '用音乐保持你每天的嘴角上扬',
          copywriter: '',
          picUrl: 'https://p1.music.126.net/hLv4YJOiLTE16LlRpdxZgQ==/109951164152314267.jpg',
          canDislike: true,
          trackNumberUpdateTime: 1669191426061,
          playCount: 41421076,
          trackCount: 116,
          highQuality: false,
          alg: 'alg_high_quality',
        },
        {
          id: 2645509561,
          type: 0,
          name: '男生的温柔侵入心底 珊瑚长出海面伸向月亮',
          copywriter: '',
          picUrl: 'https://p1.music.126.net/x44v5IkLN30gWgUYWYivbg==/109951164000997664.jpg',
          canDislike: true,
          trackNumberUpdateTime: 1669643538100,
          playCount: 37092240,
          trackCount: 215,
          highQuality: false,
          alg: 'alg_high_quality',
        },
        {
          id: 128871831,
          type: 0,
          name: '不让你通宵循环的电音不是好电音',
          copywriter: '',
          picUrl: 'https://p1.music.126.net/uFWcdYyjcqvM5JFZ5nsPGw==/1365593453032084.jpg',
          canDislike: true,
          trackNumberUpdateTime: 1622107703878,
          playCount: 38212764,
          trackCount: 53,
          highQuality: false,
          alg: 'alg_high_quality',
        },
        {
          id: 2230318386,
          type: 0,
          name: '予你情诗百首，余生你是我的所有',
          copywriter: '',
          picUrl: 'https://p1.music.126.net/hoGRbppqaUIYkKpQGPwilw==/109951168031132211.jpg',
          canDislike: true,
          trackNumberUpdateTime: 1668258486028,
          playCount: 63431568,
          trackCount: 105,
          highQuality: false,
          alg: 'alg_high_quality',
        },
        {
          id: 6988887522,
          type: 0,
          name: '深夜歌单 | 凌晨三点的心碎时刻',
          copywriter: '',
          picUrl: 'https://p1.music.126.net/cpZSb2GhX9PH4beMxQuapg==/109951166455937461.jpg',
          canDislike: true,
          trackNumberUpdateTime: 1669168281139,
          playCount: 39349196,
          trackCount: 110,
          highQuality: false,
          alg: 'alg_high_quality',
        },
        {
          id: 2900343697,
          type: 0,
          name: '[一周影视热歌] 《在你的冬夜里闪耀》原声上线',
          copywriter: '',
          picUrl: 'https://p1.music.126.net/ZRK_iaFyj8wyrHN_ygNlMw==/109951168087919388.jpg',
          canDislike: true,
          trackNumberUpdateTime: 1669327200000,
          playCount: 24668756,
          trackCount: 30,
          highQuality: false,
          alg: 'alg_high_quality',
        },
        {
          id: 5137419858,
          type: 0,
          name: '二十岁后的人生像是按了加快键',
          copywriter: '',
          picUrl: 'https://p1.music.126.net/ATce5mCIf_GqCLBqJcmzTg==/109951165166142900.jpg',
          canDislike: true,
          trackNumberUpdateTime: 1669368302302,
          playCount: 30226576,
          trackCount: 280,
          highQuality: false,
          alg: 'alg_high_quality',
        },
        {
          id: 2047424322,
          type: 0,
          name: '夜晚温柔粤语女声 唱出谁的不眠心事',
          copywriter: '',
          picUrl: 'https://p1.music.126.net/4uiy7t752A4HHF2bwqVj1A==/109951164812388197.jpg',
          canDislike: true,
          trackNumberUpdateTime: 1669505219836,
          playCount: 22879480,
          trackCount: 126,
          highQuality: false,
          alg: 'alg_high_quality',
        },
        {
          id: 2229469033,
          type: 0,
          name: '「纯音乐」你偶尔需要安静的发泄',
          copywriter: '',
          picUrl: 'https://p1.music.126.net/QCtK5ro1zrnXFmjLUIW4qg==/109951167308852599.jpg',
          canDislike: true,
          trackNumberUpdateTime: 1666671974439,
          playCount: 24627706,
          trackCount: 145,
          highQuality: false,
          alg: 'alg_high_quality',
        },
        {
          id: 2610231104,
          type: 0,
          name: '你曾经有多认真的喜欢一个人',
          copywriter: '',
          picUrl: 'https://p1.music.126.net/eOTnvmGVSb3S2MIYmo2IGA==/109951163910753373.jpg',
          canDislike: true,
          trackNumberUpdateTime: 1669358559947,
          playCount: 32828550,
          trackCount: 240,
          highQuality: false,
          alg: 'alg_high_quality',
        },
      ],
    };
    const songLists = reactive(res.result);
    onMounted(async () => {
      // const res = await getLists(10);
      // console.log(res);
    });
    // async function getLists(params: number) {
    //   // const result = await window.musicApi.getLists(params);
    //   console.log(result, params);
    //   return result;
    // }
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
