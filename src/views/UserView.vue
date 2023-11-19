<template>
  <el-tabs v-model="activeName" @tab-click="handleClick" class="userSetting">
    <!-- 用户信息页面 -->
    <el-tab-pane label="用户信息" name="info">
      <el-descriptions v-model="data" title="用户信息" column="1">
        <el-descriptions-item label="用户名">{{
          data.UserInfo.name
        }}</el-descriptions-item>
        <el-descriptions-item label="用户ID">{{
          data.UserInfo.uid
        }}</el-descriptions-item>
      </el-descriptions>
      <el-button type="primary" round size="mini" @click="onLogOut">退出登录</el-button>
    </el-tab-pane>

    <!-- 修改用户名页面 -->
    <el-tab-pane label="修改用户名" name="editName">
      <h4>修改用户名</h4>
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
      <h4>修改密码</h4>
      <el-form :inline="true" @keyup.enter.native="onSubmitNewPassWord" @submit.native.prevent>
        <el-form-item label="输入原密码">
          <el-input v-model="oldPassWord" placeholder="请输入原密码" show-password></el-input>
        </el-form-item>
        <br />
        <el-form-item label="输入新密码">
          <el-input v-model="newPassWord" placeholder="请输入新密码" show-password></el-input>
        </el-form-item>
        <br />
        <el-form-item label="再次输入新密码">
          <el-input v-model="newPassWord2" placeholder="请再次输入新密码" show-password></el-input>
        </el-form-item>
        <br />
        <el-form-item>
          <el-button type="primary" @click="onSubmitNewPassWord" round class="el-button">确认修改</el-button>
        </el-form-item>
      </el-form>
      <el-alert title="忘记密码将无法找回，请妥善保存。" type="warning" :closable="false">
      </el-alert>
    </el-tab-pane>

    <!-- 注销用户页面 -->
    <el-tab-pane label="注销用户" name="deleteUser">
      <h4>注销用户</h4>
      <el-form :inline="true" @submit.native.prevent>
        <el-form-item label="密码">
          <el-input v-model="passWord" placeholder="输入密码以验证为本人操作" show-password></el-input>
        </el-form-item>
        <br />
        <el-form-item>
          <el-popconfirm title='注销后无法找回数据，确认注销用户？' confirm-button-text='注销' cancel-button-text='取消' icon='el-icon-delete' icon-color='red' @confirm='onDeleteUser' @cancel='handleCancel'>
            <el-button type="danger" round class="el-button" slot='reference'>确认注销</el-button>
          </el-popconfirm>

        </el-form-item>
      </el-form>
      <el-alert title="注销用户将永远无法找回，请谨慎操作！" type="error" :closable="false">
      </el-alert>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { GetUserInfo, UpdateUserInfo, UpdateUserPassWord, VerifyPassWord, DeleteUser } from '../api/user'
export default {
  data() {
    return {
      activeName: 'info',
      data: {
        UserInfo: null
      },
      passWord: null,
      oldPassWord: null,
      newPassWord: null,
      newPassWord2: null,
      input: null,
      newName: null
    }
  },
  created() {
    // 打开页面时获取用户信息
    this.getUserInfo()
  },
  methods: {

    handleCancel() {
      this.$message({
        type: 'info',
        message: '已取消'
      })
    },
    // 获取用户信息
    async getUserInfo() {
      GetUserInfo()
        .then(({ data }) => {
          if (data.data === null) {
            this.$message({
              showClose: true,
              message: '获取用户信息失败',
              type: 'error'
            })
          }
          this.data.UserInfo = data.data
        })
        .catch((err) => {
          console.log(err)
        })
    },

    onSubmitNewName() {
      if (this.newName == null) {
        this.$message({
          showClose: false,
          message: '用户名不能为空',
          type: 'error'
        })
        return
      }

      this.$confirm('确认修改用户名?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'dialog-btn',
        type: 'warning'
      })
        .then(() => {
          UpdateUserInfo({
            name: this.newName
          })
            .then(({ data }) => {
              if (data.code !== 0) {
                this.$message({
                  showClose: true,
                  message: data.msg,
                  type: 'error'
                })
              } else {
                this.getUserInfo()
                this.$message({
                  showClose: true,
                  message: '修改成功',
                  type: 'success'
                })
                this.activeName = 'info'
                this.newName = null
              }
            })
            .catch((err) => {
              console.log(err)
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },

    onLogOut() {
      localStorage.removeItem('token')
      this.$router.push('/login')
      this.$message({
        showClose: true,
        message: '已退出登录',
        type: 'success'
      })
    },

    onSubmitNewPassWord() {
      if (this.oldPassWord == null) {
        this.$message({
          showClose: true,
          message: '请输入原密码!',
          type: 'error'
        })
      } else if (this.newPassWord != this.newPassWord2) {
        this.$message({
          showClose: true,
          message: '两次密码不一致!',
          type: 'error'
        })
      } else {
        UpdateUserPassWord({
          oldPassWord: this.oldPassWord,
          newPassWord: this.newPassWord
        })
          .then(({ data }) => {
            if (data.code !== 0) {
              this.$message({
                showClose: true,
                message: data.msg,
                type: 'error'
              })
            } else {
              this.getUserInfo()
              this.$message({
                showClose: true,
                message: '修改成功,请重新登录!',
                type: 'success'
              })
              localStorage.removeItem('token')
              this.$router.push('/login')
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },

    onDeleteUser() {
      // this.$prompt('请输入密码以确定为本人操作', '注销用户', {
      //   confirmButtonText: '注销',
      //   cancelButtonText: '取消',
      //   customClass: "delButton",
      //   inputType: "password",
      //   inputErrorMessage: '输入的密码错误！',
      //   inputValidator: async (value) => {
      //     const { data: data_1 }= await VerifyPassWord({
      //       "passWord": value
      //     })
      //     console.log(data_1)
      //     return data_1.code == 0
      //   },
      // }).then(({ value }) => {
      //   this.$message({
      //     type: 'success',
      //     message: '注销成功，期待与你下次相遇' + value,
      //   });
      // }).catch(() => {
      //   this.$message({
      //     type: 'info',
      //     message: '取消注销'
      //   });
      // });
      if (this.passWord == null || this.passWord == "") {
        this.$message({
          showClose: true,
          message: "请输入密码！",
          type: 'error'
        })
        return;
      }

      DeleteUser({ "passWord": this.passWord }).then((({ data }) => {
        if (data.code !== 0) {
          this.$message({
            showClose: true,
            message: data.msg,
            type: 'error'
          })
        } else {
          this.$message({
            type: 'success',
            message: '注销成功，期待与你下次相遇',
          });
          localStorage.removeItem('token')
          this.$router.push('/login')
        }
      }))
    },

    // 验证密码：value为传入的密码
    verifyPassWord(value) {
      console.log(value)
      return VerifyPassWord({
        "passWord": value
      }).then(({ data }) => {
        console.log(data)
        return data.code == 0
      })
    }
  }
}
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

.delButton {
  border-color: #ff0000;
  background: #ff0000;
  color: #fff;
}
</style>