<template>
  <div>
    <el-dialog title="添加事项" :visible.sync="visible">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="时段事项" name="timeEvent">
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
        </el-tab-pane>
        <el-tab-pane label="时刻事项" name="momentEvent">
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
            <el-form-item label="事项时间：" :label-width="formLabelWidth">
              <el-date-picker type="datetime" placeholder="选择日期时间" v-model="deadline" style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item label="是否完成：" :label-width="formLabelWidth">
              <el-switch v-model="completed"></el-switch>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="标签事项" name="labalEvent">
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
            <el-form-item label="事项时间：" :label-width="formLabelWidth">
              <el-date-picker type="date" placeholder="选择日期时间" v-model="attachDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item label="是否完成：" :label-width="formLabelWidth">
              <el-switch v-model="completed"></el-switch>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="OnSubmit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { PostLe, PostTe, PostMe } from '../api/event';
import ElementUI from 'element-ui';
export default {
  name: 'addEventDialog',
  data() {
    return {
      id: '',
      name: '',
      text: '',
      deadline: '',
      startTime: this.parentDate,
      overTime: '',
      attachDate: '',
      setInViewPage: true,
      completed: true,
      formLabelWidth: '120px',
      activeName: 'timeEvent',
    };
  },
  computed: {
    visible: {
      get() {
        return this.addDialogVisible
      },
      set(value) {
        this.$emit("update:addDialogVisible", value)
      }
    }
  },
  props: {
    addDialogVisible: {
      type: Boolean,
      default: true
    },
    parentDate: {
      type: Date,
      default: new Date()
    }
  },
  watch: {
    addDialogVisible: {
      handler() {
        this.name = '';
        this.text = '';
        this.overTime = '';
        this.deadline = this.parentDate;
        this.attachDate = this.parentDate;
        this.startTime = this.parentDate;
        this.completed = false;
        this.setInViewPage = true;
      }
    }
  },
  methods: {

    timeConvert(date) {
      return new Date(date.setHours(date.getHours() + 8))
    },

    openDialog() {
      this.visable = true;
      this.deadline = this.parentDate;
      this.attachDate = this.parentDate;
      this.startTime = this.parentDate;
    },

    OnSubmit() {
      if (this.name === '') {
        ElementUI.Message({
          showClose: true,
          message: '请输入事项名',
          type: 'error'
        })
        return
      }
      if (this.activeName == 'timeEvent') {
        if (this.startTime === '' || this.overTime === '') {
          ElementUI.Message({
            showClose: true,
            message: '请选择时间',
            type: 'error'
          })
          return
        }
        else if (this.startTime > this.overTime) {
          ElementUI.Message({
            showClose: true,
            message: '开始时间不能早于结束时间',
            type: 'error'
          })
          return
        }
        this.SubmitTe();
      } else if (this.activeName == 'momentEvent') {
        if (this.deadline === '') {
          ElementUI.Message({
            showClose: true,
            message: '请选择时间',
            type: 'error'
          })
          return
        }
        this.SubmitMe();
      } else {
        if (this.attachDate === '') {
          ElementUI.Message({
            showClose: true,
            message: '请选择时间',
            type: 'error'
          })
          return
        }
        this.SubmitLe();
      }
    },
    SubmitTe() {

      const data1 = {
        id: this.id,
        name: this.name,
        text: this.text,
        startTime: this.timeConvert(this.startTime),
        overTime: this.timeConvert(this.overTime),
        setInViewPage: this.setInViewPage,
        completed: this.completed,
      }
      console.log(data1);
      PostTe(data1).then(({ data }) => {
        if (data.code !== 0) {
          ElementUI.Message({
            showClose: true,
            message: data.msg,
            type: 'error'
          });
        } else {
          ElementUI.Message({
            showClose: true,
            message: '添加成功',
            type: 'success'
          });
          this.visible = false
          this.$emit("updateData")
        }
      })
    },
    SubmitMe() {
      const data = {
        id: this.id,
        name: this.name,
        text: this.text,
        deadline: this.timeConvert(this.deadline),
        setInViewPage: this.setInViewPage,
        completed: this.completed,
      }
      PostMe(data).then(({ data }) => {
        if (data.code !== 0) {
          ElementUI.Message({
            showClose: true,
            message: data.msg,
            type: 'error'
          });
        } else {
          ElementUI.Message({
            showClose: true,
            message: '添加成功',
            type: 'success'
          });
          this.visible = false
          this.$emit("updateData")
        }
      })
    },
    SubmitLe() {
      const data = {
        id: this.id,
        name: this.name,
        text: this.text,
        attachDate: this.timeConvert(this.attachDate),
        setInViewPage: this.setInViewPage,
        completed: this.completed,
      }
      // console.log(data)
      PostLe(data).then(({ data }) => {
        if (data.code !== 0) {
          ElementUI.Message({
            showClose: true,
            message: data.msg,
            type: 'error'
          });
        } else {
          ElementUI.Message({
            showClose: true,
            message: '添加成功',
            type: 'success'
          });
          this.visible = false
          this.$emit("updateData")
        }
      })
    }
  }
};
</script>
