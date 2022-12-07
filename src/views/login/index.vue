<template>
  <div class="login">
    <div class="close" @click.stop="close">
      <svg
        t="1669600333890"
        class="icon-close"
        viewBox="0 0 1024 1024"
        version="1.1"
        p-id="2668"
        width="20"
        height="20"
      >
        <path
          d="M525.269211 510.837524 918.101111 116.227118c7.17747-7.209192 7.14984-18.871813-0.059352-26.049283-7.210215-7.176446-18.87079-7.151887-26.049283 0.059352L499.278257 484.72889 106.563014 90.236164c-7.17747-7.209192-18.84009-7.235798-26.049283-0.059352-7.209192 7.17747-7.235798 18.84009-0.059352 26.049283L473.287303 510.837524 80.45438 905.446907c-7.176446 7.209192-7.150864 18.871813 0.059352 26.049283 3.593851 3.577478 8.29492 5.365194 12.994965 5.365194 4.727675 0 9.455349-1.809205 13.054317-5.424546l392.715243-394.491703 392.715243 394.491703c3.599991 3.615341 8.326643 5.424546 13.054317 5.424546 4.700045 0 9.402137-1.787716 12.994965-5.365194 7.209192-7.17747 7.235798-18.84009 0.059352-26.049283L525.269211 510.837524z"
          p-id="2669"
        ></path>
      </svg>
    </div>
    <div class="content">
      <div class="logo">Small Music</div>
      <a-input class="username" v-model:value="user" placeholder="用户名" style="width: 200px" />
      <a-input-password
        class="password"
        v-model:value="password"
        placeholder="请输入密码"
        style="width: 200px"
      />
      <div class="sign-in">登录</div>
      <div class="register"><a href="">注册</a></div>
    </div>
  </div>
</template>
<script lang="ts">
import { Input } from 'ant-design-vue';
import { ref } from 'vue';
export default {
  name: 'Login',
  components: { 'a-input': Input, 'a-input-password': Input.Password },
  setup() {
    const user = ref('');
    const password = ref('');
    const close = (): void => {
      const login = document.querySelector('#login');
      login?.remove();
    };
    return {
      user,
      password,
      close,
    };
  },
};
</script>
<style lang="less" scoped>
@import '@/views/login/login.less';
</style>
