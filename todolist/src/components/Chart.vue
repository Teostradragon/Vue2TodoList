<template>
    <div ref="chartRef"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
    name: "echartsView",
    props: {
        option: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            chart: null,
        };
    },

    mounted() {
        this.chart = echarts.init(this.$refs.chartRef);
        this.chart.setOption(this.option);
    },
    watch: {
        option(val) {
            this.chart.setOption(val);
        },
    },
};
</script>

<style>
</style>