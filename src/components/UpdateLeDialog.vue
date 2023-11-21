<template>
    <el-dialog title="修改标签事项" :visible.sync="visible">
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
                <el-switch v-model="isCompleted"></el-switch>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取 消</el-button>
            <el-button type="primary" @click="SubmitPatchLe">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { PatchLe } from '../api/event';
export default {
  name: 'updateLeDialog',
    data() {
        return {
            id: '',
            name: '',
            text: '',
            attachDate: '',
            setInViewPage: true,
            isCompleted: false,
            formLabelWidth: '120px',
            activeName: 'first',
        };
    },
    computed: {
        visible: {
            get() {
                return this.updateLeDialogVisible
            },
            set(value) {
                this.$emit("update:updateLeDialogVisible", value)
            }
        }
    },
    props: {
        updateLeDialogVisible: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        SubmitPatchle() {
            const data = {
                id: this.id,
                name: this.name,
                text: this.text,
                attachDate: this.attachDate,
                setInViewPage: this.setInViewPage,
                isCompleted: this.isCompleted,
            }
            PatchLe(data).then(({ data }) => {
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
                }
            })
        },
    }
}
</script>