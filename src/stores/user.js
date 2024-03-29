import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  // define userInfo, inclose username nickname
  const userInfo = reactive({
    username: 'admin',
    nickname: 'admin'
  })
  //set userInfo
  function setUserInfo(info) {
    userInfo.username = info.username
    userInfo.nickname = info.nickname
  }
  // clear userInfo
  function clearUserInfo() {
    userInfo.username = ''
    userInfo.nickname = ''
  }

  return {
    userInfo,
    setUserInfo,
    clearUserInfo
  }
})
