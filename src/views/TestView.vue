<template>
    <container class="page-container">

        <div class="timeline-div">
            <el-timeline>
                <el-timeline-item class="item" v-for="item in return_data" :key="item.id" :index="item.id">

                    <div>{{ item.startTime }}</div>

                    <el-card :body-style="{ padding: '15px' }" shadow="hover" @click.native=showdrawer(item)>
                        {{ item.name }}
                    </el-card>

                </el-timeline-item>
            </el-timeline>

            <el-drawer v-model="drawer_data" :title="`${drawer_data.name}`" :visible.sync="drawer">

                <Container class="drawer-div-startTime">
                    开始时间为： {{ drawer_data.startTime }}
                </Container>

                <Container class="drawer-div-overTime">
                    结束时间为：{{ drawer_data.overTime }}
                </Container>

                <Container class="drawer-div-text">
                    注释信息为： {{ drawer_data.text }}
                </Container>

            </el-drawer>
        </div>


        <div class="selecter-div">
            <div class="block">
                <!-- <span class="demonstration">使用 value-format</span>
                <div class="demonstration">值：{{ value2 }}</div> -->
                <el-date-picker v-model="selecte_date" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd" @change=getTE()>
                </el-date-picker>
            </div>
        </div>

    </container>
</template>
  
<script>
import { Container } from 'element-ui'
import { GetDayTEvent } from '../api/timeline.js'

export default {
    data() {
        return {
            return_data: [],
            drawer: false,

            drawer_data: {
                name: '',
                startTime: '',
                overTime: '',
                setInViewPage: '',
                text: '',
                completed: ''
            },
            selecte_date: "",

            data: {
            },
        };
    },
    methods: {
        showdrawer(item) {
            this.drawer_data.name = item.name
            this.drawer_data.startTime = item.startTime
            this.drawer_data.overTime = item.overTime
            this.drawer_data.text = item.text
            this.drawer_data.completed = item.completed

            this.drawer = true
            console.log(this.drawer_data)
        },
        getTE() {
            alert(this.selecte_date)
            GetDayTEvent(this.selecte_date).then((data) => {
                this.return_data = data.data.data
                console.log(this.return_data)
            })
        }
    },
    mounted() {
        GetDayTEvent('2023-10-21').then((data) => {
            // console.log(data)
            this.return_data = data.data.data
            // this.return_data.push("drawer",false)
            console.log(this.return_data)
        })
    },
    components: { Container }
}
</script>   

<style scoped>
.page-container {
    padding: 15px;
    height: 80vh;
    direction: "vertical";
}

.timeline-div {
    height: 200px;
}

.selecter-div {
    padding: 10px;
}

.drawer-div-startTime {
    height: 50px;
    background-color: #B3C0D1;
    padding: 15px;
}

.drawer-div-overTime {
    height: 50px;
    background-color: #B3C0D1;
    padding: 15px;
}

.drawer-div-text {
    height: 50px;
    background-color: #B3C0D1;
    padding: 15px;
}
</style>
  