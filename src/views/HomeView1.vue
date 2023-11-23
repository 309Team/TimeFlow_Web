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
}</style>