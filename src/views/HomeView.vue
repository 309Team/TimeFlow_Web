<template>
  <div>
    <el-button type="primary" @click="dialogFormVisible = true" round>添加事项</el-button>
    <el-dialog title="添加事项" :visible.sync="dialogFormVisible">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="时段事项" name="first">
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
              <el-date-picker type="datetime" placeholder="选择日期时间" v-model="startTime"
                style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间：" :label-width="formLabelWidth">
              <el-date-picker type="datetime" placeholder="选择日期时间" v-model="overTime"
                style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item label="是否完成：" :label-width="formLabelWidth">
              <el-switch v-model="isCompleted"></el-switch>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="时刻事项" name="second">
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
              <el-date-picker type="datetime" placeholder="选择日期时间" v-model="deadline"
                style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item label="是否完成：" :label-width="formLabelWidth">
              <el-switch v-model="isCompleted"></el-switch>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="标签事项" name="third">
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
              <el-date-picker type="date" placeholder="选择日期时间" v-model="attachDate"
                style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item label="是否完成：" :label-width="formLabelWidth">
              <el-switch v-model="isCompleted"></el-switch>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="OnSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { PostLe, PostTe, PostMe } from '../api/event';
export default {
  data() {
    return {
      dialogFormVisible: false,
      id: '',
      name: '',
      text: '',
      deadline: '',
      startTime: '',
      overTime: '',
      attachDate: '',
      setInViewPage: true,
      isCompleted: false,
      formLabelWidth: '120px',
      activeName: 'first',
    };

  },
  methods: {
    OnSubmit() {
      if (this.activeName == 'first') {
        this.SubmitTe();
      } else if (this.activeName == 'second') {
        this.SubmitMe();
      } else {
        this.SubmitLe();
      }
    },
    SubmitTe() {
      const data = {
        id: this.id,
        name: this.name,
        text: this.text,
        startTime:this.startTime,
        overTime:this.overTime,
        setInViewPage: this.setInViewPage,
        isCompleted: this.isCompleted,
      }
      PostTe(data).then(({ data }) => {
        if (data.code !== 0) {
          this.$message({
            showClose: true,
            message: data.msg,
            type: 'error'
          });
        } else {
          this.$message({
            showClose: true,
            message: '添加成功',
            type: 'success'
          });
          this.dialogFormVisible = false;
        }
      })
    },
    SubmitMe() {
      const data = {
        id: this.id,
        name: this.name,
        text: this.text,
        deadline: this.deadline,
        setInViewPage: this.setInViewPage,
        isCompleted: this.isCompleted,
      }
      PostMe(data).then(({ data }) => {
        if (data.code !== 0) {
          this.$message({
            showClose: true,
            message: data.msg,
            type: 'error'
          });
        } else {
          this.$message({
            showClose: true,
            message: '添加成功',
            type: 'success'
          });
          this.dialogFormVisible = false;
        }
      })
    },
    SubmitLe() {
      const data = {
        id: this.id,
        name: this.name,
        text: this.text,
        attachDate: this.attachDate,
        setInViewPage: this.setInViewPage,
        isCompleted: this.isCompleted,
      }
      PostLe(data).then(({ data }) => {
        if (data.code !== 0) {
          this.$message({
            showClose: true,
            message: data.msg,
            type: 'error'
          });
        } else {
          this.$message({
            showClose: true,
            message: '添加成功',
            type: 'success'
          });
          this.dialogFormVisible = false;
        }
      })
    }
  }
};
</script>
