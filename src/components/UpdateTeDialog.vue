<template>
    <el-dialog @open="printTE" title="时段事项" :visible.sync="visible">
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
        <div slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取 消</el-button>
            <el-button type="primary" @click="SubmitPatchte">修 改</el-button>
            <el-button type="danger" @click="Delete">删 除</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { PatchTe,DeleteTe } from '../api/event';
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
            isCompleted: false,
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
            default:null
        }
    },
    methods: {
        // 将传入的数据绑定到表格
        printTE() {
                this.id=this.dataTE.id;
                this.setInViewPage=this.dataTE.setInViewPage;
                this.startTime=this.dataTE.startTime;
                this.overTime=this.dataTE.overTime;
                this.isCompleted=this.dataTE.isCompleted;
                this.name=this.dataTE.name;
                this.text=this.dataTE.text;
        },
        Delete() {
            const data=this.dataTE.id;
            DeleteTe(data).then(({ data }) => {
                if (data.code !== 0) {
                    this.$message({
                        showClose: true,
                        message: data.msg,
                        type: 'error'
                    });
                } else {
                    this.$message({
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
                startTime: this.startTime,
                overTime: this.overTime,
                setInViewPage: this.setInViewPage,
                isCompleted: this.isCompleted,
            }
            PatchTe(data).then(({ data }) => {
                if (data.code !== 0) {
                    this.$message({
                        showClose: true,
                        message: data.msg,
                        type: 'error'
                    });
                } else {
                    this.$message({
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