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
        return {};
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
            this.chart.setOption(this.config);
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