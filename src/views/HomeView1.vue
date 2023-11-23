<template>
  <div>
    <addDialog :addDialogVisible.sync="addDialogVisible"></addDialog>
    <el-button type="primary" @click="open" round>添加事项</el-button>

    <updateTeDialog :dataTE="dataTE" :updateTeDialogVisible.sync="updateTeDialogVisible"></updateTeDialog>

    <updateMeDialog :dataME="dataME" :updateMeDialogVisible.sync="updateMeDialogVisible"></updateMeDialog>

    <updateLeDialog :dataLE="dataLE" :updateLeDialogVisible.sync="updateLeDialogVisible"></updateLeDialog>
    <br>
    <t-space direction="horizontal" class="cardsize">
      <t-card title="时段事件" header bordered hover-shadow>
        <template>
          <t-table @row-click="openTE" bordered hover resizable lazyLoad row-key="index" :data="tableDataTe"
            :columns="columnsTE" :table-layout="tableLayout" :height="200" />
        </template>
      </t-card>
      <t-card title="时刻事项" header bordered hover-shadow>
        <template>
          <t-table @row-click="openME" bordered hover resizable lazyLoad row-key="index" :data="tableDataMe"
            :columns="columnsME" :table-layout="tableLayout" :height="200" />
        </template>
      </t-card>
      <t-card title="标签事项" header bordered hover-shadow>
        <template>
          <t-table @row-click="openLE" bordered hover resizable lazyLoad row-key="index" :data="tableDataLe"
            :columns="columnsLE" :table-layout="tableLayout" :height="200" />
        </template>
      </t-card>
    </t-space>
  </div>
</template>

<script>
import { GetTe, GetMe, GetLe } from '../api/event';
export default {
  components: {
    addDialog: () => import("@/components/AddEventDialog.vue"),
    updateTeDialog: () => import("@/components/UpdateTeDialog.vue"),
    updateMeDialog: () => import("@/components/UpdateMeDialog.vue"),
    updateLeDialog: () => import("@/components/UpdateLeDialog.vue"),
  },

  data() {
    return {
      addDialogVisible: false,
      updateTeDialogVisible: false,
      updateMeDialogVisible: false,
      updateLeDialogVisible: false,
      return_data: [],
      tableDataTe: [],
      tableDataMe: [],
      tableDataLe: [],
      oldstartTime: [],
      oldoverTime: [],
      olddeadline: [],
      dataTE: {},
      dataME: {},
      dataLE: {},
      columnsTE: [
        { colKey: 'name', title: '事件', width: '110' },
        { colKey: 'startTime', title: '开始时间', width: '100' },
        { colKey: 'overTime', title: '结束时间', width: '100' },
        { colKey: 'text', title: '备注', width: '150' }
      ],
      columnsME: [
        { colKey: 'name', title: '事件', width: '110' },
        { colKey: 'deadline', title: '时间', width: '100' },
        { colKey: 'text', title: '备注', width: '150' }
      ],
      columnsLE: [
        { colKey: 'name', title: '事件', width: '110' },
        { colKey: 'text', title: '备注', width: '150' }
      ],
    };
  },
  methods: {
    open() {
      this.addDialogVisible = true
    },
    openTE(context) {
      this.updateTeDialogVisible = true;
      this.dataTE = this.tableDataTe[context.index];
      this.dataTE.startTime = this.oldstartTime[context.index];
      this.dataTE.overTime = this.oldoverTime[context.index];
    },
    openME(context) {
      this.updateMeDialogVisible = true;
      this.dataME = this.tableDataMe[context.index];
      this.dataME.deadline = this.olddeadline[context.index];
    },
    openLE(context) {
      this.updateLeDialogVisible = true;
      this.dataLE = this.tableDataLe[context.index];
    },
    updateData() {
      let year = new Date().getFullYear();
      let month = new Date().getMonth() + 1;
      let day = new Date().getDate();
      let data = year + '-' + month + '-' + day;
      GetTe(data).then(({ data }) => {
        this.tableDataTe = data.data;
        for (let i = 0; i < this.tableDataTe.length; i++) {
          this.oldstartTime[i] = this.tableDataTe[i].startTime;
          this.oldoverTime[i] = this.tableDataTe[i].overTime;
          this.tableDataTe[i].startTime = this.tableDataTe[i].startTime.slice(11, 19);
          this.tableDataTe[i].overTime = this.tableDataTe[i].overTime.slice(11, 19);
        }
      })
      GetMe(data).then(({ data }) => {
        this.tableDataMe = data.data;
        for (let i = 0; i < this.tableDataMe.length; i++) {
          this.olddeadline[i] = this.tableDataMe[i].deadline;
          this.tableDataMe[i].deadline = this.tableDataMe[i].deadline.slice(11, 19);
        }
      })
      GetLe(data).then(({ data }) => {
        this.tableDataLe = data.data;
      })
    }
  },
  mounted() {
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    let day = new Date().getDate();
    let data = year + '-' + month + '-' + day;
    GetTe(data).then(({ data }) => {
      this.tableDataTe = data.data;
      for (let i = 0; i < this.tableDataTe.length; i++) {
        this.oldstartTime[i] = this.tableDataTe[i].startTime;
        this.oldoverTime[i] = this.tableDataTe[i].overTime;
        this.tableDataTe[i].startTime = this.tableDataTe[i].startTime.slice(11, 19);
        this.tableDataTe[i].overTime = this.tableDataTe[i].overTime.slice(11, 19);
      }
    })
    GetMe(data).then(({ data }) => {
      this.tableDataMe = data.data;
      for (let i = 0; i < this.tableDataMe.length; i++) {
        this.olddeadline[i] = this.tableDataMe[i].deadline;
        this.tableDataMe[i].deadline = this.tableDataMe[i].deadline.slice(11, 19);
      }
    })
    GetLe(data).then(({ data }) => {
      this.tableDataLe = data.data;
    })
  }
};
</script>


