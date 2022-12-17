import toLogin from '@/views/login/login';
import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '@/layout/index.vue';
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      meta: { title: '首页' },
      component: Layout,
      redirect: '/Home',
      children: [
        {
          // 当 /home 匹配成功
          // home 将被渲染到 Layout 的 <router-view> 内部
          path: '/Home',
          name: 'Home',
          meta: { title: '发现音乐' },
          component: () => import('@/views/Home/index.vue'),
        },
        {
          path: '/MyLike',
          name: 'MyLike',
          meta: { title: '我喜欢的音乐' },
          component: () => import('@/views/MyFavorite/MyFavorite.vue'),
        },
        {
          path: '/Collection',
          name: 'Collection',
          meta: { title: '收藏的歌单' },
          component: () => import('@/views/Collection/Collection.vue'),
        },
        {
          path: '/CreatedList',
          name: 'CreatedList',
          meta: { title: '创建的歌单' },
          component: () => import('@/views/CreatedList/CreatedList.vue'),
        },
        {
          path: '/Chat',
          name: 'Chat',
          meta: { title: '聊天室' },
          component: () => import('@/views/Chat/index.vue'),
        },
        {
          path: '/LocalMusic',
          name: 'LocalMusic',
          meta: { title: '本地音乐' },
          component: () => import('@/views/LocalMusic/index.vue'),
        },
        {
          path: '/ListDetails',
          name: 'ListDetails',
          meta: { title: '歌单详情' },
          component: () => import('@/views/ListDetails/index.vue'),
        },
      ],
    },
  ],
});
const needLoginRouter: String[] = ['/Chat', '/CloudMusic'];
router.beforeEach((to, form, next) => {
  if (needLoginRouter.includes(to.path)) {
    toLogin();
    return;
  }
  next();
});
import { useRouteStore } from '@/stores/routeStore';
const { addHistoryRoute } = useRouteStore();

router.afterEach((to) => {
  console.log(to);
  addHistoryRoute(to.fullPath);
});
export default router;
export const hiddenRouterNames: string[] = ['ListDetails'];
