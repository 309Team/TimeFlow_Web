<template>
    <div class="page-container">

        <div class="leftside">
            <!-- 添加事项按钮 -->
            <div class="addEvent-div">
                <addDialog :addDialogVisible.sync="addDialogVisible"></addDialog>
                <add-event-dialog></add-event-dialog>
                <el-button round @click="open">添加事项</el-button>
            </div>


            <!-- 时间轴的格子 -->
            <div class="timeline-div" style="margin-left: 80px;">
                <h3>时间轴</h3>
                <div v-if="return_data.length == 0">
                    <h5>今天没有事项</h5>
                    <!-- {{ return_data }} -->
                </div>


                <el-timeline>
                    <el-timeline-item class="item" v-for="item in return_data" :key="item.id" :index="item.id">

                        <div>{{ item.startTime.slice(11, 19) }}</div>

                        <el-card :body-style="{ padding: '15px' }" shadow="hover" @click.native=showdrawer(item)>
                            {{ item.name }}
                        </el-card>

                    </el-timeline-item>
                </el-timeline>

            </div>

        </div>



        <!-- 抽屉的格子 -->
        <div>
            <el-drawer v-model="drawer_data" :title="`${drawer_data.name}`" :visible.sync="drawer">

                <el-card shadow="hover" class="drawer-card-startTime">
                    开始时间为： {{ drawer_data.startTime }}
                </el-card>

                <el-card shadow="hover" class="drawer-card-overTime">
                    结束时间为：{{ drawer_data.overTime }}
                </el-card>

                <el-card shadow="hover" class="drawer-card-text">
                    注释信息为： {{ drawer_data.text }}
                </el-card>

            </el-drawer>
        </div>

        <!-- 日期选择器的格子 -->
        <div class="selecter-div">
            <el-card shadow="always">
                <h3>选择展示日期</h3>
                <div class="block">
                    <!-- <span class="demonstration">使用 value-format</span>
                <div class="demonstration">值：{{ value2 }}</div> -->
                    <el-date-picker v-model="selecte_date" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd" @change=getTE()>
                    </el-date-picker>
                </div>
            </el-card>
        </div>




    </div>
</template>
  
<script>
// import { Container } from 'element-ui'
import { GetDayTEvent } from '../api/timeline.js'

export default {
    data() {
        return {
            return_data: [],
            drawer: false,
            addDialogVisible: false,

            drawer_data: {
                name: '',
                startTime: '',
                overTime: '',
                setInViewPage: '',
                text: '',
                completed: ''
            },

            selecte_date: "",
            today: "",

            data: {
            },
        };
    },
    methods: {
        showdrawer(item) {
            this.drawer_data.name = item.name
            this.drawer_data.startTime = item.startTime.slice(0, 9)
            this.drawer_data.overTime = item.overTime.slice(0, 9)
            this.drawer_data.text = item.text
            this.drawer_data.completed = item.completed

            this.drawer = true
            // console.log(this.drawer_data)
        },
        getTE() {
            // alert(this.selecte_date)
            GetDayTEvent(this.selecte_date).then((data) => {
                this.return_data = data.data.data
                // console.log(this.return_data)
            })
        },
        open() {
            this.addDialogVisible = true
        }
    },
    mounted() {
        const now = new Date();
        this.selecte_date = now.getFullYear() + "-" + ('0' + (now.getMonth() + 1)).slice(-2) + "-" + ('0' + now.getDate()).slice(-2);

        GetDayTEvent(this.selecte_date).then((data) => {
            this.return_data = data.data.data
        })
    },
    components: {
        // Container,
        addDialog: () => import("@/components/AddEventDialog.vue")
    }
}
</script>   

<style scoped>
.page-container {
    padding: 30px;
    height: 80vh;
    direction: "vertical";
    display: flex;
}

.leftside {
    display: flex;

}

.timeline-div {
    height: auto;
    width: 300px;
}

.selecter-div {
    height: auto;
    width: 400px;
    padding: 10px;
    margin-left: 80px;
}

.addEvent-div {
    height: auto;
    width: 110px;
}

.drawer-card-startTime {
    height: 100px;
    padding: 15px;
}

.drawer-card-overTime {
    height: 100px;
    padding: 15px;
}

.drawer-card-text {
    height: 100px;

    padding: 15px;
}
</style>
  