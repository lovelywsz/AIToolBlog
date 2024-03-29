<template>
  <div class="login-page">
    <div class="title">用户登录</div>
    <el-form
      :model="loginForm"
      :rules="loginFormRules"
      ref="loginFormRef"
      class="login-form"
      label-width="100px"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password" type="password" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit(loginFormRef)">登录</el-button>
      </el-form-item>
      <el-form-item>
        <router-link to="/register">还没有账号？立即注册</router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus'
import { useRouter } from 'vue-router'
import { loginUser } from '@/api/userApi'
import usePageTitle from '@/hooks/usePageTitle'
import useNavToHome from '@/hooks/useNavToHome'
const router = useRouter()

// if user is already logged in, redirect to home page
useNavToHome()

// 设置网页标题
usePageTitle('登录')

const loginForm = reactive({
  username: '',
  password: ''
})

const loginFormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名只能包含字母、数字和下划线', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 5, max: 10, message: '密码长度在 5 到 10 个字符', trigger: 'blur' }
  ]
}
const loginFormRef = ref()
// 处理登录提交
// const handleSubmit = (formEl) => {
//   // 表单校验
//   formEl.validate(async (valid) => {
//     if (!valid) {
//       console.log('Form validation failed')
//       return false
//     }
//     // 执行登录逻辑
//     const { token } = await loginUser(loginForm)
//     // 将 token 存储到localStorage
//     localStorage.setItem('token', token)
//     //跳转到首页
//     router.push('/')
//   })
// }
// 优化之后的代码
const handleSubmit = async (formEl) => {
  try {
    await formEl.validate()
  } catch (error) {
    console.log('Form validation failed')
    return false
  }
  try {
    const { token } = await loginUser(loginForm)
    localStorage.setItem('token', token)
    router.push('/')
  } catch (error) {
    console.log('Login failed:', error)
  }
}
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.title {
  font-size: 24px;
  margin-bottom: 20px;
}

.login-form {
  width: 400px;
}
</style>
