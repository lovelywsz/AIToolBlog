<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
const { userInfo, clearUserInfo } = useUserStore()

const router = useRouter()

// 处理菜单命令
const handleCommand = (command) => {
  switch (command) {
    case 'create':
      router.push({ path: '/create' })
      break
    case 'myblogs':
      router.push({ path: '/myblogs' })
      break
    case 'logout':
      logout()
      break
    default:
      break
  }
}

// 注销函数
const logout = () => {
  // clear user info
  clearUserInfo()
  // clear token
  localStorage.removeItem('token')
  router.push({ path: '/login' })
}
</script>
<template>
  <div>
    <div class="dropdown-menu" v-if="userInfo.nickname">
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="nickname">
          {{ userInfo.nickname || userInfo.username }}
          <el-icon><arrow-down /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="create">
              <el-icon><Edit /></el-icon>
              创建博客
            </el-dropdown-item>
            <el-dropdown-item command="myblogs"
              ><el-icon><Files /></el-icon>我的博客</el-dropdown-item
            >
            <el-dropdown-item command="logout"
              ><el-icon><Close /></el-icon>注销</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <RouterLink v-else to="/login">登录</RouterLink>
  </div>
</template>
