<template>
  <div text-align="center">
    <!-- <el-image style="width: 1440px; height: 300px" :src="src" fit="cover"></el-image> -->
    <div>
      <div>
        <t-space direction="horizontal" class="brief">
          <t-card title="作品简介" header hover-shadow>
            <!-- 这里填简介 -->
            <h4>时程（TimeFlow）</h4>
            <br>
            这是我们Team309自主开发的日历日程查看与统计网站。
            <br>
            本网站拥有日历查看，时段事项记录与提示，时刻事项记录与提示，标签事项记录与提示等功能。在您注册并登录账号后即可使用本功能。
            <br>
            此网页也会在我们团队的手中继续完善下去。
          </t-card>
        </t-space>
      </div>

      <div>
        <t-space direction="horizontal" class="coder">
          <t-card title="关于作者" header hover-shadow>
            <el-row>
              <el-col :span="12">
                <t-card heme="poster2" :style="{ width: '500px' }" class="info">
                  <template #footer>
                    <t-comment :avatar="header1" author="Polister" content="后端框架设计与开发、前端开发" />
                  </template>
                </t-card>
              </el-col>
              <el-col :span="12">
                <t-card heme="poster2" :style="{ width: '500px' }" class="info">
                  <template #footer>
                    <t-comment avatar="" author="Name" content="开发" />
                  </template>
                </t-card>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <t-card heme="poster2" :style="{ width: '500px' }" class="info">
                  <template #footer>
                    <t-comment avatar="" author="Name" content="开发" />
                  </template>
                </t-card>
              </el-col>
              <el-col :span="12">
                <t-card heme="poster2" :style="{ width: '500px' }" class="info">
                  <template #footer>
                    <t-comment avatar="" author="Name" content="开发" />
                  </template>
                </t-card>
              </el-col>
            </el-row>
          </t-card>
        </t-space>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      src: require('@/static/headimg/1.jpg'),
      header1: require('@/static/header/kita.jpg'),
    }
  }
}
</script>

<style lang="less" scoped>
.logo {
}

.brief {
  width: auto;
  height: 100%;
  margin: 10px;
  display: flex;
}

.coder {
  width: auto;
  height: 100%;
  margin: 10px;
  display: flex;
  .info {
    margin: 10px;
  }
}
</style>