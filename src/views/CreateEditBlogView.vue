<script setup>
import usePageTitle from '@/hooks/usePageTitle'
import useNavToLogin from '@/hooks/useNavToLogin'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, reactive } from 'vue'
import { getBlogDetails, createBlog, editBlog } from '@/api/blogApi'
import { ElMessageBox } from 'element-plus'

const $router = useRouter()
const $route = useRoute()
// set page title
const id = $route.params.id
const title = id ? 'edit blog' : 'create blog'
usePageTitle(title)

// jump to login page if not login
useNavToLogin()

// when onMounted, if have id, get blog detail
const blogDetail = reactive({})
onMounted(async () => {
  if (!id) return
  const data = await getBlogDetails(id)
  blogDetail.title = data.title
  blogDetail.content = data.content
  blogDetail.category = data.category
})
// validate from
const validateForm = () => {
  if (!blogDetail.title) return alert('请输入标题')
  if (!blogDetail.content) return alert('请输入内容')
  if (!blogDetail.category) return alert('请选择类型')
  return true
}
// confirmSubmit
const confirmSubmit = async () => {
  const confirm = await ElMessageBox.confirm('确认提交吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
  return confirm === 'confirm'
}
// 处理提交事件
const handleSubmit = async () => {
  if (!validateForm()) return
  if (!(await confirmSubmit())) return
  const blogData = {
    title: blogDetail.title,
    content: blogDetail.content,
    category: blogDetail.category
  }
  if (id) {
    // 编辑
    await editBlog(id, blogData)
  } else {
    // 新增
    await createBlog(blogData)
  }
  $router.push('/myblogs')
}
</script>

<template>
  <div class="top-container">
    <div class="top-left">
      <h2>{{ title }}</h2>
    </div>
    <div class="top-right">
      <el-button type="primary" @click="handleSubmit">提交</el-button>
    </div>
  </div>
  <div class="title-container">
    <div class="title-left">
      <span>标题</span>
      <el-input v-model="blogDetail.title" placeholder="请输入标题"></el-input>
    </div>
    <div class="title-right">
      <span>类型</span>
      <el-select v-model="blogDetail.category" placeholder="请选择类型">
        <el-option label="前端" value="前端"></el-option>
        <el-option label="Java" value="Java"></el-option>
        <el-option label="Python" value="Python"></el-option>
        <el-option label="小程序" value="小程序"></el-option>
      </el-select>
    </div>
  </div>
  <div class="content-container">
    <el-input v-model="blogDetail.content" :rows="20" type="textarea" placeholder="请输入内容" />
  </div>
</template>

<style scoped>
.top-container {
  display: flex;
  justify-content: space-between;
}

.top-left {
  flex: 1;
}

.top-right {
  margin-left: 20px;
}
.title-container {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title-left,
.title-right {
  display: flex;
  align-items: center;
}
.title-left span,
.title-right span {
  display: inline-block;
  width: 60px;
}
.title-left .el-input {
  width: 500px;
}
.title-right .el-select {
  width: 200px;
}
.content-container {
  margin-top: 30px;
}
</style>
