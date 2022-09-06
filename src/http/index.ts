import axios from 'axios';
import { ElMessage } from 'element-plus';
import qs from "qs";

// 枚举错误
enum MSGG {
  "操作成功" = 200,
  "密码错误",
  "账号错误",
  "请求异常"
}

// 创建http实例
const $http = axios.create({
  baseURL: "https://www.fastmock.site/mock/323354e56ef21147c3f550e18435baa1/api",
  timeout: 2000,
  headers: {
    "Content-Type": "application/json;chartset=utf-8"
  }
});

// 请求拦截
$http.interceptors.request.use(config => {
  config.headers = config.headers || {}
  if(localStorage.getItem('token')) {
    config.headers.token = localStorage.getItem('token') || ''
  }
  return config;
});

// 处理返回数据
$http.interceptors.response.use(res => {
  const code:number = res.data.code;

  if (code !== 200) {
    // 报错
    ElMessage({
      showClose: true,
      message: MSGG[code],
      type: 'error',
    })
    return Promise.reject(res.data);
  }
  return res.data;
}, err => {
  // 请求失败
  console.log(err);
});

export default $http;