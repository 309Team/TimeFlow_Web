<template>
  <div>
    <t-calendar @cell-click="click" @month-change="changeMonth" @controller-change="changeMode">
      <div slot="cell" slot-scope="data" class="outerWrapper">
        <div class="number">{{ displayNum(data) }}</div>
        <template>
          <div class="slotWrapper">
            <div v-if="data.mode === 'month'">
              <div v-if="timeEvent[format(data.date)] && timeEvent[format(data.date)] > 0">
                <span :class="momentTag"></span>
                <el-tag type="primary">时段事项 {{ timeEvent[format(data.date)] }}</el-tag>
              </div>
              <div v-if="labelEvent[format(data.date)] && labelEvent[format(data.date)] > 0">
                <el-tag type="warning">标签事项 {{ labelEvent[format(data.date)] }}</el-tag>
              </div>
            </div>
            <div v-if="data.mode === 'year'">
              <div v-if="labelEvent[formatMonth(data.date)] && labelEvent[formatMonth(data.date)] > 0">
                <el-tag type="warning">标签事项 {{ labelEvent[formatMonth(data.date)] }}</el-tag>
              </div>
              <!-- 年视图该干的活 -->
            </div>
          </div>
          <div class="shadow" />
        </template>
      </div>
    </t-calendar>
    <div>
      <addDialog :addDialogVisible.sync="addDialogVisible" :parentDate="parentDate"></addDialog>
      <!-- <el-button @click="addDialogVisible = true">添加事项</el-button> -->
    </div>
  </div>

</template>

<script>
import '@/utils/dateFormat'
import '@/api/calendar'
import { formatDate } from '@/utils/dateFormat';
import { GetMonthLabelEvent, GetMonthMomentEvent, GetYearLabelEvent } from '@/api/calendar';
import ElementUI from 'element-ui';
export default {
  mounted() {
    this.getMonthLabelEvent(new Date())
    this.getMonthMomentEvent(new Date())
  },
  data() {
    return {
      curData: '',
      labelTag: 'error',
      momentTag: 'warning',
      timeTag: 'success',
      parentDate: new Date(),
      addDialogVisible: false,
      timeEvent: {},
      labelEvent: {},
      momentEvent: {},
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
      //alert(options.cell.formattedDate);
      this.parentDate = options.cell.date
      this.addDialogVisible = true
    },
    changeMonth(options) {
      let newDate = new Date(options.year + '-' + options.month)
      this.updateMonthData(newDate)
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

    // 获取当月每天的时段事项数
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
          this.labelEvent = data.data
          console.log(data.data);
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
    },


  },
};
</script>

<style lang="less" scoped>
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
  }
}
</style>
