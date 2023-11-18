<template>
    <div class="calender" style="padding: 0 0; border: 0;">
        <el-calendar v-model="value">
            <div slot="dateCell" slot-scope="{data}" @click="viewEvent(data)">
                <p :class="data.isSelected ? 'is-selected' : ''">
                    {{ data.day.split('-').slice(2).join("-") }}
                    <br>
                    <!-- 时段事项标签 -->
                    <el-tag class="tags" v-if="monthEvent[data.day] && monthEvent[data.day].tEvent > 0">
                        {{ monthEvent[data.day].tEvent }}
                    </el-tag>

                    <!-- 标签事项标签 -->
                    <el-tag class="tags" type="warning" v-if="monthEvent[data.day] && monthEvent[data.day].lEvent > 0">
                        {{ monthEvent[data.day].lEvent }}
                    </el-tag>
                    <!-- 时段事项标签 -->
                    <el-tag class="tags" type="danger" v-if="monthEvent[data.day] && monthEvent[data.day].mEvent > 0">
                        {{ monthEvent[data.day].lEvent }}
                    </el-tag>
                </p>
            </div>
        </el-calendar>
    </div>
</template>
  
<script>


export default {
    data() {
        return {
            value: new Date(),
            monthEvent: {
                "2023-11-18": {
                    mEvent: 10,
                    lEvent: 5,
                    tEvent: 3,
                },

            }

        }
    },
    components:{

    },
    methods: {
        viewEvent(data) {
            // 通过此事件调用显示函数
            console.log(data);
        }                                              
    }
}


</script>

<style scoped>
.container {
    /* height: 100vh; */
    /* flex: auto; */
    /* margin: 0; */
    padding: 0;
    border: 0;
    margin-left: 0px;
    width: auto;
    height: 100%;
}

.tags {
    margin: 5px;
}
</style>