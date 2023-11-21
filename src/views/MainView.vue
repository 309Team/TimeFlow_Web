<template>
  <div>
    <el-container>

            <el-aside class="el-aside" width="auto">
                <side-bar></side-bar>
            </el-aside>

            <el-container>
                <el-header class="el-header" height="40px">
                    <head-bar></head-bar>
                </el-header>

                <el-main class="el-main">
                    <!-- 需要路由出口 -->
                    <router-view></router-view>
                </el-main>

                <el-footer class="el-footer">Footer</el-footer>
            </el-container>

    </el-container>
  </div>
</template>
  
<script>
import SideBar from '../components/SideBar.vue'
import HeadBar from '../components/HeadBar.vue'
export default {
  data() {
    return {}
  },
  components: {
    SideBar,
    HeadBar
  }
}
</script>
  
<style scoped>
.el-header {
  background-color: #b3c0d1;
  padding: 0;
  text-align: center;
}

.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  min-height: 100vh;
}

.el-main {
  padding: 0;
  background-color: #fff;
  color: #333;
  padding: 0;
}
</style>