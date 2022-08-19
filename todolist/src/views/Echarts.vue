<template>
    <div>
        <div>
            <rose-chart :chartData="pieChartData" />
        </div>
        <div>
            <bar-chart :chartData="barChartData" />
        </div>
        <div>
            <line-chart :chartData="lineChartData" />
        </div>
    </div>
</template>


<script>
// 引入组件
import BarChart from "./components/BarChart";
import RoseChart from "./components/RoseChart";
import LineChart from "./components/LineChart";
export default {
    name: "ProjectView",
    // 注册局部组件
    components: {
        BarChart,
        RoseChart,
        LineChart,
    },
    data() {
        return {
            // 柱状图数据
            barChartData: {
                days: [
                    "11.21",
                    "11.22",
                    "11.23",
                    "11.24",
                    "11.25",
                    "11.26",
                    "11.27",
                ],
                data1: [100, 120, 161, 134, 105, 160, 160],
                data2: [120, 82, 91, 154, 162, 140, 145],
            },
            // 折线图数据
            lineChartData: {
                expectedData: [4, 9, 12, 11, 5, 2, 9],
                actualData: [10, 4, 3, 11, 13, 10, 7],
            },
            pieChartData: {
                data: [
                    { value: 10, name: "rose1" },
                    { value: 5, name: "rose2" },
                    { value: 15, name: "rose3" },
                    { value: 25, name: "rose4" },
                    { value: 20, name: "rose5" },
                    { value: 40, name: "rose6" },
                ],
            },
        };
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
