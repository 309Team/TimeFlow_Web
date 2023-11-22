<template>
  <div>
    <div>
      <t-select v-model="mode" class="mode-select-base">
        <t-option v-for="item in options" :key="item.value" :value="item.value" :label="item.label" />
      </t-select>
    </div>
    <t-calendar :mode="mode" :month="month" :year="year" @cell-click="click" @month-change="changeMonth" @controller-change="changeMode" :controllerConfig="controllerConfig" style="margin: 15px">
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
      <addDialog :addDialogVisible.sync="addDialogVisible" :parentDate="parentDate" @updateData="updateAll"></addDialog>
      <!-- <el-button @click="addDialogVisible = true">添加事项</el-button> -->
    </div>

    <!-- 修改标签事项弹窗 -->
    <div>
      <updateLEDialog :updateLeDialogVisible.sync="LEVisable" :dataLE="chooseEvent" @updateData="updateAll" />
      <updateMEDialog :updateMeDialogVisible.sync="MEVisable" :dataME="chooseEvent" @updateData="updateAll" />
      <updateTEDialog :updateTeDialogVisible.sync="TEVisable" :dataTE="chooseEvent" @updateData="updateAll" />
    </div>

    <!-- 抽屉组件 -->
    <div>
      <t-drawer :visible.sync="drawerVisible" :closeBtn="true" :size="drawerSize">
        <template #header>
          {{ nowDate + ' 事项'}}
        </template>
        <t-collapse expandMutex expandOnRowClick expandIcon defaultExpandAll>
          <t-collapse-panel header="标签事项" v-if="labelEvent[nowDate]" v-model="nowLabalEvent">
            <br>
            <div v-for="item of nowLabalEvent" :key="item.name">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>{{ item.name }}</span>
                  <el-popconfirm confirm-button-text='删除' confirm-button-type="danger" cancel-button-text='取消' @confirm="clickDeleteLE(item)" icon="el-icon-info" icon-color="red" title="确定删除吗？">
                    <el-button style="float: right; padding: 3px 3px" type="text" slot="reference">删除</el-button></el-popconfirm>
                  <el-button style="float: right; padding: 3px 0" type="text" @click="clickUpdateLE(item)">编辑</el-button>
                </div>
                <div>{{ item.text ? item.text : '暂无备注' }}</div>
              </el-card>
            </div>
          </t-collapse-panel>
          <t-collapse-panel header="时刻事项" v-if="momentEvent[nowDate]">
            <br>
            <div v-for="item of nowMomentEvent" :key="item.id">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>{{ item.name }}</span>
                  <el-tag type="danger" size="small" style="margin: 10px"> {{formatHHMM(item.deadline)}}</el-tag>
                  <el-popconfirm confirm-button-text='删除' confirm-button-type="danger" cancel-button-text='取消' @confirm="clickDeleteME(item)" icon="el-icon-info" icon-color="red" title="确定删除吗？">
                    <el-button style="float: right; padding: 3px 3px" type="text" slot="reference">删除</el-button></el-popconfirm>
                  <el-button style="float: right; padding: 3px 0" type="text" @click="clickUpdateME(item)">编辑</el-button>
                </div>
                <div>{{ item.text ? item.text : '暂无备注' }}</div>
              </el-card>
            </div>
          </t-collapse-panel>
          <t-collapse-panel header="时段事项" v-if="timeEvent[nowDate]">
            <br>
            <div v-for="item of nowTimeEvent" :key="item.id">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>{{ item.name }}</span>
                  <span v-if="item.completed === false">
                    <el-tag type="info" size="small" style="margin: 10px" v-if="new Date(item.startTime) > new Date()">未开始</el-tag>
                    <el-tag type="warning" size="small" style="margin: 10px" v-if="new Date(item.startTime) <= new Date() && new Date(item.overTime) >= new Date()">进行中</el-tag>
                    <el-tag type="error" size="small" style="margin: 10px" v-if="new Date(item.overTime) < new Date()">已结束</el-tag>
                  </span>
                  <span v-if="item.completed === true">
                    <el-tag type="success" size="small" style="margin: 10px">已完成</el-tag>
                  </span>
                  <el-popconfirm confirm-button-text='删除' confirm-button-type="danger" cancel-button-text='取消' @confirm="clickDeleteTE(item)" icon="el-icon-info" icon-color="red" title="确定删除吗？">
                    <el-button style="float: right; padding: 3px 3px" type="text" slot="reference">删除</el-button>
                  </el-popconfirm>
                  <el-button style="float: right; padding: 3px 0" type="text" @click="clickUpdateTE(item)">编辑</el-button>
                </div>
                <el-tag type="primary" size="small" style="margin: 10px"> {{formatDateAndTime(new Date(item.startTime))}} - {{formatDateAndTime(new Date(item.overTime))}}</el-tag>
                <div style="margin: 10px">{{ item.text ? item.text : '暂无备注' }}</div>
              </el-card>
            </div>
          </t-collapse-panel>
        </t-collapse>
        <template #footer>
          <t-button @click="addDialogVisible = true">添加事项</t-button>
        </template>
      </t-drawer>
    </div>
  </div>

