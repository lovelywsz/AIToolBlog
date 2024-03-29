import api from './axios-instance'

const BASE_URL = '/api/blogs' // 设置博客文章相关接口的基础 URL

// 获取文章列表
export async function getBlogList(opt = {}) {
  const { page = 1, pageSize = 10, category = '', keyword = '', my = false } = opt
  const url = `${BASE_URL}?page=${page}&pageSize=${pageSize}&category=${category}&keyword=${keyword}&my=${my}`
  return api.get(url)
}

// 获取文章详情
export async function getBlogDetails(blogId) {
  return api.get(`${BASE_URL}/${blogId}`)
}

// 发布文章
export async function createBlog(data) {
  return api.post(BASE_URL, data)
}

// 编辑文章
export async function editBlog(id, data) {
  return api.put(`${BASE_URL}/${id}`, data)
}

// 删除文章
export async function deleteBlog(id) {
  return api.delete(`${BASE_URL}/${id}`)
}

// 点赞文章
export async function likeBlog(id) {
  return api.post(`${BASE_URL}/${id}/like`)
}

// 取消点赞文章
export async function unlikeBlog(id) {
  return api.delete(`${BASE_URL}/${id}/like`)
}

// 收藏文章
export async function favoriteBlog(id) {
  return api.post(`${BASE_URL}/${id}/favorite`)
}

// 取消收藏文章
export async function unfavoriteBlog(id) {
  return api.delete(`${BASE_URL}/${id}/favorite`)
}

// 导出接口函数
export default {
  getBlogList,
  getBlogDetails,
  createBlog,
  editBlog,
  deleteBlog,
  likeBlog,
  unlikeBlog,
  favoriteBlog,
  unfavoriteBlog
}
