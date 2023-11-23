<template>
    <Container class="page-container">

        <div class="block">
            <span class="demonstration">选择查看日期</span>

            <el-date-picker v-model="date_range" type="daterange" range-separator="至" start-placeholder="开始日期"
                end-placeholder="结束日期" @change="getStatistic">
            </el-date-picker>
        </div>

        <div id="histogram" style="width: 600px;height:400px;"></div>
        <div id="NestedPies" style="width: 1000px;height:800px;"></div>
    </Container>
</template>

<script>
import * as echarts from 'echarts'
import { getClsStatistic } from '../api/statistic'
import { getEvtStatistic } from '../api/statistic'
import { Container } from 'element-ui';

export default {
    data() {
        return {
            ClsStatistic_data: {},
            EvtStatistic_data: {},
            date_range: "",

        };
    },
    methods: {
        getStatistic() {
            let startTimeSTR = this.date_range[0].getFullYear() + "-" + ('0' + (this.date_range[0].getMonth() + 1)).slice(-2) + "-" + ('0' + this.date_range[0].getDate()).slice(-2);
            let overTimeSTR = this.date_range[1].getFullYear() + "-" + ('0' + (this.date_range[1].getMonth() + 1)).slice(-2) + "-" + ('0' + this.date_range[1].getDate()).slice(-2);
            this.getchart(startTimeSTR,overTimeSTR)
        },
        getchart(startTime, overTime) {

            let cls_name = []
            let cls_duration = []
            let cls_name_duration = []
            let evt_name = []
            // let evt_duration = []
            let evt_name_duration = []

            //获得事项的数组
            getEvtStatistic(startTime, overTime).then(res => {
                this.EvtStatistic_data = res.data.data
                // console.log(this.EvtStatistic_data)
                for (let i = 0; i < this.EvtStatistic_data.length; i++) {
                    evt_name[i] = this.EvtStatistic_data[i].tevent.name
                    // evt_duration[i] = this.EvtStatistic_data[i].duration
                    evt_name_duration.push({
                        value: this.EvtStatistic_data[i].duration,
                        name: evt_name[i]
                    })
                }
            })


            getClsStatistic(startTime, overTime).then(res => {
                this.ClsStatistic_data = res.data.data
                // console.log(this.ClsStatistic_data)
                for (let i = 0; i < this.ClsStatistic_data.length; i++) {
                    cls_name[i] = this.ClsStatistic_data[i].cls.name
                    cls_duration[i] = this.ClsStatistic_data[i].duration
                    cls_name_duration.push({
                        value: cls_duration[i],
                        name: cls_name[i]
                    })
                }
                // console.log(cls_name_duration)

                //设置柱状图
                window.histogram.setOption({
                    title: {
                        text: '各分类下的时间分布'
                    },
                    tooltip: {

                    },
                    legend: {
                        data: ['时间']
                    },
                    xAxis: {
                        name: '类名',
                        data: cls_name
                    },
                    yAxis: {
                        name: '时间',
                        type: 'value'
                    },
                    series: [
                        {
                            name: '时间',
                            type: 'bar', // 类型为柱状图
                            data: cls_duration,
                            barWidth: '50%', // 柱条宽度 每个柱条的宽度就是类目宽度的 20%
                            // 柱子的样式
                            itemStyle: {
                                color: '#5574c2'
                            }
                        }
                    ]
                })

                //设置嵌套环形图
                window.NestedPies.setOption(
                    {
                        tooltip: {
                            trigger: 'item',
                            formatter: '{a} <br/>{b}: {c} ({d}%)'
                        },
                        legend: {
                            //外围的事项
                            data: evt_name
                        },
                        series: [
                            {
                                name: 'Access From',
                                type: 'pie',
                                selectedMode: 'single',
                                radius: [0, '30%'],
                                label: {
                                    position: 'inner',
                                    fontSize: 14
                                },
                                labelLine: {
                                    show: false
                                },
                                data: cls_name_duration
                            },
                            {
                                name: 'Access From',
                                type: 'pie',
                                radius: ['45%', '60%'],
                                labelLine: {
                                    length: 30
                                },
                                label: {
                                    formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                                    backgroundColor: '#F6F8FC',
                                    borderColor: '#8C8D8E',
                                    borderWidth: 1,
                                    borderRadius: 4,
                                    rich: {
                                        a: {
                                            color: '#6E7079',
                                            lineHeight: 22,
                                            align: 'center'
                                        },
                                        hr: {
                                            borderColor: '#8C8D8E',
                                            width: '100%',
                                            borderWidth: 1,
                                            height: 0
                                        },
                                        b: {
                                            color: '#4C5058',
                                            fontSize: 14,
                                            fontWeight: 'bold',
                                            lineHeight: 33
                                        },
                                        per: {
                                            color: '#fff',
                                            backgroundColor: '#4C5058',
                                            padding: [3, 4],
                                            borderRadius: 4
                                        }
                                    }
                                },
                                data: evt_name_duration
                            }
                        ]
                    }
                )


            })







        },

    },
    mounted() {
        //设置为全局变量可以加快响应速度
        window.histogram = echarts.init(document.getElementById('histogram'));
        window.NestedPies = echarts.init(document.getElementById('NestedPies'));


        this.getchart("2023-10-21", "2023-10-21")
    },
    components: {
        Container
    }
}
</script>


<style scoped>
.page-container {
    height: auto;
    width: auto;
    padding: 20px;
}
</style>
  