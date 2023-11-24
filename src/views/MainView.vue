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

        <el-footer class="el-footer" height="25px"> 
          Copyright © 2022 - 2023 SCAU-TaiShan-309. All Rights Reserved. 309宿舍 版权所有
        </el-footer>
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
  /* background-color: #409eff; */
  padding: 0;
  text-align: center;
}

.el-footer {

  color: #413f3f;
  font-size: 14px;
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