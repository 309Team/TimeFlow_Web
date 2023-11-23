<template>
  <el-dialog @open="printTE" title="时段事项修改" :visible.sync="visible">
    <el-form>
      <el-form-item label="事项名称：" :label-width="formLabelWidth">
        <el-input v-model="name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="事项分类：" :label-width="formLabelWidth">
        <t-select-input :value="value" :min-collapsed-num="2" :popup-props="{ overlayInnerStyle: { padding: '6px' } }" placeholder="请选择" clearable multiple @tag-change="onTagChange">
          <template #panel>
            <t-checkbox-group :value="checkboxValue" :options="options" class="panel-options-collapsed-items" @change="onCheckedChange" />
          </template>
        </t-select-input>
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
    <el-dialog width="30%" title="是否确认删除该事项？" :visible.sync="innerVisible" append-to-body>
      <div slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = false">取 消</el-button>
        <el-button type="danger" @click="Delete">确 认</el-button>
      </div>
    </el-dialog>
    <div slot="footer" class="dialog-footer">
      <el-button type="danger" @click="innerVisible = true">删 除</el-button>
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="SubmitPatchte">修 改</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { PatchTe, DeleteTe } from '../api/event';
import { getClass, addClassToEvent, getClassOfEvent } from '@/api/classification'
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
      innerVisible: false,

      options: [],
      value: []
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
    },
    checkboxValue() {
      const arr = [];
      const list = this.value;
      // 此处不使用 forEach，减少函数迭代
      for (let i = 0, len = list.length; i < len; i++) {
        list[i].value && arr.push(list[i].value);
      }
      return arr;
    },
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

    getClassList() {
      getClass().then(({ data }) => {
        if (data.code !== 0) {
          ElementUI.Message({
            showClose: false,
            message: '请输入事项名',
            type: 'error'
          })
        } else {
          this.options = [{ label: 'Check All', checkAll: true }]
          for (let i = 0; i < data.data.length; ++i) {
            this.options.push({ label: data.data[i].name, value: data.data[i].id })
          }
        }
      })
    },
    onCheckedChange(val, { current, type }) {
      // current 不存在，则表示操作全选
      if (!current) {
        this.value = type === 'check' ? this.options.slice(1) : [];
        return;
      }
      // 普通操作
      if (type === 'check') {
        const option = this.options.find((t) => t.value === current);
        this.value.push(option);
      } else {
        this.value = this.value.filter((v) => v.value !== current);
      }
    },
    onTagChange(currentTags, context) {
      console.log(currentTags, context);
      const { trigger, index, item } = context;
      if (trigger === 'clear') {
        this.value = [];
      }
      if (['tag-remove', 'backspace'].includes(trigger)) {
        this.value.splice(index, 1);
      }
      if (trigger === 'enter') {
        const current = { label: item, value: item };
        this.value.push(current);
        this.options = this.options.concat(current);
      }
    },

    timeConvert(date) {
      return new Date(date.setHours(date.getHours() + 8))
    },
    // 将传入的数据绑定到表格
    printTE() {
      this.getClassList()
      this.id = this.dataTE.id;
      this.getClassesOfEvent()
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
          this.innerVisible = false;
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
          const addClassData = { id: this.id, list: this.checkboxValue }
          addClassToEvent(addClassData).then(({ data }) => {
            if (data.code !== 0) {
              ElementUI.Message({
                showClose: false,
                message: '添加分类失败',
                type: 'error'
              });
            }
          })
          this.visible = false;
          this.$emit("updateData");
        }
      })
    },

    getClassesOfEvent() {
      getClassOfEvent(this.id).then(({ data }) => {
        if (data.code !== 0) {
          ElementUI.Message({
            showClose: false,
            message: '获取分类失败',
            type: 'error'
          });
        } else {

          this.value = []
          for (let i = 0; i < data.data.length; ++i) {
            this.value.push({ label: data.data[i].name, value: data.data[i].id })
          }
        }
      })
    }
  }
}
</script>