<template>
  <div>
    <addDialog :addDialogVisible.sync="addDialogVisible"></addDialog>
    <el-button type="primary" @click="open" round>添加事项</el-button>

    <updateTeDialog :updateTeDialogVisible.sync="updateTeDialogVisible"></updateTeDialog>

    <updateMeDialog :updateMeDialogVisible.sync="updateMeDialogVisible"></updateMeDialog>

    <updateLeDialog :updateLeDialogVisible.sync="updateLeDialogVisible"></updateLeDialog>

    
    <!-- <el-table :data="tableDataTe" border height="200" style="width: 50%;">
      <el-table-column prop="startTime" label="开始时间" value-format="HH:mm:ss" width="100">
      </el-table-column>
      <el-table-column prop="overTime" label="结束时间" width="100">
      </el-table-column>
      <el-table-column prop="name" label="事项" width="120">
      </el-table-column>
      <el-table-column prop="text" label="备注" width="180">
      </el-table-column>
      <el-table-column label="操作">
        <el-button size="mini" type="primary" @click="updateTeDialogVisible = true" round>修改</el-button>
      </el-table-column>
    </el-table> -->
<!-- 
    <el-table :data="tableDataMe" border height="200" style="width: 50%;">
      <el-table-column prop="deadline" label="事件时间" width="180">
      </el-table-column>
      <el-table-column prop="name" label="事项" width="180">
      </el-table-column>
      <el-table-column prop="text" label="备注">
      </el-table-column>
      <el-table-column label="操作">
        <el-button size="mini" type="primary" @click="updateMeDialogVisible = true" round>修改</el-button>
      </el-table-column>
    </el-table> -->
    <!-- <el-table :data="tableDataLe" border height="200" style="width: 50%;">
      <el-table-column prop="name" label="事项" width="180">
      </el-table-column>
      <el-table-column prop="text" label="备注">
      </el-table-column>
      <el-table-column label="操作">
        <el-button size="mini" type="primary" @click="updateLeDialogVisible = true" round>修改</el-button>
      </el-table-column>
    </el-table>  -->
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
      selecte_date: "",

      addDialogVisible: false,
      updateTeDialogVisible: false,
      updateMeDialogVisible: false,
      updateLeDialogVisible: false,
      tableDataTe: {
        name:'',
        startTime:'',
        overTime:'',
        text:'',
      },
      tableDataMe: [],
      tableDataLe: [],
    };
  },
  methods: {
    open() {
      this.addDialogVisible = true
    }
  },
  mounted() {
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    let day = new Date().getDate();
    let data = year + '-' + month + '-' + day;
    GetTe(data).then(({ data }) => {
      this.tableDataTe = data.data;
    })
    GetMe(data).then(({ data }) => {
      this.tableDataMe = data.data;
    })
    GetLe(data).then(({ data }) => {
      this.tableDataLe = data.data;
    })
  }
};
</script>


<style></style>