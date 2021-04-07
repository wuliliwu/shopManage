
import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseUrl:'http://10.36.136.83:8001/index/Api',
    timeout:10000,
  })
  // 请求截栏
  instance.interceptors.request.use((config)=> {
    config.headers.Authorization = 'token'
    return config
  },(err)=> {
    return Promise.reject(err)
  })
  // 响应截栏
  instance.interceptors.response.use((res)=>{
    // console.log(res)
    return res.data
  },(err)=>{
    return Promise.reject(err)
  })
  // 发送真正的网络请求
  return instance(config)

}


