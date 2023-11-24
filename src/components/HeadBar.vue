<template>
    <div class="header">


        <div class="left-content">
            <el-button @click="handleMenu" icon="el-icon-s-fold" circle size="mini"></el-button>
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
    background-color:	#DCDCDC;
    display: flex;
    justify-content: space-between;

    align-items: center;
    // 不要紧贴边框
    padding: 0 20px;
    
}
</style>
