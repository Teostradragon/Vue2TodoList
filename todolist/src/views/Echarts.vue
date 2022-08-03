<template>
    <div>
        <p>Echarts</p>
        <div ref="echarts" class="simpleDemo"></div>
        <div>
            <router-link to="/">Go back to Dashboard</router-link>
        </div>
    </div>
</template>

<script>
import * as echarts from "echarts";
export default {
    name: "echartsView",

    data() {
        return {
            option: {
                title: {
                    text: "Submission",
                    left: "center",
                },
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c} ({d}%)",
                },
                legend: {
                    orient: "vertical",
                    left: "left",
                    data: ["Amber", "Jacob", "William", "Alex", "Chris"],
                },
                series: [
                    {
                        name: "Submission",
                        type: "pie",
                        radius: "55%",
                        center: ["50%", "60%"],
                        data: [
                            { value: 335, name: "Amber" },
                            { value: 310, name: "Jacob" },
                            { value: 234, name: "William" },
                            { value: 135, name: "Alex" },
                            { value: 1548, name: "Chris" },
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)",
                            },
                        },
                    },
                ],
            },
        };
    },
    mounted() {
        this.getPage();
    },
    methods: {
        getPage() {
            this.chart = echarts.init(this.$refs.echarts);
            // 使用刚指定的配置项和数据显示图表。
            this.chart.setOption(this.option);
        },
    },
};
</script>

<style scoped>
.simpleDemo {
    width: 600px;
    height: 400px;
    margin: 0 auto;
}
a {
    color: #00cc66;
}
.router-link-active {
    text-decoration: none;
}
</style>