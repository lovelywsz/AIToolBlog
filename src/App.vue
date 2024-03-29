<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavMenu from './views/NavMenu.vue'
import SearchInput from './views/SearchInput.vue'
import UserInfo from './views/UserInfo.vue'
import { getUserInfo } from './api/userApi'
import { useUserStore } from './stores/user'

const { setUserInfo } = useUserStore()
// 获取用户信息
getUserInfo().then((res) => {
  setUserInfo(res)
})
</script>

<template>
  <div class="app">
    <!-- 导航栏 -->
    <div class="navbar">
      <!-- 左侧部分 -->
      <div class="navbar-left">
        <!-- Logo -->
        <div class="logo">
          <RouterLink to="/"> <h1>tech blog</h1></RouterLink>
        </div>
        <!-- 导航菜单 -->
        <NavMenu />
        <!-- 搜索框 -->
        <SearchInput />
      </div>
      <!-- 右侧部分 -->
      <div class="navbar-right">
        <!-- 登录链接 -->
        <UserInfo />
      </div>
    </div>
    <!-- 主体部分 -->
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.app {
  width: 100%;
}

.navbar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f5f5;
  padding: 0 20px;
  border-bottom: 1px solid #ddd;
}

.navbar-left {
  display: flex;
  align-items: center;
}
.logo h1 {
  width: 180px;
  height: 40px;
  font-size: 28px;
}
.logo a {
  color: #333;
  text-decoration: none;
}

.navbar-right {
  display: flex;
  align-items: center;
}

.main {
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
</style>
