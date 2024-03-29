import api from './axios-instance'
const BASE_URL = '/api/blogs' // 设置博客文章相关接口的基础 URL

// 获取评论
export const getComments = async (articleId) => {
  try {
    const response = await api.get(`${BASE_URL}/${articleId}/comments`)
    return response
  } catch (error) {
    console.error('Error fetching comments:', error)
    throw error
  }
}

// 发表评论
export const createComment = async (articleId, content) => {
  try {
    const response = await api.post(`${BASE_URL}/${articleId}/comments`, { content })
    return response
  } catch (error) {
    console.error('Error creating comment:', error)
    throw error
  }
}

// 删除评论
export const deleteComment = async (commentId) => {
  try {
    const response = await api.delete(`/api/comments/${commentId}`)
    return response
  } catch (error) {
    console.error('Error deleting comment:', error)
    throw error
  }
}
