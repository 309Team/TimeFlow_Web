<template>
  <el-menu default-active="1-4-1" class="el-menu-vertical" :collapse="isCollapse" background-color="#eee" text-color="#000000" active-text-color="#67a2ab">

    <h3>
      {{ isCollapse ? "TF" : "TimeFlow" }}
    </h3>

    <el-menu-item index="1" @click="clickItem(MenuData[0])">
      <i class="el-icon-s-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>

    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-c-scale-to-original"></i>
        <span slot="title">视图</span>
      </template>

      <el-menu-item index="2-1" @click="clickItem(MenuData[1])">
        <i class="el-icon-time"></i>
        <span slot="title">时间轴</span>
      </el-menu-item>
      <el-menu-item index="2-2" @click="clickItem(MenuData[2])">
        <i class="el-icon-date"></i>
        <span slot="title">日历</span>
      </el-menu-item>
    </el-submenu>

    <el-menu-item index="3" @click="clickItem(MenuData[3])">
      <i class="el-icon-s-data"></i>
      <span slot="title">统计</span>
    </el-menu-item>

    <el-menu-item index="4" @click="clickItem(MenuData[4])">
      <i class="el-icon-setting"></i>
      <span slot="title">分类管理</span>
    </el-menu-item>

    <el-menu-item index="5" @click="clickItem(MenuData[5])">
      <i class="el-icon-user"></i>
      <span slot="title">用户管理</span>
    </el-menu-item>

    <el-menu-item index="6" @click="clickItem(MenuData[6])">
      <i class="el-icon-info"></i>
      <span slot="title">关于</span>
    </el-menu-item>

  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      MenuData: [
        {
          path: '/home',
          name: 'home',
          CName: '首页'
        },
        {
          path: '/timeline',
          name: 'timeline',
          CName: '时间轴'
        },
        {
          path: '/calendar',
          name: 'calendar',
          CName: '日历'
        },
        {
          path: '/statistic',
          name: 'statistic',
          CName: '统计'
        },
        {
          path: '/classification',
          name: 'classification',
          CName: '分类管理'
        },
        {
          path: '/user',
          name: 'user',
          CName: '用户管理'
        },
        {
          path: '/about',
          name: 'about',
          CName: '关于'
        }
      ]
    };
  },
  methods: {
    clickItem(item) {

      // 防止自己跳自己的报错
      if (this.$route.path !== item.path) {
        this.$router.push(item.path)
      }
      this.$store.commit('SetheadName', item.CName)
      // // 面包屑
      // this.$store.commit('SelectMenu', item)


      // this.$store.commit('CollapseMenu')
    }
  },
  computed: {
    isCollapse() {
      return this.$store.state.tab.isCollapse
    },
  }
}
</script>

<style lang="less" scoped>
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  min-height: 100vh;
}

.el-menu {
  border-right: none;
  height: 100vh;

  h3 {
    text-align: center;
    line-height: 32px;
    color: #556b2f;
    font-size: 16px;
    font-weight: 1000;
  }
}
</style>