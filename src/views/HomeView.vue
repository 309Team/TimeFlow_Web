<template>
  <div class="cl">
    <el-row>
      <el-col>
        <template>
          <!-- 头部数据展示 -->
          <el-carousel indicator-position="none" arrow="never" height="300px">

            <el-carousel-item v-for="item in imgList" :key="item.id">
              <el-image :src='item.url'></el-image>
              <div class="carousel-text">
                <h3 v-if="nowTime.getHours() > 6 && nowTime.getHours() < 11">早上好！</h3>
                <h3 v-else-if="nowTime.getHours() >= 11 && nowTime.getHours() < 14">中午好！</h3>
                <h3 v-else-if="nowTime.getHours() >= 14 && nowTime.getHours() < 18">下午好！</h3>
                <h3 v-else-if="nowTime.getHours() >= 18 && nowTime.getHours() < 23">晚上好！</h3>
                <h3 v-else>夜深了。</h3>
                <br>
                <h4 v-if="TERunning != 0"> 当前有{{TERunning}}项事项正在进行</h4>
                <h4 v-else>所有事项都忙完啦，可以休息一下了！</h4>
              </div>
            </el-carousel-item>
          </el-carousel>
        </template>
      </el-col>
    </el-row>

    <h4 style="padding: 10px">今日事项一览：</h4>

    <t-space direction="horizontal" class="cardsize">
      <t-card title="时段事项" header hover-shadow>
        <template>
          <t-table @row-click="openTE" hover resizable lazyLoad row-key="index" :data="tableDataTe" :columns="columnsTE" :table-layout="tableLayout" :height="200" />
        </template>
      </t-card>
      <t-card title="时刻事项" header hover-shadow>
        <template>
          <t-table @row-click="openME" hover resizable lazyLoad row-key="index" :data="tableDataMe" :columns="columnsME" :table-layout="tableLayout" :height="200" />
        </template>
      </t-card>
      <t-card title="标签事项" header hover-shadow>
        <template>
          <t-table @row-click="openLE" hover resizable lazyLoad row-key="index" :data="tableDataLe" :columns="columnsLE" :table-layout="tableLayout" :height="200" />
        </template>
      </t-card>
    </t-space>

    <!-- 添加按钮 -->
    <addDialog :addDialogVisible.sync="addDialogVisible" @updateData="updateAll" :parentDate="nowTime"></addDialog>
    <el-button type="primary" class="float-button" @click="addDialogVisible=true">添加事项</el-button>

    <!-- 修改组件导入 -->
    <updateTeDialog :dataTE="chooseEvent" :updateTeDialogVisible.sync="updateTeDialogVisible" @updateData="getNowTimeEvent(new Date())"></updateTeDialog>
    <updateMeDialog :dataME="chooseEvent" :updateMeDialogVisible.sync="updateMeDialogVisible" @updateData="getNowMomentEvent(new Date())"></updateMeDialog>
    <updateLeDialog :dataLE="chooseEvent" :updateLeDialogVisible.sync="updateLeDialogVisible" @updateData="getNowLabelEvent(new Date())"></updateLeDialog>

  </div>
