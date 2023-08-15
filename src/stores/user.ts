import { ref } from 'vue';
import { defineStore } from 'pinia';
import { db } from '@/untils/dexie/db';
export const useUserStore = defineStore('userStore', () => {
  // 定义token
  const token = ref('');
  // 改变状态
  function changeToken(Token: string) {
    token.value = Token;
  }
  // 从数据库获取token
  function getToken() {
    db.options.get('token').then((res) => {
      if (res) {
        changeToken(res.value);
      }
    });
  }
  // 定义百度token
  const baidu_access_token = ref('');
  // 改变状态
  function changeBaiduAccessToken(Token: string) {
    baidu_access_token.value = Token;
  }
  // 从数据库获取百度token
  function getBaiduAccessToken() {
    db.options.get('baidu_access_token').then((res) => {
      if (res) {
        changeBaiduAccessToken(res.value);
      }
    });
  }
  // 刷新userStore
  function refreshUserStore() {
    getToken();
    getBaiduAccessToken();
  }
  return {
    token,
    changeToken,
    baidu_access_token,
    changeBaiduAccessToken,
    refreshUserStore,
  };
});
