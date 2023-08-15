import axios from 'axios';

// axios 配置
axios.defaults.timeout = 8000;
axios.defaults.baseURL = 'https://music.ayaoblog.space';

// http request 拦截器
axios.interceptors.request.use(
  (config) => {
    if (localStorage.token) {
      //判断token是否存在
      config.headers.Authorization = localStorage.token; //将token设置成请求头
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// http response 拦截器
axios.interceptors.response.use(
  (response) => {
    if (response.data.code === 999) {
      alert('token过期');
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axios;
