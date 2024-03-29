<script setup>
import { ref } from 'vue'
import usePageTitle from '@/hooks/usePageTitle'
import BlogCard from '@/views/BlogCard.vue'
import useGetBlogList from '@/hooks/useGetBlogList'
import Pagination from './Pagination.vue'

// 设置网页标题
usePageTitle('首页')

// 获取博客列表
const { list, total, currentPage, pageSizeRef, layout } = useGetBlogList()
</script>

<template>
  <main>
    <div v-for="item in list" :key="item.id">
      <BlogCard :blog="item" />
    </div>
    <Pagination
      :total="total"
      :currentPage="currentPage"
      :pageSizeRef="pageSizeRef"
      :layout="layout"
    />
  </main>
</template>

<style scoped></style>
