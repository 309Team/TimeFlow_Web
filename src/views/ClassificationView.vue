<template>
    <div class="page-container">

        <!-- 新增按钮 -->
        <el-button type="primary" @click="showaddClass">+ 新增</el-button>

        <!-- 对话框:点击新增或编辑才会弹出表单 -->
        <!-- :before-close="closeDialog" 点击关闭的x之前要做的事情 -->
        <el-dialog :title="modalType == 0 ? '新建' : '编辑'" :visible.sync="dialogVisible" width="30%"
            :before-close="closeDialog">
            <!-- 表单Form -->
            <!-- ref=form:为了通过this.$refs调用组件的方法 -->
            <el-form :inline="false" :model="form" :rules="rules" ref="form" label-width="80px">
                <!-- 每一项表单域:el-form-item -->
                <el-form-item label="分类名" prop="name">
                    <el-input placeholder="请输入分类名" v-model="form.name"></el-input>
                </el-form-item>

                <el-form-item label="事项备注">
                    <el-input v-model="form.text"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </div>

        </el-dialog>


        <!-- 表格展示 -->
        <div class="common-table">
            <!-- 用户数据Table -->
            <el-table :data="tableData" stripe style="width: 100%" height="90%">
                <el-table-column prop="name" label="类别名称">
                </el-table-column>
                <el-table-column prop="text" label="注释信息">
                </el-table-column>


                <el-table-column label="包含内容">
                    <template slot-scope="scope">
                        <el-button @click="showEvtInClass(scope.row)">查看</el-button>
                    </template>
                </el-table-column>

                <!-- 自定义列 -->
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="editClass(scope.row)">编辑</el-button>
                        <el-button type="danger" @click="deleteClass(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>


        </div>


        <!-- 抽屉的格子 -->
        <div>
            <el-drawer v-model="drawer_data" :visible.sync="drawer">
                <div v-if="this.drawer_data.length == 0">
                    <el-card>
                        这个类别下没有数据
                    </el-card>

                </div>
                <el-card v-for="item in drawer_data" :key="item.id" :index="item.id" class="drawer-card">
                    <el-descriptions :title="item.name" direction="vertical" :column="3" border>
                        <el-descriptions-item label="名称">{{ item.name }}</el-descriptions-item>
                        <el-descriptions-item label="开始时间">{{ item.startTime.slice(0, 9) }} {{ item.startTime.slice(11, 19)
                        }}</el-descriptions-item>
                        <el-descriptions-item label="结束时间">{{ item.overTime.slice(0, 9) }} {{ item.startTime.slice(11, 19)
                        }}</el-descriptions-item>
                        <el-descriptions-item label="是否完成">
                            <el-tag size="small">{{ item.completed ? "YES" : "NO" }}</el-tag>
                        </el-descriptions-item>
                        <el-descriptions-item label="注释">{{ item.text }}</el-descriptions-item>
                    </el-descriptions>
                </el-card>
            </el-drawer>
        </div>
    </div>
</template>
  
<script>
import { getClass, addClass, deleteClass, updataClass } from '../api/classification'
import { listClass } from '../api/classification'
import ElementUI from 'element-ui'
export default {
    data() {
        return {
            // 表单绑定的数据
            form: {
                id: 0,
                name: '',
                text: '',
                include: [],
            },
            // 表单验证规则
            rules: {
                name: [{ required: true, message: '请输入分类名', trigger: 'blur' }],
                text: [{ required: false, message: '请输入年龄', trigger: 'blur' }]
            },
            // 表单是否打开
            dialogVisible: false,
            // editDialog
            // 列表数据
            tableData: [],

            // 打开表单:新建0,编辑1
            modalType: 0,

            //抽屉内容
            drawer_data: [],

            //抽屉是否可见
            drawer: false,
        }
    },
    methods: {
        // 获取列表数据
        getList() {
            this.tableData = []

            getClass().then((data) => {
                for (let i = 0; i < data.data.data.length; i++) {
                    this.tableData.push({
                        name: data.data.data[i].name,
                        id: data.data.data[i].id,
                        text: data.data.data[i].text,
                        include: [],
                    })

                }

                for (let i = 0; i < this.tableData.length; i++) {
                    let sd = {
                        "cid": []
                    }
                    sd.cid[0] = this.tableData[i].id
                    listClass(sd).then((data) => {
                        this.tableData[i].include = data.data.data
                    })
                }
            })


        },
        showaddClass() {
            this.modalType = 0
            this.openForm()
        },
        // 打开表单
        openForm() {
            this.dialogVisible = true
        },
        submit() {
            // 要用箭头函数, 若用function会报错, 不知道为什么
            this.$refs.form.validate((valid) => {
                // 符合校验
                if (valid) {
                    console.log(this.form);
                    // 提交数据
                    if (this.modalType === 0) {
                        // console.log(this.form)
                        addClass(this.form).then(() => {
                            this.getList()
                        })

                        ElementUI.Message({
                            type: 'success',
                            message: '添加成功!'
                        })

                    } else {
                        updataClass(this.form).then(() => {
                            this.getList()
                        })
                        // deleteClass(this.form.id).then(() => {
                        //     this.getList()
                        // })
                        // addClass(this.form).then(() => {
                        //     this.getList()
                        // })
                    }
                    // 清空,关闭
                    this.closeDialog()
                }
            })
        },
        //删除
        deleteClass(index) {
            this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 删除操作:
                deleteClass(index.id).then(() => {
                    ElementUI.Message({
                        type: 'success',
                        message: '删除成功!'
                    })
                    this.getList()
                });

                // deleteUser({ id: index.id }).then(() => {
                //   this.$message({
                //     type: 'success',
                //     message: '删除成功!'
                //   })
                //   this.getList()
                // });
            }).catch(() => {
                // 点击取消:不删除
                ElementUI.Message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        // 关闭对话框
        closeDialog() {
            // 先重置
            this.$refs.form.resetFields()
            // 后关闭
            this.dialogVisible = false
        },
        editClass(index) {
            this.modalType = 1
            this.openForm()
            // 深拷贝
            this.form = JSON.parse(JSON.stringify(index))

        },
        showEvtInClass(index) {
            this.drawer_data = index.include
            this.drawer = true

            console.log(this.drawer_data)
        },
        manageClass() {

        }

    },
    mounted() {
        this.getList()
    }
}
</script>
  
<style scoped>
.page-container {
    height: 70vh;
    padding: 50px;
}


.common-table {
    height: 90%;
    position: relative;
}
</style>