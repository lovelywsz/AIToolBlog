<script setup>
import { useRoute, useRouter } from 'vue-router'

const $route = useRoute()
const $router = useRouter()

defineProps({
  total: {
    type: Number,
    required: true
  },
  currentPage: {
    type: Number,
    required: true
  },
  pageSizeRef: {
    type: Number,
    required: true
  },
  layout: {
    type: String,
    required: true
  }
})

// 处理页码变化
const handleCurrentChange = (newPage) => {
  $router.push({
    query: {
      ...$route.query,
      page: newPage
    }
  })
}
</script>
<template>
  <div class="pagination">
    <el-pagination
      :total="total"
      :current-page="currentPage"
      :page-size="pageSizeRef"
      :layout="layout"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<style scoped>
.pagination {
  margin-top: 20px;
  text-align: center;
}
</style>
