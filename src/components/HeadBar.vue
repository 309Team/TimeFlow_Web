<template>
    <div class="header">


        <div class="left-content">
            <el-button @click="handleMenu" icon="el-icon-s-fold" circle size="mini"></el-button>

            <!-- 面包屑 -->
            <!-- <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{ item.label }}
                </el-breadcrumb-item>
            </el-breadcrumb> -->

            <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
                <el-radio-button :label="false">展开</el-radio-button>
                <el-radio-button :label="true">收起</el-radio-button>
            </el-radio-group>
            SDDDDD -->
        </div>

        <div class="right-content">
            TimeFlow
        </div>

    </div>
</template>




<script>
export default ({
    data() {
        return {

        }
    },
    methods: {
        handleMenu() {
            this.$store.commit('CollapseMenu')
        },
    }
})
</script>


<style lang="less" scoped>
.header {
    height: 40px;
    background-color: #b8baba;
    display: flex;
    justify-content: space-between;

    align-items: center;
    // 不要紧贴边框
    padding: 0 20px;
    
}
</style>
