<template>
  <el-form ref="form" class="register_container" :model="register_form" status-icon :rules="rules" label-width="70px" @keyup.enter.native="submit" @submit.native.prevent>

    <h3 class="register_title">用户注册</h3>

    <!-- prop对应rules里的键 -->
    <el-form-item label="用户名" prop="name">
      <el-input v-model="register_form.name" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="register_form.password" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="确认密码" prop="password2">
      <el-input type="password" v-model="register_form.password2" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item class="register_button">
      <el-button @click="toLogin">去登录</el-button>
      <el-button @click="submit" type="primary">注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { RegisterRequest } from '../api'
export default {
  data() {
    return {
      register_form: {
        name: '',
        password: '',
        password2: '',
      },

      rules: {
        name: [
          {
            required: 'true',
            message: '请输入用户名',
            trigger: 'blur' //失去焦点时触发校验规则
          }],
        password: [
          {
            required: 'true',
            message: '请输入密码',
            trigger: 'blur'
          }],
        password2: [
          {
            required: 'true',
            message: '请输入确认密码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    toLogin() {
      this.$router.push('/login')
    },
    submit() {
      if (this.register_form.password == "") {
        this.$message({
          showClose: true,
          message: '请输入密码',
          type: 'warning'
        });
      }
      else if (this.register_form.password2 == "") {
        this.$message({
          showClose: true,
          message: '请输入确认密码',
          type: 'warning'
        });
      }
      else if (this.register_form.password !== this.register_form.password2) {
        this.$message({
          showClose: true,
          message: '两次输入的密码不一致',
          type: 'error'
        });
      }
      else {
        RegisterRequest(this.register_form).then(({ data }) => {

          if (data.code === 0) {
            this.$router.push('/login')
            this.$message({
              showClose: true,
              message: '注册成功',
              type: 'success'
            });
          } else {
            this.$message({
              showClose: true,
              message: data.msg,
              type: 'error'
            });
          }
        })
      }
    }
  }

}
</script>

<style lang="less" scoped>
.register_container {
  width: 400px;
  border: 3px solid #eaeaea;

  // 居中
  margin: 180px auto;

  padding: 35px 35px 15px 35px;

  // 让padding在width里面
  box-sizing: border-box;

  // 设置圆角
  border-radius: 30px;

  // 背景颜色
  background-color: #fff;

  // 设置阴影
  box-shadow: 0 0 25px #cac6c6;

  .register_title {
    color: #505458;
    // 左右居中
    text-align: center;
    margin-bottom: 40px;
    margin-left: 0px;
  }

  .register_button {
    margin-left: 60px;
  }
}
</style>