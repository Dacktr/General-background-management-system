<template>
    <div ref="echart"></div>
</template>
<script>
import * as echarts from 'echarts'
export default {
    props: {
        isAxisChart: {
            //用于区分柱状图，饼状图，折线图
            type: Boolean,
            //默认值
            default: true,
        },
         //对传入的数据类型进行判断
        chartData: {
            type: Object,
            default() {
                return{
                    xData: [],
                    series: []
                }
            }
        }
    },
    //数据监听,因为数据的改变，图表也需要重新画
    watch:{
        chartData: {
            handler: function() {
                this.initChart()
            },
            //首次监听需要用到deep?深度监听
            deep: true
        }
    },
    methods: {
        //对echarts初始化
        initChart(){
            this.initChartData()
            //判断是否已经渲染，没有就.....,echart下面设置默认为null
            if(this.echart) {
                this.echart.setOption(this.options) 
            }else{
                this.echart = echarts.init(this.$refs.echart)
                this.echart.setOption(this.options)
            }
        },
        initChartData() {
            if(this.isAxisChart) {
                this.axisOption.xAxis.data = this.chartData.xData
                this.axisOption.series = this.chartData.series
            }else{
                this.normalOption.series = this.chartData.series
            }
        }
    },
    data() {
        return {
            axisOption: {
                 legend: {
                    // 图例文字颜色
                    textStyle: {
                        color: "#333",
                    },
                },
                grid: {
                    left: "20%",
                },
                // 提示框
                tooltip: {
                    trigger: "axis",
                },
                xAxis: {
                    type: "category", // 类目轴
                    data: [],
                    axisLine: {
                        lineStyle: {
                            color: "#17b3a3",
                        },
                    },
                    axisLabel: {
                        interval: 0,
                        color: "#333",
                    },
                },
                    yAxis: [
                        {
                            type: "value",
                            axisLine: {
                                lineStyle: {
                                    color: "#17b3a3",
                                },
                            },
                        },
                    ],
                    color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
                    series: [],
                },
                normalOption:{
                    tooltip: {
                        trigger: "item",
                    },
                    color: [
                        "#0f78f4",
                        "#dd536b",
                        "#9462e5",
                        "#a6a6a6",
                        "#e1bb22",
                        "#39c362",
                        "#3ed1cf",
                    ],
                    series: [],
                },
                // 给个初始值null不然会报错
                echart:null
        }
    },
     //对传入的options数据进行判断
    computed: {
        options() {
            //如果存在，获取axisOption即折线图，柱状图.....
            return this.isAxisChart ? this.axisOption : this.normalOption
        }
    }
}
</script>
