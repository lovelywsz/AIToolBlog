// usePageTitle.js
import { ref, isRef, onMounted, onBeforeUnmount, watchEffect } from 'vue'

const NAME = 'TechBlog'

function usePageTitle(title) {
  const originalTitle = ref(document.title)
  // 设置网页标题
  const setPageTitle = () => {
    const titleValue = isRef(title) ? title.value : title
    if (!titleValue) {
      return
    }
    document.title = titleValue + '-' + NAME
  }

  if (isRef(title)) {
    watchEffect(setPageTitle)
  }

  // 在组件挂载时设置网页标题
  onMounted(() => {
    setPageTitle()
  })

  // 在组件卸载时重置网页标题
  onBeforeUnmount(() => {
    document.title = originalTitle.value
  })

  return {
    setPageTitle
  }
}
export default usePageTitle
