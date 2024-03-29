import { getBlogList } from '@/api/blogApi'
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

function useGetBlogList(opt = {}) {
  const { my = false } = opt
  const $route = useRoute()

  // define list total
  const list = ref([])
  const total = ref(0)
  const currentPage = ref(1) // 当前页码
  const pageSizeRef = ref(10) // 默认每页显示10条数据
  const layout = ref('prev, pager, next, jumper, ->, total') // 分页器布局

  //获取博客列表
  // use watchEffect url query page pagesize category keyword, get blog list
  const getBlogListFn = async () => {
    currentPage.value = +$route.query.page || 1
    pageSizeRef.value = +$route.query.pageSize || 10
    console.log($route.query)
    const queryInfo = {
      page: +$route.query.page || 1,
      pageSize: +$route.query.pageSize || 10,
      category: $route.query.category || '',
      keyword: $route.query.keyword || '',
      my // 是否是我的文章
    }

    const { list: blogList, total: blogTotal } = await getBlogList(queryInfo)
    list.value = blogList
    total.value = blogTotal
  }
  watchEffect(getBlogListFn)
  return { list, total, currentPage, pageSizeRef, layout, getBlogListFn }
}

export default useGetBlogList
