import api from './axios-instance'
const BASE_URL = '/api/users' // 设置用户相关接口的基础 URL

// 用户登录
export const loginUser = async (username, password) => {
  try {
    const response = await api.post(`${BASE_URL}/login`, { username, password })
    return response
  } catch (error) {
    console.error('Error logging in user:', error)
    throw error
  }
}

// 用户注册
export const registerUser = async (username, password, email) => {
  try {
    const response = await api.post(`${BASE_URL}/register`, { username, password, email })
    return response
  } catch (error) {
    console.error('Error registering user:', error)
    throw error
  }
}

// 获取用户信息
export const getUserInfo = async () => {
  try {
    const response = await api.get(`${BASE_URL}/me`)
    return response
  } catch (error) {
    console.error('Error fetching user info:', error)
  }
}
