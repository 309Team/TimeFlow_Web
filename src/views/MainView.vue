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
                    <h1>MAIN</h1>
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
        return {

        }
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
}

.el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;

}

.el-aside {
    background-color: #D3DCE6;
    color: #333;
    min-height: 100vh;
}

.el-main {
    background-color: #aeb1b3;
    color: #333;
    text-align: center;
}
</style>