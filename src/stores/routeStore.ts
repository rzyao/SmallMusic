import { reactive, computed, ref } from 'vue';
import { defineStore } from 'pinia';
export const useRouteStore = defineStore('routeStore', () => {
  // 历史路由记录
  const historyRoute = reactive<string[]>([]);
  // 当前路由
  const currentRoute = ref('');
  // 路由跳转的方式是否是go
  const routeMode = ref('push');
  const currtIndex = ref(-1);
  // 指定路由跳转方式是go
  function designRouteGo(str: string) {
    routeMode.value = str;
  }
  // fullpath to obj
  function fullPathToObj(fullPath: string) {
    const obj: any = {};
    const arr = fullPath.split('?');
    obj.path = arr[0];
    if (arr[1]) {
      const params = arr[1].split('&');
      params.forEach((item) => {
        const param = item.split('=');
        const query: any = {};
        query[param[0]] = param[1];
        obj.query = query;
      });
    }
    return obj;
  }
  // 添加路由
  function addHistoryRoute(fullPath: string) {
    const route = fullPathToObj(fullPath);
    if (routeMode.value == 'push') {
      historyRoute.splice(currtIndex.value + 1, historyRoute.length - currtIndex.value);
      historyRoute.push(route);
      currtIndex.value++;
      currentRoute.value = route;
    } else if (routeMode.value == 'back') {
      currtIndex.value--;
    } else if (routeMode.value == 'next') {
      currtIndex.value++;
    }
    routeMode.value = 'push';
  }
  // 当前路由是不是第一个
  const isFirst = computed(() => currtIndex.value == 0);
  // 当前路由是不是最后一个
  const isLast = computed(() => currtIndex.value == historyRoute.length - 1);

  return {
    currtIndex,
    designRouteGo,
    addHistoryRoute,
    historyRoute,
    isFirst,
    isLast,
  };
});
