<template>
  <el-dialog @open="printTE" title="时段事项修改" :visible.sync="visible">
    <el-form>
      <el-form-item label="事项名称：" :label-width="formLabelWidth">
        <el-input v-model="name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="事项备注：" :label-width="formLabelWidth">
        <el-input v-model="text"></el-input>
      </el-form-item>

      <el-form-item label="纳入视图：" :label-width="formLabelWidth">
        <el-switch v-model="setInViewPage"></el-switch>
      </el-form-item>

      <el-form-item label="开始时间：" :label-width="formLabelWidth">
        <el-date-picker type="datetime" placeholder="选择日期时间" v-model="startTime" style="width: 100%;"></el-date-picker>
      </el-form-item>

      <el-form-item label="结束时间：" :label-width="formLabelWidth">
        <el-date-picker type="datetime" placeholder="选择日期时间" v-model="overTime" style="width: 100%;"></el-date-picker>
      </el-form-item>

      <el-form-item label="是否完成：" :label-width="formLabelWidth">
        <el-switch v-model="completed"></el-switch>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="danger" @click="Delete">删 除</el-button>
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="SubmitPatchte">修 改</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { PatchTe, DeleteTe } from '../api/event';
import ElementUI from 'element-ui';
export default {
  name: 'updateTeDialog',
  data() {
    return {
      id: this.dataTE.id,
      name: this.dataTE.name,
      text: this.dataTE.text,
      startTime: '',
      overTime: '',
      setInViewPage: true,
      completed: false,
      formLabelWidth: '120px',
      activeName: 'first',
    };
  },
  computed: {
    visible: {
      get() {
        return this.updateTeDialogVisible
      },
      set(value) {
        this.$emit("update:updateTeDialogVisible", value)
      }
    }
  },
  props: {
    updateTeDialogVisible: {
      type: Boolean,
      default: true
    },
    dataTE: {
      type: Object,
      default: null
    }
  },
  methods: {
    timeConvert(date) {
      return new Date(date.setHours(date.getHours() + 8))
    },
    printTE() {
      this.id = this.dataTE.id;
      this.setInViewPage = this.dataTE.setInViewPage;
      this.startTime = this.dataTE.startTime;
      this.overTime = this.dataTE.overTime;
      this.completed = this.dataTE.completed;
      this.name = this.dataTE.name;
      this.text = this.dataTE.text;
    },
    Delete() {
      const data = this.dataTE.id;
      DeleteTe(data).then(({ data }) => {
        if (data.code !== 0) {
          ElementUI.Message({
            showClose: true,
            message: data.msg,
            type: 'error'
          });
        } else {
          ElementUI.Message({
            showClose: true,
            message: '删除成功',
            type: 'success'
          });
          this.visible = false;
          this.$emit("updateData");
        }
      })
    },
    SubmitPatchte() {
      const data = {
        id: this.id,
        name: this.name,
        text: this.text,
        startTime: this.timeConvert(new Date(this.startTime)),
        overTime: this.timeConvert(new Date(this.overTime)),
        setInViewPage: this.setInViewPage,
        completed: this.completed,
      }
      if (this.name === '') {
        ElementUI.Message({
          showClose: true,
          message: '请输入事项名',
          type: 'error'
        })
        return
      } else if (this.startTime === '' || this.overTime === '') {
        ElementUI.Message({
          showClose: true,
          message: '请选择时间',
          type: 'error'
        })
        return
      } else if (this.startTime > this.overTime) {
        ElementUI.Message({
          showClose: true,
          message: '开始时间不能早于结束时间',
          type: 'error'
        })
        return
      }
      PatchTe(data).then(({ data }) => {
        if (data.code !== 0) {
          ElementUI.Message({
            showClose: true,
            message: data.msg,
            type: 'error'
          });
        } else {
          ElementUI.Message({
            showClose: true,
            message: '修改成功',
            type: 'success'
          });
          this.visible = false;
          this.$emit("updateData");
        }
      })
    },
  }
}
</script>