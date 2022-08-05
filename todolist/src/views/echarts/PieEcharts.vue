<template>
    <div>
        <div ref="echarts" class="simpleDemo"></div>
    </div>
</template>

<script>
import * as echarts from "echarts";
export default {
    name: "echartsView",
    props: {
        config: {
            type: Object,
            default() {
                return {};
            },
        },
    },
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
    watch: {
        config: {
            deep: true,
            immediate: true,
            handler() {
                this.$nextTick(() => {
                    this.renderChart();
                });
            },
        },
    },
    methods: {
        renderChart() {
            if (!this.chart) {
                this.chart = echarts.init(this.$refs.echarts);
            }
            console.log(this.config, "this.config");
            this.chart.setOption(Object.assign({}, this.option, this.config));
        },
    },

    mounted() {},

    beforeDestroy() {},

    drawing() {},
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