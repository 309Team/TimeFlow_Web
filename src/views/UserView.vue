<template style = "background-color: #ffffff">
    <el-tabs v-model="activeName" @tab-click="handleClick" class="userSetting">
        <el-tab-pane label="用户信息" name="first">
            <el-descriptions v-model="data" title="用户信息" column="1">
                <el-descriptions-item label="用户名">{{ data.UserInfo.name }}</el-descriptions-item>
                <el-descriptions-item label="用户ID">{{ data.UserInfo.uid }}</el-descriptions-item>
            </el-descriptions>
            <el-button type="primary" round size="mini" @click="onLogOut">退出登录</el-button>
        </el-tab-pane>
        <el-tab-pane label="修改用户名" name="second">
            <el-form :inline="true" :model="newName">
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
        <el-tab-pane label="修改密码" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
</template>

<script>
import { GetUserInfo, UpdateUserInfo } from '../api/user'
export default {
    data() {
        return {
            activeName: 'first',
            data: {
                UserInfo: null,
                hasInfo: null,
                isEdited: null
            },

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
                    this.data.hasInfo = false;
                }
                else {
                    this.data.hasInfo = true;
                }
                this.data.UserInfo = data.data
            })
        },

        onSubmitNewName() {
            UpdateUserInfo({"name" : this.newName}).then(({data}) => {
                if (data.code !== 0) {
                    this.data.isEdited = false
                    alert(data.msg)
                } else {
                    this.data.isEdited = true
                    this.getUserInfo()
                    alert("修改成功")
                    this.activeName = "first"
                }
            })
        },

        onLogOut() {
            alert('已退出登录')
            localStorage.removeItem('token')
            this.$router.push('/login')
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



.main_container {
    height: 100%;
}
</style>