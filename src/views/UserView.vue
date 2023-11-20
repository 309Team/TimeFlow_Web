<template>
    <el-tabs v-model="activeName" @tab-click="handleClick" class="userSetting">

        <!-- 用户信息页面 -->
        <el-tab-pane label="用户信息" name="info">
            <el-descriptions v-model="data" title="用户信息" column="1">
                <el-descriptions-item label="用户名">{{ data.UserInfo.name }}</el-descriptions-item>
                <el-descriptions-item label="用户ID">{{ data.UserInfo.uid }}</el-descriptions-item>
            </el-descriptions>
            <el-button type="primary" round size="mini" @click="onLogOut">退出登录</el-button>
        </el-tab-pane>

        <!-- 修改用户名页面 -->
        <el-tab-pane label="修改用户名" name="editName">
            <el-form :inline="true" :model="newName" @keyup.enter.native="onSubmitNewName" @submit.native.prevent>
                <el-form-item label="新用户名">
                    <el-input v-model="newName" placeholder="新用户名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmitNewName" round>确认修改</el-button>
                </el-form-item>
            </el-form>
            <el-alert title="用户名为用户的唯一登录凭证，请妥善保存。" type="warning" :closable="false">
            </el-alert>
        </el-tab-pane>

        <!-- 修改密码页面 -->
        <el-tab-pane label="修改密码" name="editPassWord">
            <el-form :inline="true" @keyup.enter.native="onSubmitNewPassWord" @submit.native.prevent>
                <el-form-item label="输入原密码">
                    <el-input v-model="oldPassWord" placeholder="请输入原密码" show-password></el-input>
                </el-form-item>
                <br>
                <el-form-item label="输入新密码">
                    <el-input v-model="newPassWord" placeholder="请输入新密码" show-password></el-input>
                </el-form-item>
                <br>
                <el-form-item label="再次输入新密码">
                    <el-input v-model="newPassWord2" placeholder="请再次输入原密码" show-password></el-input>
                </el-form-item>
                <br>
                <el-form-item>
                    <el-button type="primary" @click="onSubmitNewPassWord" round>确认修改</el-button>
                </el-form-item>
            </el-form>
            <el-alert title="忘记密码将无法找回，请妥善保存。" type="warning" :closable="false">
            </el-alert>
        </el-tab-pane>
        
        <!-- 注销用户页面 -->
        <el-tab-pane label="注销用户" name="deleteUser">

            <el-button type="danger" round style="margin: 15px;">注销用户</el-button>
            <el-alert title="注销用户将永远无法找回，请谨慎操作！" type="warning" :closable="false">

            </el-alert>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
import { GetUserInfo, UpdateUserInfo, UpdateUserPassWord } from '../api/user'
export default {
    data() {
        return {
            activeName: 'info',
            data: {
                UserInfo: null,
            },
            oldPassWord: null,
            newPassWord: null,
            newPassWord2: null,
            input: null,
            newName: null
        };
    },
    created() {
        this.getUserInfo()
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },

        async getUserInfo() {
            GetUserInfo().then(({ data }) => {
                if (data.data === null) {
                    this.$message({
                        showClose: true,
                        message: '获取用户信息失败',
                        type: 'error'
                    });
                }
                this.data.UserInfo = data.data
            })
        },

        onSubmitNewName() {
            UpdateUserInfo({ "name": this.newName }).then(({ data }) => {
                if (data.code !== 0) {
                    this.$message({
                        showClose: true,
                        message: data.msg,
                        type: 'error'
                    });
                } else {
                    this.getUserInfo()
                    this.$message({
                        showClose: true,
                        message: '修改成功',
                        type: 'success'
                    });
                    this.activeName = "info"
                    this.newName = null
                }
            })
        },

        onLogOut() {
            localStorage.removeItem('token')
            this.$router.push('/login')
            this.$message({
                showClose: true,
                message: '已退出登录',
                type: 'success'
            });
        },

        onSubmitNewPassWord() {
            if (this.oldPassWord == null) {
                this.$message({
                    showClose: true,
                    message: '请输入原密码!',
                    type: 'error'
                });
            }
            else if (this.newPassWord != this.newPassWord2) {
                this.$message({
                    showClose: true,
                    message: '两次密码不一致!',
                    type: 'error'
                });
            }
            else {
                UpdateUserPassWord({ "oldPassWord": this.oldPassWord, "newPassWord": this.newPassWord }).then(({ data }) => {
                    if (data.code !== 0) {
                        this.$message({
                            showClose: true,
                            message: data.msg,
                            type: 'error'
                        });
                    } else {
                        this.getUserInfo()
                        this.$message({
                            showClose: true,
                            message: '修改成功,请重新登录!',
                            type: 'success'
                        });
                        localStorage.removeItem('token')
                        this.$router.push('/login')
                    }
                })
            }
        }
    }
};
</script>

<style scoped>
.userSetting {
    background-color: #ffffff;
    padding: 40px;
    top: 0;
    left: 0;
    width: auto;
    height: 100%;
}
</style>