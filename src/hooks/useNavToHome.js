import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { watch } from 'vue'

// watch userInfo.username if have value, redirect to home page
function useNavToHome() {
  const router = useRouter()
  const { userInfo } = useUserStore()
  watch(
    () => userInfo.username,
    (value) => {
      if (value) {
        router.push('/')
      }
    },
    { immediate: true }
  )
}
export default useNavToHome
