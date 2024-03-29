<template>
  <div class="search-input">
    <el-input
      v-model="keyword"
      placeholder="请输入关键词"
      clearable
      @keyup.enter="handleSearch"
      @clear="handleClear"
    ></el-input>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// 获取路由实例
const router = useRouter()
const route = useRoute()
// 获取当前路由的查询参数 keyword
const keyword = ref(route.query.keyword || '')

// 监听查询参数的变化，并实时更新 keyword
watch(
  () => route.query.keyword,
  (value) => {
    keyword.value = value || ''
  }
)

const handleSearch = () => {
  routerPush(keyword.value)
}

// 处理输入框清除事件
const handleClear = () => {
  // 清除查询参数 keyword
  keyword.value = ''
  routerPush(null)
}

const routerPush = (keywordValue) => {
  router.push({ path: route.path, query: { ...route.query, keyword: keywordValue } })
}
</script>

<style scoped>
.search-input {
  width: 100%;
}
</style>
