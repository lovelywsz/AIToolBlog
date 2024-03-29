<script setup>
import usePageTitle from '@/hooks/usePageTitle'
import useNavToLogin from '@/hooks/useNavToLogin'
import useGetBlogList from '@/hooks/useGetBlogList'
import Pagination from './Pagination.vue'
import { deleteBlog } from '@/api/blogApi'
import { useRoute, useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'

const $router = useRouter()
// set page title
usePageTitle('my blog')

// jump to login page if not login
useNavToLogin()

// 获取博客列表
const { list, total, currentPage, pageSizeRef, layout, getBlogListFn } = useGetBlogList({
  my: true
})

// 点击编辑，跳转到编辑页面
const handleEdit = (row) => {
  $router.push(`/blog/${row.id}/edit`)
}

// 点击删除，删除博客
const handleDelete = async (row) => {
  const isDelete = await ElMessageBox.confirm('确认删除该blog吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
  // if click cancel, do nothing
  if (!isDelete) return
  try {
    await deleteBlog(row.id)
    getBlogListFn()
  } catch (error) {
    console.error(error)
  }
}
</script>
<template>
  <div class="title-container">
    <h1>My Blogs</h1>
    <router-link to="/create">
      <el-button type="primary">create blog</el-button>
    </router-link>
  </div>
  <!---use table to show blog list, include title category author likes favorites comments createdAt, and two option button: edit and delete  -->
  <el-table :data="list" style="width: 100%">
    <!--click title, redirect to blog detail page-->
    <el-table-column prop="title" label="title" width="180">
      <template #default="{ row }">
        <router-link :to="`/blog/${row.id}`">{{ row.title }}</router-link>
      </template>
    </el-table-column>
    <el-table-column prop="category" label="category" width="180" />
    <el-table-column prop="author" label="author" width="180" />
    <el-table-column prop="likes" label="likes" width="180" />
    <el-table-column prop="favorites" label="favorites" width="180" />
    <el-table-column prop="comments" label="comments" width="180" />
    <el-table-column prop="createdAt" label="createdAt" width="180" />
    <el-table-column label="operation" width="180">
      <template #default="{ row }">
        <el-button type="primary" @click="handleEdit(row)">edit</el-button>
        <el-button type="danger" @click="handleDelete(row)">delete</el-button>
      </template>
    </el-table-column>
  </el-table>
  <Pagination
    :total="total"
    :currentPage="currentPage"
    :pageSizeRef="pageSizeRef"
    :layout="layout"
  />
</template>

<style scoped>
h1 {
  text-align: center;
}
/* set the el-button show the right position and set h1 show the center position */
.title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
/* set the title show the center position */
.el-table {
  margin: 0 auto;
}
/* set the table show the center position */
.el-table-column {
  text-align: center;
}
/* set the table content show the center position */
</style>
