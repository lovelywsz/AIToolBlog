<template>
  <div class="menu">
    <el-menu :default-active="activeMenu" class="menu" mode="horizontal" @select="handleMenuSelect">
      <el-menu-item index="frontend">前端</el-menu-item>
      <el-menu-item index="java">Java</el-menu-item>
      <el-menu-item index="python">Python</el-menu-item>
      <el-menu-item index="mini-program">小程序</el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
import { watch, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

// 获取路由实例
const router = useRouter()
const route = useRoute()

// 监听route.query.category的变化，更新activeMenu
const activeMenu = ref('')
watch(
  () => route.query.category,
  (val) => {
    activeMenu.value = val
  }
)

// 处理菜单选择事件
const handleMenuSelect = (index) => {
  // 跳转到首页，并加上相应的查询参数
  router.push({ path: '/', query: { category: index } })
}
</script>

<style scoped>
.menu {
  width: 100%;
}
.el-menu {
  background: none !important;
}
.el-menu--horizontal.el-menu {
  border-bottom: none !important;
}
.el-menu--horizontal > .el-menu-item {
  margin-right: 20px !important;
}
</style>
