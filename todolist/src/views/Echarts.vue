<template>
    <v-chart class="chart" :option="option" />
</template>

<script>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";

use([
    CanvasRenderer,
    PieChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
]);

export default {
    name: "HelloWorld",
    components: {
        VChart,
    },
    provide: {
        [THEME_KEY]: "dark",
    },
    data() {
        return {
            option: {
                title: {
                    text: "Traffic Sources",
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
                        name: "Traffic Sources",
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
};
</script>

<style scoped>
.chart {
    height: 100vh;
}
</style>

<style>
body {
    margin: 0;
}
</style>