</template>
<script>
import { GetTe, GetMe, GetLe } from '@/api/event';
import { formatDate, formatTimeHHMM } from '@/utils/dateFormat';
import ElementUI from 'element-ui';
import { ErrorCircleFilledIcon, CheckCircleFilledIcon, CloseCircleFilledIcon, InfoCircleFilledIcon } from 'tdesign-icons-vue';
export default {
  components: {
    addDialog: () => import("@/components/AddEventDialog.vue"),

    updateTeDialog: () => import("@/components/UpdateTeDialog.vue"),
    updateMeDialog: () => import("@/components/UpdateMeDialog.vue"),
    updateLeDialog: () => import("@/components/UpdateLeDialog.vue"),
  },

  mounted() {
    let today = new Date()
    this.getNowTimeEvent(today)
    this.getNowMomentEvent(today)
    this.getNowLabelEvent(today)
  },

  data() {
    return {
      imgList: [
        { id: 0, url: require('@/static/headimg/0.png') }
      ],

      // 今日一览数量
      TENumber: 0,
      TERunning: 0,
      TEFinish: 0,

      // 需要的参数
      nowTime: new Date(),
      chooseEvent: {},

      // 组件可见性
      addDialogVisible: false,
      updateTeDialogVisible: false,
      updateMeDialogVisible: false,
      updateLeDialogVisible: false,

      // 今日所有事项
      todayTimeEventList: [],
      todayMomentEventList: [],
      todayLabelEventList: [],

      // 展示在列表的事项
      tableDataTe: [],
      tableDataMe: [],
      tableDataLe: [],

      // 各事项组件行列声明
      columnsTE: [
        { colKey: 'name', title: '事件', width: '150' },
        { colKey: 'startTime', title: '开始时间', width: '120' },
        { colKey: 'overTime', title: '结束时间', width: '120' },
        {
          colKey: 'status',
          title: '状态',
          width: '100',
          cell: (h, { row }) => {
            const statusNameListMap = {
              0: { label: '已完成', theme: 'success', icon: <CheckCircleFilledIcon /> },
              1: { label: '进行中', theme: 'danger', icon: <CloseCircleFilledIcon /> },
              2: { label: '未开始', theme: 'warning', icon: <ErrorCircleFilledIcon /> },
              3: { label: '已结束', theme: 'success', icon: <InfoCircleFilledIcon /> },
            };
            return (
              <t-tag shape="round" theme={statusNameListMap[row.status].theme} variant="light-outline">
                {statusNameListMap[row.status].icon}
                {statusNameListMap[row.status].label}
              </t-tag>
            );
          },
        },

      ],
      columnsME: [

        { colKey: 'name', title: '事件', width: '100' },
        { colKey: 'deadline', title: '时间', width: '100' },
        {
          colKey: 'status',
          title: '状态',
          width: '100',
          cell: (h, { row }) => {
            const statusNameListMap = {
              0: { label: '已完成', theme: 'success', icon: <CheckCircleFilledIcon /> },
              1: { label: '已过时间', theme: 'danger', icon: <CloseCircleFilledIcon /> },
              2: { label: '未到时间', theme: 'warning', icon: <ErrorCircleFilledIcon /> },
            };
            return (
              <t-tag shape="round" theme={statusNameListMap[row.status].theme} variant="light-outline">
                {statusNameListMap[row.status].icon}
                {statusNameListMap[row.status].label}
              </t-tag>
            );
          },
        },
      ],
      columnsLE: [
        { colKey: 'name', title: '事件', width: '110' },
        { colKey: 'text', title: '备注', width: '150' },
        {
          colKey: 'status',
          title: '状态',
          width: '100',
          cell: (h, { row }) => {
            const statusNameListMap = {
              0: { label: '已完成', theme: 'success', icon: <CheckCircleFilledIcon /> },
              1: { label: '未完成', theme: 'danger', icon: <CloseCircleFilledIcon /> },
            };
            return (
              <t-tag shape="round" theme={statusNameListMap[row.status].theme} variant="light-outline">
                {statusNameListMap[row.status].icon}
                {statusNameListMap[row.status].label}
              </t-tag>
            );
          },
        },
      ],
    };
  },

  methods: {

    // 打开编辑窗口的操作
    openTE(context) {
      this.updateTeDialogVisible = true;
      this.chooseEvent = this.todayTimeEventList[context.index]
    },
    openME(context) {
      this.updateMeDialogVisible = true;
      this.chooseEvent = this.todayMomentEventList[context.index]
    },
    openLE(context) {
      this.updateLeDialogVisible = true;
      this.chooseEvent = this.todayLabelEventList[context.index]
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
          this.todayLabelEventList = data.data
          this.setTableLabelEvent()
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
          this.todayMomentEventList = data.data
          this.setTableMomentEvent()
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
          this.todayTimeEventList = data.data
          this.setTableTimeEvent()
          //console.log(this.nowTimeEvent);
        }
      })
    },

    // 将时段事项数据注入表中
    setTableTimeEvent() {
      let start, over, status, itemTime
      this.tableDataTe = [] // 先将表单清空
      this.TERunning = 0
      for (let item in this.todayTimeEventList) {
        itemTime = new Date(this.todayTimeEventList[item].startTime)
        start = formatDate(itemTime) === formatDate(this.nowTime) ? formatTimeHHMM(itemTime) : formatDate(itemTime) + '\n' + formatTimeHHMM(itemTime)
        itemTime = new Date(this.todayTimeEventList[item].overTime)
        over = formatDate(itemTime) === formatDate(this.nowTime) ? formatTimeHHMM(itemTime) : formatDate(itemTime) + '\n' + formatTimeHHMM(itemTime)
        if (this.todayTimeEventList[item].completed) { // 已完成
          status = 0
        } else { // 未开始
          if (new Date(this.todayTimeEventList[item].startTime) > this.nowTime)
            status = 2
          else if (new Date(this.todayTimeEventList[item].overTime) < this.nowTime) // 已结束
            status = 3
          else {
            status = 1
            this.TERunning += 1
          } // 进行中

        }
        this.tableDataTe.push({ name: this.todayTimeEventList[item].name, startTime: start, overTime: over, status: status })
      }
    },

    // 将时刻事项数据注入表中
    setTableMomentEvent() {
      let status, itemTime
      this.tableDataMe = [] // 先将表单清空
      for (let item in this.todayMomentEventList) {
        itemTime = new Date(this.todayMomentEventList[item].deadline)
        if (this.todayMomentEventList[item].completed) { // 已完成
          status = 0
        } else { // 未开始
          if (itemTime > this.nowTime)
            status = 2
          else
            status = 1
        }
        this.tableDataMe.push({ name: this.todayMomentEventList[item].name, deadline: formatTimeHHMM(itemTime), status: status })
      }
    },

    // 将标签事项注入表中
    setTableLabelEvent() {
      let status
      this.tableDataLe = [] // 先将表单清空
      for (let item in this.todayLabelEventList) {
        if (this.todayLabelEventList[item].completed) { // 已完成
          status = 0
        } else { // 未开始
          status = 1
        }
        this.tableDataLe.push({
          name: this.todayLabelEventList[item].name,
          attachDate: this.todayLabelEventList[item].attachDate,
          status: status,
          text: this.todayLabelEventList[item].text === '' ? '暂无备注' : this.todayLabelEventList[item].text
        })
      }
    },

    updateAll() {
      this.getNowLabelEvent(this.nowTime)
      this.getNowMomentEvent(this.nowTime)
      this.getNowTimeEvent(this.nowTime)
    }
  }
}
</script>
<style>
.carousel-text {
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: white;
  font-size: 16px;
  padding: 5px 10px;
  pointer-events: none;
}
.cl {
  width: auto;
}
.el-row {
  width: auto;
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.el-carousel__item h3 {
  color: #ffffff;
  font-size: 30px;
  line-height: 10px;
  margin: 10px;
}
.el-carousel__item h4 {
  color: #ffffff;
  margin: 10px;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.cardsize {
  width: auto;
  height: 100%;
  margin: 10px;
}

.float-button {
  position: fixed;
  bottom: 80px;
  right: 20px;
}
</style>