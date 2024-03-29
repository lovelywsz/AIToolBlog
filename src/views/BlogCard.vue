<template>
  <div class="blog-card" @mouseover="handleMouseOver" @mouseleave="handleMouseLeave">
    <div class="blog-header">
      <div class="author">
        <el-icon><User /></el-icon>
        {{ blog.author }}
      </div>
      <div class="category">
        <el-icon><PriceTag /></el-icon>
        {{ blog.category }}
      </div>
      <div class="time">
        <el-icon><Clock /></el-icon>
        {{ formatDate(blog.updatedAt) }}
      </div>
    </div>
    <div class="blog-content">
      <h2 class="title" @click="redirectToBlog">{{ blog.title }}</h2>
      <p class="description">{{ blog.description }}</p>
    </div>
    <div class="blog-footer">
      <div class="likes">
        <el-icon><Pointer /></el-icon>
        {{ blog.likes }}
      </div>
      <div class="favorites">
        <el-icon><Star /></el-icon>
        {{ blog.favorites }}
      </div>
      <div class="comments">
        <el-icon><ChatDotRound /></el-icon>
        {{ blog.comments }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { formatDate } from '@/utils/date'

// 定义props
const props = defineProps({
  blog: {
    type: Object,
    required: true
  }
})
const router = useRouter()

// 处理鼠标 hover 效果
const handleMouseOver = () => {
  document.querySelector('.blog-card').style.backgroundColor = '#f0f0f0'
}

const handleMouseLeave = () => {
  document.querySelector('.blog-card').style.backgroundColor = 'transparent'
}

// 跳转到博客详情页
const redirectToBlog = () => {
  router.push(`/blog/${props.blog.id}`)
}
</script>

<style scoped>
.blog-card {
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  cursor: pointer;
  margin-bottom: 20px;
}

.blog-card:hover {
  background-color: #f0f0f0;
}

.blog-header {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
}

.blog-header div {
  display: flex;
  align-items: center;
  margin-right: 25px;
}

.blog-content {
  margin-bottom: 10px;
}

.title {
  margin-bottom: 5px;
  cursor: pointer;
}

.blog-footer {
  display: flex;
  justify-content: flex-start;
}

.blog-footer div {
  margin-right: 20px;
}

.blog-card .el-icon {
  margin-right: 2px;
}
</style>
