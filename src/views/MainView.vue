<template>
    <div>
        <el-container>

            <el-aside width="auto">
                <side-bar></side-bar>
            </el-aside>

            <el-container>
                <el-header height="40px">
                    <head-bar></head-bar>
                </el-header>

                <el-main>
                    <!-- 需要路由出口 -->
                    <router-view></router-view>
                </el-main>

                <el-footer>Footer</el-footer>
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
    background-color: #B3C0D1;
    padding: 0;
    text-align: center;
    height: 10vh;
}

.el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    height: 20vh;

}

.el-aside {
    background-color: #D3DCE6;
    color: #333;
    min-height: 100vh;
}

.el-main {
    padding: 0;
    background-color: #aeb1b3;
    color: #333;
    padding: 0;
    height: 80vh;

}
</style>