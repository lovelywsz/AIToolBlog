<script setup>
import { useRoute } from 'vue-router'
import { getBlogDetails, favoriteBlog, unfavoriteBlog, likeBlog, unlikeBlog } from '@/api/blogApi'
import { ref, onMounted, reactive, toRef, toRaw } from 'vue'
import usePageTitle from '@/hooks/usePageTitle'
import { formatDate } from '@/utils/date'
import MarkdownIt from 'markdown-it'
import { Pointer, Star } from '@element-plus/icons-vue'
import CommentView from './sub-views/CommentView.vue'

const $route = useRoute()
const blogInfo = reactive({})
const md = new MarkdownIt()

// when onMounted get blog detail
const blogId = $route.params.id || ''
onMounted(async () => {
  const res = await getBlogDetails(blogId)
  blogInfo.title = res.title
  blogInfo.content = res.content
  blogInfo.author = res.author
  blogInfo.category = res.category
  blogInfo.updatedAt = res.updatedAt
  blogInfo.likes = res.likes
  blogInfo.favorites = res.favorites
  blogInfo.comments = res.comments
  blogInfo.id = res.id
  blogInfo.description = res.description
  blogInfo.isFavorited = res.isFavorited
  blogInfo.isLiked = res.isLiked
})
// edit title
usePageTitle(toRef(blogInfo, 'title'))
//function to handle like
const handleLike = async () => {
  if (blogInfo.isLiked) {
    await unlikeBlog(blogId)
    blogInfo.likes -= 1
    blogInfo.isLiked = false
  } else {
    await likeBlog(blogId)
    blogInfo.likes += 1
    blogInfo.isLiked = true
  }
}
// function to handle favorite
const handleFavorite = async () => {
  if (blogInfo.isFavorited) {
    await unfavoriteBlog(blogId)
    blogInfo.favorites -= 1
    blogInfo.isFavorited = false
  } else {
    await favoriteBlog(blogId)
    blogInfo.favorites += 1
    blogInfo.isFavorited = true
  }
}
</script>

<template>
  <div class="blog-detail">
    <h1 class="title">{{ blogInfo.title }}</h1>
    <div class="intro">
      <div class="author">
        <el-icon><User /></el-icon>
        {{ blogInfo.author }}
      </div>
      <div class="category">
        <el-icon><PriceTag /></el-icon>
        {{ blogInfo.category }}
      </div>
      <div class="time">
        <el-icon><Clock /></el-icon>
        {{ formatDate(blogInfo.updatedAt) }}
      </div>
    </div>
    <div class="content" v-html="md.render(toRaw(blogInfo.content) || '')"></div>
    <!-- create div to show likes and favorites content, set center -->
    <div class="blog-footer">
      <el-button
        :type="blogInfo.isLiked ? 'primary' : 'default'"
        :icon="Pointer"
        size="large"
        @click="handleLike"
      >
        {{ blogInfo.likes }}点赞
      </el-button>
      <el-button
        :type="blogInfo.isFavorited ? 'primary' : 'default'"
        :icon="Star"
        size="large"
        @click="handleFavorite"
      >
        {{ blogInfo.favorites }}收藏
      </el-button>
    </div>
    <!-- create div to show comments content -->
    <CommentView />
  </div>
</template>

<style scoped>
.blog-detail {
  padding: 20px;
}
.blog-detail .title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}
.blog-detail .intro {
  display: flex;
  justify-content: space-between;
}
.blog-detail .author,
.blog-detail .category,
.blog-detail .time {
  margin-bottom: 10px;
}
.blog-detail .content {
  margin-top: 20px;
}
.blog-detail .blog-footer {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
