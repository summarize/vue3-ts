<template>
  <div class="login">
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      status-icon
      :rules="rules"
      label-width="120px"
      class="demo-loginForm"
    >
      <el-form-item label="账号" prop="account">
        <el-input v-model="loginForm.account" type="text" autocomplete="off" placeholder="账号 Bethel" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          autocomplete="off"
          placeholder="密码 123456"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(loginFormRef)"
          >Submit</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { initData } from "../types/login";
import { login } from "@/api/login";

import { useRouter } from 'vue-router';

export default defineComponent({
  name: "LoginPage",
  setup() {
    const data = reactive(new initData());
    const router = useRouter(); //此处返回的是router实例
    const rules = {
      account: [
        { required : true, message: "Please enter your account", trigger: "blur"},
        {
          min: 6,
          max: 24,
          message: "The account's length is 6 to 24",
          trigger: "blur",
        }
      ],
      password: [
        { required : true, message: "Please enter your password", trigger: "blur"},
        {
          min: 6,
          max: 24,
          message: "The password's length is 6 to 24",
          trigger: "blur",
        }
      ]
    };

    const submitForm = () => {
      data.loginFormRef?.validate((valid: boolean) => {
        if (valid) {
          // console.log("yes");
          login(data.loginForm).then(res => {
            localStorage.setItem('token', res.data.access_token);
            // 跳转到主页面，vue3没有this的概念了
            router.push({ name: 'home'});
          });
        } else {
          console.log("no");
        }
      });
      // loginFormRef 不确定是否存在，所以需要在后面加个问号，否则会报错
    }

    return {
      ...toRefs(data),
      rules,
      submitForm
    };
    // toRefs: 复制 reactive 里的所有属性并转成 ref
    // toRef: 复制 reactive 里的单个属性并转成 ref
  },
});
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  background: url("../assets/images/login.jpg");
  display: flex;
  align-items: center;
  justify-content: center;
}
.demo-loginForm {
  width: 50%;
  :deep(.el-form-item__label) {
    color: #fff;
  }
}
</style>