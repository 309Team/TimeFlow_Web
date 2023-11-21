<template>
  <container class="page-container">
    <t-select v-model="mode" class="mode-select-base">
      <t-option v-for="item in options" :key="item.value" :value="item.value" :label="item.label" />
    </t-select>
    <t-calendar :mode="mode" :month="month" :year="year" @cell-click="click" @month-change="changeMonth" @controller-change="changeMode" :controllerConfig="controllerConfig">
      <div slot="cell" slot-scope="data" class="outerWrapper">
        <div class="number">{{ displayNum(data) }}</div>
        <template>
          <div class="slotWrapper">
            <div v-if="data.mode === 'month'">
              <div v-if="momentEvent[format(data.date)] && momentEvent[format(data.date)] > 0">
                <el-tag size="small" class="tag" type="danger">时刻事项 {{ momentEvent[format(data.date)] }}</el-tag>
              </div>
              <div v-if="labelEvent[format(data.date)] && labelEvent[format(data.date)] > 0">
                <el-tag size="small" class="tag" type="warning">标签事项 {{ labelEvent[format(data.date)] }}</el-tag>
              </div>
              <div v-if="timeEvent[format(data.date)] && timeEvent[format(data.date)] > 0">
                <el-tag size="small" class="tag" type="primary">时段事项 {{ timeEvent[format(data.date)] }}</el-tag>
              </div>
            </div>
            <div :mode="mode" v-show="data.mode === 'year'">
              <div>
                <el-tag v-model="momentEventYear" v-show="momentEventYear[formatMonth(data.date)] && momentEventYear[formatMonth(data.date)] > 0" size="small" class="tag" type="danger">时刻事项
                  {{ momentEventYear[formatMonth(data.date)] }}</el-tag>
              </div>
              <div>
                <el-tag v-model="labelEventYear" v-show="labelEventYear[formatMonth(data.date)] && labelEventYear[formatMonth(data.date)] > 0" size="small" class="tag" type="warning">标签事项
                  {{ labelEventYear[formatMonth(data.date)] }}</el-tag>
              </div>
              <div>
                <el-tag v-model="timeEventYear" v-show="timeEventYear[formatMonth(data.date)] && timeEventYear[formatMonth(data.date)] > 0" size="small" class="tag" type="primary">时段事项
                  {{ timeEventYear[formatMonth(data.date)] }}</el-tag>
              </div>
              <!-- 年视图该干的活 -->
            </div>
          </div>
          <div class="shadow" />
        </template>
      </div>
    </t-calendar>

    <!-- 添加事项弹窗 -->
    <div>
      <addDialog :addDialogVisible.sync="addDialogVisible" :parentDate="parentDate"></addDialog>
      <!-- <el-button @click="addDialogVisible = true">添加事项</el-button> -->
    </div>

    <!-- 抽屉组件 -->
    <div>
      <t-drawer :visible.sync="drawerVisible" :closeBtn="true" :size="drawerSize">
        <template #header>
          {{ nowDate + ' 事项'}}
        </template>
        <t-collapse expandMutex expandOnRowClick expandIcon defaultExpandAll>
          <t-collapse-panel header="标签事项" v-if="labelEvent[nowDate]">
            这部分是每个折叠面板折叠或展开的内容，可根据不同业务或用户的使用诉求，进行自定义填充。可以是纯文本、图文、子列表等内容形式。
          </t-collapse-panel>
          <t-collapse-panel header="时刻事项" v-if="momentEvent[nowDate]">
            这部分是每个折叠面板折叠或展开的内容，可根据不同业务或用户的使用诉求，进行自定义填充。可以是纯文本、图文、子列表等内容形式。
          </t-collapse-panel>
          <t-collapse-panel header="时段事项" v-if="timeEvent[nowDate]">
            这部分是每个折叠面板折叠或展开的内容，可根据不同业务或用户的使用诉求，进行自定义填充。可以是纯文本、图文、子列表等内容形式。
          </t-collapse-panel>
        </t-collapse>
        <template #footer>
          <t-button @click="visible = false">确定</t-button>
          <t-button variant="outline" @click="visible = false">取消</t-button>
        </template>
      </t-drawer>
    </div>
  </container>

</template>

