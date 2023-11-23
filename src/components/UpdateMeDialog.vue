<template>
    <el-dialog @open="printME" title="时刻事项修改" :visible.sync="visible">
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
            <el-button type="primary" @click="SubmitPatchme">修 改</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { PatchMe, DeleteMe } from '../api/event';
import ElementUI from 'element-ui';
export default {
    name: 'updateMeDialog',
    data() {
        return {
            id: '',
            name: '',
            text: '',
            deadline: '',
            setInViewPage: true,
            completed: false,
            formLabelWidth: '120px',
            activeName: 'first',
            innerVisible: false,
        };
    },
    computed: {
        visible: {
            get() {
                return this.updateMeDialogVisible
            },
            set(value) {
                this.$emit("update:updateMeDialogVisible", value)
            }
        }
    },
    props: {
        updateMeDialogVisible: {
            type: Boolean,
            default: true
        },
        dataME: {
            type: Object,
            default: null
        }
    },
    methods: {
        timeConvert(date) {
            return new Date(date.setHours(date.getHours() + 8))
        },
        // 将传入的数据绑定到表格
        printME() {
            this.id = this.dataME.id;
            this.setInViewPage = this.dataME.setInViewPage;
            this.deadline = this.dataME.deadline;
            this.completed = this.dataME.completed;
            this.name = this.dataME.name;
            this.text = this.dataME.text;
        },
        Delete() {
            const data = this.dataME.id;
            DeleteMe(data).then(({ data }) => {
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
        SubmitPatchme() {
            const data = {
                id: this.id,
                name: this.name,
                text: this.text,
                deadline: this.timeConvert(new Date(this.deadline)),
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
            }
            if (this.deadline === '') {
                ElementUI.Message({
                    showClose: true,
                    message: '请选择时间',
                    type: 'error'
                })
                return
            }
            PatchMe(data).then(({ data }) => {
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