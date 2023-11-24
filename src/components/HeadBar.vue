<template>
  <div class="header">

    <div class="left-content" style="font-size: 14px">
      <el-button @click="handleMenu" icon="el-icon-s-fold" circle size="mini" style="margin-right: 12px"></el-button>
      {{headName}}
    </div>

    <div class="right-content" style="font-size: 13px">
      欢迎，{{ userInfo.name }}
      <el-button @click="logout" icon="el-icon-switch-button" circle size="mini" style="margin: 12px"></el-button>
    </div>

  </div>
</template>




<script>
import { GetUserInfo } from '@/api/user'
import ElementUI from 'element-ui'
export default ({
  data() {
    return {
      userInfo: {},
    }
  },
  computed: {
    headName() {
      return this.$store.state.tab.headName
    }
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    handleMenu() {
      this.$store.commit('CollapseMenu')
    },

    async getUserInfo() {
      GetUserInfo()
        .then(({ data }) => {
          if (data.data === null) {
            ElementUI.Message({
              showClose: true,
              message: '获取用户信息失败',
              type: 'error'
            })
          }
          this.userInfo = data.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    logout() {
      localStorage.removeItem('token')
      this.$router.push('/login')
      ElementUI.Message({
        showClose: false,
        message: '已退出登录',
        type: 'success'
      })
    },
  }
})
</script>


<style lang="less" scoped>
.header {
  height: 40px;
  background-color: #dcdcdc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // 不要紧贴边框
  padding: 0 20px;
}
</style>