</template>

<script>
import '@/utils/dateFormat'
import '@/api/calendar'
import { formatDate, formatDateTime, formatTimeHHMM } from '@/utils/dateFormat';
import { GetMonthLabelEvent, GetMonthMomentEvent, GetYearLabelEvent, GetYearMomentEvent, GetMonthTimeEvent, GetYearTimeEvent } from '@/api/calendar';
import { GetLe, GetMe, GetTe, DeleteLe, DeleteMe, DeleteTe } from '@/api/event'
import ElementUI from 'element-ui';
export default {
  name: 'calendarView',
  mounted() {
    this.updateMonthData(new Date())
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

      // 以下为对话框参数
      chooseEvent: {}, // 选择的事项
      parentDate: new Date(), // 选中的日期

      // 添加组件
      addDialogVisible: false, // 是否显示添加组件

      // 修改标签事项组件
      LEVisable: false, // 是否显示修改标签事项组件

      // 修改时刻事项组件
      MEVisable: false, // 是否显示修改时刻事项组件

      // 修改时段事项组件
      TEVisable: false, // 是否显示修改时段事项组件

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
      drawerSize: 'medium', // 抽屉大小
      nowDate: formatDate(new Date()), // 现在选中的日期
      nowTimeEvent: [], // 当天的时段事项
      nowMomentEvent: [], // 当天的时刻事项
      nowLabalEvent: [] // 当天的标签事项
    };
  },
  components: {
    addDialog: () => import("@/components/AddEventDialog.vue"),
    updateLEDialog: () => import("@/components/UpdateLeDialog.vue"),
    updateMEDialog: () => import("@/components/UpdateMeDialog.vue"),
    updateTEDialog: () => import("@/components/UpdateTeDialog.vue"),
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

    // 格式化为 "2023-11-11 20:11:20"
    formatDateAndTime(data) {
      return formatDateTime(new Date(data))
    },

    // 格式化为 "20:11"
    formatHHMM(data) {
      return formatTimeHHMM(new Date(data))
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
          this.parentDate = options.cell.date
          this.nowDate = formatDate(options.cell.date)
          this.updateDayData(options.cell.date)
          this.drawerVisible = true
        }
      }
    },

    // 切换年/月历触发更新数据
    changeMonth(options) {

      let newDate = new Date(options.year + '-' + options.month)

      if (this.mode === 'month') {
        this.updateMonthData(newDate)
      } else {
        this.updateYearData(newDate)
      }

    },

    // 修改年/月历显示时更新数据
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
      //console.log(date);
      GetMonthLabelEvent(date).then(({ data }) => {
        if (data.code !== 0) {
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
        if (data.code !== 0) {
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
      let date = formatDate(data)
      //console.log(date);
      GetMonthTimeEvent(date).then(({ data }) => {
        if (data.code !== 0) {
          ElementUI.Message({
            showClose: false,
            message: '获取时段事项信息失败',
            type: 'error'
          })
        } else {
          this.timeEvent = data.data
          //console.log(data.data);
        }
      })
        .catch((err) => {
          console.log(err)
        })
    },

    // 获取当年每月的标签事项数
    getYearLabelEvent(data) {
      let date = formatDate(data)
      //console.log(date);
      GetYearLabelEvent(date).then(({ data }) => {
        if (data.code !== 0) {
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
      //console.log(date);
      GetYearMomentEvent(date).then(({ data }) => {
        if (data.code !== 0) {
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

    // 获取当年每月的时刻事项数
    getYearTimeEvent(data) {
      let date = formatDate(data)
      //console.log(date);
      GetYearTimeEvent(date).then(({ data }) => {
        if (data.code !== 0) {
          ElementUI.Message({
            showClose: false,
            message: '获取标签事项信息失败',
            type: 'error'
          })
        } else {
          this.timeEventYear = data.data
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
      //console.log(date);
      this.getYearLabelEvent(date)
      this.getYearMomentEvent(date)
      this.getYearTimeEvent(date)
    },

    // 统一更新日视图事项
    updateDayData(date) {
      this.getNowLabelEvent(date)
      this.getNowMomentEvent(date)
      this.getNowTimeEvent(date)
    },

    updateAll() {
      let date = new Date(this.nowDate)
      this.updateMonthData(date)
      this.updateDayData(date)
      //console.log(this.nowLabalEvent)
    },

    // 以下为drawer的方法 //

    // 编辑标签事项
    clickUpdateLE(item) {
      this.chooseEvent = item
      this.LEVisable = true
    },
    // 删除标签事项
    clickDeleteLE(item) {
      DeleteLe(item.id).then(({ data }) => {
        if (data.code !== 0) {
          ElementUI.Message({
            showClose: false,
            message: '删除失败',
            type: 'error'
          })
        } else {
          ElementUI.Message({
            showClose: false,
            message: '删除成功',
            type: 'success'
          })
          this.updateAll()
        }
      })
    },

    // 编辑时刻事项
    clickUpdateME(item) {
      this.chooseEvent = item
      this.MEVisable = true
    },
    // 删除时刻事项
    clickDeleteME(item) {
      DeleteMe(item.id).then(({ data }) => {
        if (data.code !== 0) {
          ElementUI.Message({
            showClose: false,
            message: '删除失败',
            type: 'error'
          })
        } else {
          ElementUI.Message({
            showClose: false,
            message: '删除成功',
            type: 'success'
          })
          this.updateAll()
        }
      })
    },

    // 编辑时段事项
    clickUpdateTE(item) {
      //console.log(item)
      this.chooseEvent = item
      //console.log(this.chooseEvent);
      this.chooseEvent.startTime = new Date(item.startTime)
      this.chooseEvent.overTime = new Date(item.overTime)
      this.TEVisable = true
    },

    // 删除时段事项
    clickDeleteTE(item) {
      DeleteTe(item.id).then(({ data }) => {
        if (data.code !== 0) {
          ElementUI.Message({
            showClose: false,
            message: '删除失败',
            type: 'error'
          })
        } else {
          ElementUI.Message({
            showClose: false,
            message: '删除成功',
            type: 'success'
          })
          this.updateAll()
        }
      })
    },

    // 获得当天的标签事项
    getNowLabelEvent(nowDate) {
      GetLe(formatDate(nowDate)).then(({ data }) => {
        if (data.code !== 0) {
          ElementUI.Message({
            showClose: false,
            message: '获取标签事项信息失败',
            type: 'error'
          })
        } else {
          this.nowLabalEvent = data.data
        }
      })
    },

    // 获得当天的时刻事项
    getNowMomentEvent(nowDate) {
      GetMe(formatDate(nowDate)).then(({ data }) => {
        if (data.code !== 0) {
          ElementUI.Message({
            showClose: false,
            message: '获取标签事项信息失败',
            type: 'error'
          })
        } else {
          this.nowMomentEvent = data.data
        }
      })
    },

    // 获得当天的时段事项
    getNowTimeEvent(nowDate) {
      GetTe(formatDate(nowDate)).then(({ data }) => {
        if (data.code !== 0) {
          ElementUI.Message({
            showClose: false,
            message: '获取标签事项信息失败',
            type: 'error'
          })
        } else {
          this.nowTimeEvent = data.data
          //console.log(this.nowTimeEvent);
        }
      })
    },
  },
};
</script>

<style lang="less" scoped>
.page-container {
  padding: 20px;
}
.mode-select-base {
  width: 200px;
  display: inline-block;
  margin: 20px 20px 20px 20px;
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

// 以下为卡片样式

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  margin: 10px;
}
</style>
