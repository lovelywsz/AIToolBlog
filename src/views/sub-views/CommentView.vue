<script setup>
import { getComments, deleteComment, createComment } from '@/api/commentApi'
import { ElMessageBox } from 'element-plus'
import { ref, onMounted, watchEffect } from 'vue'
import { formatDate } from '@/utils/date'
import { useUserStore } from '@/stores/user'
import { useRoute } from 'vue-router'

const $route = useRoute()
const blogId = $route.params.id || ''

const { userInfo } = useUserStore()

//get commentList
const commentList = ref([])
async function getCommentList() {
  const res = await getComments(blogId)
  commentList.value = res
}

onMounted(getCommentList)

// delete comment
const handleDeleteComment = async (id) => {
  // element puls confirm 确认是否删除
  const isDelete = await ElMessageBox.confirm('确认删除该评论吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
  // if click cancel, do nothing
  if (!isDelete) return
  await deleteComment(id)
  getCommentList()
}
// create comment
const commentForm = ref({
  content: ''
})
const commentRules = {
  content: [{ required: true, message: '请输入评论内容', trigger: 'blur' }]
}
const handleComment = async () => {
  await createComment(blogId, commentForm.value)
  commentForm.value.content = ''
  getCommentList()
}

// watchEffect(() => {
//   console.log(commentList.value)
// })
</script>
<template>
  <!--create comment-->
  <div class="comment-form">
    <el-form :model="commentForm" ref="commentFormRef" :rules="commentRules" label-width="80px">
      <el-form-item label="发表评论" prop="content">
        <el-input
          type="textarea"
          v-model="commentForm.content"
          placeholder="请输入评论内容"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleComment">评论</el-button>
      </el-form-item>
    </el-form>
  </div>
  <!--comment list show author createdAt content -->
  <div class="comment-list">
    <div class="comment-item" v-for="item in commentList" :key="item.id">
      <div class="comment-item-header">
        <span
          ><el-icon><User /></el-icon>{{ item.authorNickname }}</span
        >
        <span>{{ formatDate(item.createdAt) }}</span>
        <div class="right">
          <!--if item.authorNickname == userInfo.username show the delete el-button-->
          <el-button
            v-if="item.authorNickname === userInfo.nickname"
            link
            type="primary"
            @click="handleDeleteComment(item.id)"
            >删除</el-button
          >
        </div>
      </div>
      <div class="comment-item-content">{{ item.content }}</div>
    </div>
  </div>
</template>
<style scoped>
.comment-form {
  margin: 20px 0;
}

.comment-list {
  margin-top: 20px;
}
.comment-item {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #f0f0f0;
}
.comment-item-header {
  margin-bottom: 10px;
  overflow: hidden;
}
.comment-item-header span {
  margin-right: 10px;
}
.comment-item-header .right {
  color: #999;
  float: right;
  cursor: pointer;
}
.comment-item-content {
  margin-bottom: 10px;
}
</style>
