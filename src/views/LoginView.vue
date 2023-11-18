<template>
    <el-form ref="form" class="login_container" :model="login_form" status-icon :rules="rules" label-width="70px">

        <!-- h3要放在里面:只能有一个根,且title也是表单的一部分 -->
        <h3 class="login_title">用户登录</h3>

        <!-- prop对应rules里的键 -->
        <el-form-item label="用户名" prop="name">
            <el-input v-model="login_form.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="login_form.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item class="login_button">
            <el-button @click="submit" type="primary">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import Cookie from 'js-cookie'
// import Cookie from 'js-cookie'
import { LoginRequest } from '../api'
export default {
    data() {
        return {
            login_form: {
                name: '',
                password: ''
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
                        message: '请输入用户名',
                        trigger: 'blur'
                    }]
            }
        }
    },
    methods: {
        submit() {


            LoginRequest(this.login_form).then(({ data }) => {

                if (data.code === 0) {
                    // console.log(data)
                    Cookie.set('token', data.data.token)
                    // console.log(data.data.token)

                    // 后台请求异步，必须拿到token响应数据才能跳转
                    this.$router.push('/home')
                } else {
                    this.$message({
                        showClose: true,
                        message: '账号或密码错误',
                        type: 'error'
                    });

                }

            })


        }
    }
}
</script>

<style lang="less" scoped>
.login_container {
    width: 350px;
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

    .login_title {
        color: #505458;
        // 左右居中
        text-align: center;
        margin-bottom: 40px;
        margin-left: 0px;
    }

    .login_button {
        margin-left: 30px;
    }

}
</style>