<script>
import '@/utils/dateFormat'
import '@/api/calendar'
import { formatDate } from '@/utils/dateFormat';
import { GetMonthLabelEvent, GetMonthMomentEvent, GetYearLabelEvent, GetYearMomentEvent } from '@/api/calendar';
import ElementUI from 'element-ui';
export default {
  mounted() {
    this.getMonthLabelEvent(new Date())
    this.getMonthMomentEvent(new Date())
  },
  data() {
    return {
      // 日历月历切换按钮
      options: [
        { value: 'month', label: '日历' },
        { value: 'year', label: '月历' },
      ],

      // 以下为日历组件所用
      controllerConfig: {
        mode: {
          visable: false
        }
      }, // controller控制
      mode: 'month', // 模式(月历、日历)
      month: new Date().getMonth() + 1, // 日历显示的月份
      year: new Date().getFullYear(), // 日历显示的年份
      parentDate: new Date(), // 选中的日期

      addDialogVisible: false, // 是否显示添加组件

      // 月份事项数
      timeEvent: {},
      labelEvent: {},
      momentEvent: {},

      // 年份事项数
      timeEventYear: {},
      labelEventYear: {},
      momentEventYear: {},

      // 以下为抽屉参数
      drawerVisible: false, // 抽屉是否显示
      drawerSize: 'medium',
      nowDate: formatDate(new Date()), // 现在选中的日期
      nowTimeEvent: [], // 当天的时段事项
      nowMomentEvent: [], // 当天的时刻事项
      nowLabalEvent: [] // 当天的标签事项
    };
  },
  components: {
    addDialog: () => import("@/components/AddEventDialog.vue"),
  },
  methods: {
    // 格式化日期为天
    format(data) {
      return formatDate(data)
    },
    // 格式化日期为月 “MM”
    formatMonth(data) {
      return data.getMonth() + 1
    },
    click(options) {
      // 为年视图时，点击切换为月视图
      if (this.mode == 'year') {
        this.year = options.cell.date.getFullYear()
        this.month = options.cell.date.getMonth() + 1
        this.mode = 'month'
        return
      } else {
        if (!this.timeEvent[options.cell.formattedDate] && !this.momentEvent[options.cell.formattedDate] && !this.labelEvent[options.cell.formattedDate]) {
          this.parentDate = options.cell.date
          this.addDialogVisible = true
        } else {
          this.nowDate = formatDate(options.cell.date)
          this.drawerVisible = true
        }
      }


    },
    changeMonth(options) {

      let newDate = new Date(options.year + '-' + options.month)

      if (this.mode === 'month') {
        this.updateMonthData(newDate)
      } else {
        this.updateYearData(newDate)
      }

    },
    changeMode(options) {
      if (options.mode === 'month') {
        this.updateMonthData(options.filterDate)
      } else {
        this.updateYearData(options.filterDate)
      }
    },
    // 展示日期数字
    displayNum(cellData) {
      if (cellData.mode === 'month') {
        return cellData.date.getDate();
      }
      return cellData.date.getMonth() + 1;
    },

    // 获取当月每天的标签事项数
    getMonthLabelEvent(data) {
      let date = formatDate(data)
      console.log(date);
      GetMonthLabelEvent(date).then(({ data }) => {
        if (data.code !== 0 && data.code !== 4) {
          ElementUI.Message({
            showClose: false,
            message: '获取标签事项信息失败',
            type: 'error'
          })
        } else {
          this.labelEvent = data.data
          //console.log(data.data);
        }
      })
        .catch((err) => {
          console.log(err)
        })
    },

    // 获取当月每天的时刻事项数
    getMonthMomentEvent(data) {
      let date = formatDate(data)
      //console.log(date);
      GetMonthMomentEvent(date).then(({ data }) => {
        if (data.code !== 0 && data.code !== 4) {
          ElementUI.Message({
            showClose: false,
            message: '获取时刻事项信息失败',
            type: 'error'
          })
        } else {
          this.momentEvent = data.data
          //console.log(data.data);
        }
      })
        .catch((err) => {
          console.log(err)
        })
    },

    // 获取当月每天的时段事项数
    getMonthTimeEvent(data) {
      console.log(data)
    },

    // 获取当年每月的标签事项数
    getYearLabelEvent(data) {
      let date = formatDate(data)
      console.log(date);
      GetYearLabelEvent(date).then(({ data }) => {
        if (data.code !== 0 && data.code !== 4) {
          ElementUI.Message({
            showClose: false,
            message: '获取标签事项信息失败',
            type: 'error'
          })
        } else {
          this.labelEventYear = data.data
          console.log(data.data);
        }
      })
    },

    // 获取当年每月的时刻事项数
    getYearMomentEvent(data) {
      let date = formatDate(data)
      console.log(date);
      GetYearMomentEvent(date).then(({ data }) => {
        if (data.code !== 0 && data.code !== 4) {
          ElementUI.Message({
            showClose: false,
            message: '获取标签事项信息失败',
            type: 'error'
          })
        } else {
          this.momentEventYear = data.data
        }
      })
    },

    // 统一更新月视图事项
    updateMonthData(date) {
      this.getMonthLabelEvent(date)
      this.getMonthMomentEvent(date)
      this.getMonthTimeEvent(date)
    },

    // 统一更新年视图事项
    updateYearData(date) {
      console.log(date);
      this.getYearLabelEvent(date)
      this.getYearMomentEvent(date)
    },


  },
};
</script>

<style lang="less" scoped>
.page-container {
  padding: 40px;
}
.mode-select-base {
  width: 200px;
  display: inline-block;
  margin: 10px 10px 0 0;
}
.outerWrapper {
  width: 100%;
  height: 100%;
  position: relative;

  .shadow {
    position: absolute;
    width: 100%;
    height: 10px;
    bottom: 0;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 0%,
      #ffffff 100%
    );
  }
  .number {
    font-weight: 600;
    position: absolute;
    right: 0;
    font-size: 14px;
    line-height: 22px;
  }
  .item {
    position: relative;
    display: flex;
    align-items: center;
    color: var(--td-text-color-secondary);
    font-size: 14px;
    line-height: 22px;
    span {
      display: block;
      left: 1px;
      width: 5px;
      height: 5px;
      border-radius: 10px;
      margin-right: 4px;
    }
  }

  .slotWrapper {
    position: absolute;
    bottom: 2px;
    left: 5px;
    .tag {
      margin: 5px;
    }
  }
}
</style>