<style>
.cardsize {
  width: 100%;
  height: 100%;
}</style><template>
  <div>

    <!-- 添加按钮 -->
    <addDialog :addDialogVisible.sync="addDialogVisible"></addDialog>
    <div class="button-container">
      <el-button type="primary" class="floating-btn" icon="el-icon-plus" @click="open" circle></el-button>
    </div>

    <!-- 申请修删对话框的组件 -->
    <updateTeDialog :dataTE="dataTE" :updateTeDialogVisible.sync="updateTeDialogVisible"></updateTeDialog>
    <updateMeDialog :dataME="dataME" :updateMeDialogVisible.sync="updateMeDialogVisible"></updateMeDialog>
    <updateLeDialog :dataLE="dataLE" :updateLeDialogVisible.sync="updateLeDialogVisible"></updateLeDialog>

    <!-- 走马灯 -->
    <el-carousel :interval="4000" type="card" height="400px">
      <el-carousel-item v-for="item in pictureData" :key="item">
        <img :src="item.url" alt="" />
      </el-carousel-item>
    </el-carousel>

    <!-- 查询今日事项的表格 -->
    <t-space direction="horizontal" class="cardsize">
      <t-card title="时段事件" header bordered hover-shadow>
        <template>
          <t-table @row-click="openTE" bordered hover resizable lazyLoad row-key="index" :data="tableDataTe"
            :columns="columnsTE" :table-layout="tableLayout" :height="200" />
        </template>
      </t-card>
      <t-card title="时刻事项" header bordered hover-shadow>
        <template>
          <t-table @row-click="openME" bordered hover resizable lazyLoad row-key="index" :data="tableDataMe"
            :columns="columnsME" :table-layout="tableLayout" :height="200" />
        </template>
      </t-card>
      <t-card title="标签事项" header bordered hover-shadow>
        <template>
          <t-table @row-click="openLE" bordered hover resizable lazyLoad row-key="index" :data="tableDataLe"
            :columns="columnsLE" :table-layout="tableLayout" :height="200" />
        </template>
      </t-card>
    </t-space>
  </div>
</template>

