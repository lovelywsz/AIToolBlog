<template>
  <div class="register-page">
    <div class="title">新用户注册</div>
    <el-form
      :model="formData"
      :rules="formRules"
      ref="registerForm"
      label-width="100px"
      class="register-form"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="formData.username" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formData.password" type="password" clearable></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input v-model="formData.confirmPassword" type="password" clearable></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="formData.nickname" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit(registerForm)">注册</el-button>
      </el-form-item>
      <el-form-item>
        <router-link to="/login">已有账号？立即登录</router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { registerUser } from '../api/userApi'
import usePageTitle from '@/hooks/usePageTitle'
import useNavToHome from '@/hooks/useNavToHome'
// if user is already logged in, redirect to home page
useNavToHome()
// 设置网页标题
usePageTitle('注册')

const formData = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  nickname: ''
})
// 确认密码校验函数
const checkPasswordConfirm = (rule, value, callback) => {
  if (value !== formData.password) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}
const formRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名只能包含字母、数字和下划线', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 5, max: 10, message: '密码长度在 5 到 10 个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    { validator: checkPasswordConfirm, trigger: 'blur' }
  ],
  nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }]
}

const router = useRouter()
const registerForm = ref()
// 处理注册提交
const handleSubmit = (formEl) => {
  // 表单校验
  formEl.validate(async (valid) => {
    if (valid) {
      // 执行注册逻辑
      await registerUser(formData)
      // 提交表单逻辑，这里只是示例，可以发送请求到后端进行注册
      console.log('Form data', formData)
      // router.push('/login')
    } else {
      console.log('Form validation failed')
      return false
    }
  })
}
</script>

<style scoped>
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.title {
  font-size: 24px;
  margin-bottom: 20px;
}

.register-form {
  width: 400px;
}
</style>
