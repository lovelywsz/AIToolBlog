import axios from 'axios'

// 创建 Axios 实例
const api = axios.create({
  baseURL: 'http://localhost:3000', // 设置基础请求 URL
  timeout: 10000, // 设置请求超时时间，单位毫秒
  headers: {
    'Content-Type': 'application/json' // 设置请求头为 JSON 格式
  }
})

// 请求拦截器，用于在请求发送前做一些处理，比如设置请求头
api.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    // 例如：添加 token 到请求头
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 响应拦截器，用于在接收到响应后做一些处理，比如处理错误信息
api.interceptors.response.use(
  (response) => {
    // response.data的数据结构是{status, data, message}
    // 根据status是否是'success'来判断请求是否成功
    const resData = response.data || {}
    if (resData.status === 'success') {
      return resData.data
    } else {
      console.error('Error:', resData.message)
      return Promise.reject(resData.message)
    }
  },
  (error) => {
    // 对响应错误做些什么
    if (error.response) {
      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      console.error('Error status:', error.response.status)
      console.error('Error data:', error.response.data)
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      console.error('No response received:', error.request)
    } else {
      // 其他错误
      console.error('Error:', error.message)
    }
    return Promise.reject(error)
  }
)

// 发送 GET 请求
export const get = (url, params) => {
  return api.get(url, { params })
}

// 发送 POST 请求
export const post = (url, data) => {
  return api.post(url, data)
}

// 发送 PUT 请求
export const put = (url, data) => {
  return api.put(url, data)
}

// 发送 DELETE 请求
export const del = (url) => {
  return api.delete(url)
}

export default api
