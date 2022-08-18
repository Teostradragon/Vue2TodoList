<template>
    <div>
        <pie-chart />
        <line-chart />
    </div>
</template>

<script>
import PieChart from "./PieChart.vue";
import LineChart from "./LineChart.vue";
export default {
    name: "indexI",
    components: {
        PieChart,
        LineChart,
    },
};
</script>

<style>
</style>