<script>
import { GetTe, GetMe, GetLe } from '../api/event';
export default {
  // 引用的对话框组件
  components: {
    addDialog: () => import("@/components/AddEventDialog.vue"),
    updateTeDialog: () => import("@/components/UpdateTeDialog.vue"),
    updateMeDialog: () => import("@/components/UpdateMeDialog.vue"),
    updateLeDialog: () => import("@/components/UpdateLeDialog.vue"),
  },

  data() {
    return {

      // 对话框是否显示
      addDialogVisible: false,
      updateTeDialogVisible: false,
      updateMeDialogVisible: false,
      updateLeDialogVisible: false,

      // 图片数据
      pictureData: [
        { url:require("../img/1.png") },
        { url:require("../img/2.png") },
        { url:require("../img/3.png") },
        { url:require("../img/4.png") },
        { url:require("../img/5.png") },
        { url:require("../img/6.png") },
        { url:require("../img/7.png") },
        { url:require("../img/8.png") },
        { url:require("../img/9.png") },
        { url:require("../img/10.png") },
        { url:require("../img/11.png") },
        { url:require("../img/12.png") },
        { url:require("../img/13.png") },
        { url:require("../img/14.png") },
        { url:require("../img/15.png") },
        { url:require("../img/16.png") },
      ],

      // 表格数据源
      tableDataTe: [],
      tableDataMe: [],
      tableDataLe: [],

      // 未切片的时间数据
      oldstartTime: [],
      oldoverTime: [],
      olddeadline: [],

      // 传入子组件的数据
      dataTE: {},
      dataME: {},
      dataLE: {},

      // 表格的列数据格式
      columnsTE: [
        { colKey: 'name', title: '事件', width: '110' },
        { colKey: 'startTime', title: '开始时间', width: '100' },
        { colKey: 'overTime', title: '结束时间', width: '100' },
        { colKey: 'text', title: '备注', width: '150' }
      ],
      columnsME: [
        { colKey: 'name', title: '事件', width: '110' },
        { colKey: 'deadline', title: '时间', width: '100' },
        { colKey: 'text', title: '备注', width: '150' }
      ],
      columnsLE: [
        { colKey: 'name', title: '事件', width: '110' },
        { colKey: 'text', title: '备注', width: '150' }
      ],
    };
  },
  methods: {
    // 四个对话框的点击事件
    open() {
      this.addDialogVisible = true
    },
    openTE(context) {
      this.updateTeDialogVisible = true;
      this.dataTE = this.tableDataTe[context.index];
      this.dataTE.startTime = this.oldstartTime[context.index];
      this.dataTE.overTime = this.oldoverTime[context.index];
    },
    openME(context) {
      this.updateMeDialogVisible = true;
      this.dataME = this.tableDataMe[context.index];
      this.dataME.deadline = this.olddeadline[context.index];
    },
    openLE(context) {
      this.updateLeDialogVisible = true;
      this.dataLE = this.tableDataLe[context.index];
    },

    // 回调（无效）
    updateData() {
      let year = new Date().getFullYear();
      let month = new Date().getMonth() + 1;
      let day = new Date().getDate();
      let data = year + '-' + month + '-' + day;
      GetTe(data).then(({ data }) => {
        this.tableDataTe = data.data;
        for (let i = 0; i < this.tableDataTe.length; i++) {
          this.oldstartTime[i] = this.tableDataTe[i].startTime;
          this.oldoverTime[i] = this.tableDataTe[i].overTime;
          this.tableDataTe[i].startTime = this.tableDataTe[i].startTime.slice(11, 19);
          this.tableDataTe[i].overTime = this.tableDataTe[i].overTime.slice(11, 19);
        }
      })
      GetMe(data).then(({ data }) => {
        this.tableDataMe = data.data;
        for (let i = 0; i < this.tableDataMe.length; i++) {
          this.olddeadline[i] = this.tableDataMe[i].deadline;
          this.tableDataMe[i].deadline = this.tableDataMe[i].deadline.slice(11, 19);
        }
      })
      GetLe(data).then(({ data }) => {
        this.tableDataLe = data.data;
      })
    }
  },

  // 挂载get请求，填充进表格
  mounted() {
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    let day = new Date().getDate();
    let data = year + '-' + month + '-' + day;
    GetTe(data).then(({ data }) => {
      this.tableDataTe = data.data;
      for (let i = 0; i < this.tableDataTe.length; i++) {
        this.oldstartTime[i] = this.tableDataTe[i].startTime;
        this.oldoverTime[i] = this.tableDataTe[i].overTime;
        this.tableDataTe[i].startTime = this.tableDataTe[i].startTime.slice(11, 19);
        this.tableDataTe[i].overTime = this.tableDataTe[i].overTime.slice(11, 19);
      }
    })
    GetMe(data).then(({ data }) => {
      this.tableDataMe = data.data;
      for (let i = 0; i < this.tableDataMe.length; i++) {
        this.olddeadline[i] = this.tableDataMe[i].deadline;
        this.tableDataMe[i].deadline = this.tableDataMe[i].deadline.slice(11, 19);
      }
    })
    GetLe(data).then(({ data }) => {
      this.tableDataLe = data.data;
    })
  }
};
</script>


<style>
.cardsize {
  width: 100%;
  height: 100%;
}

.floating-btn {
  position: fixed;
  bottom: 100px;
  right: 50px;
  z-index: 999;
}



.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>