<template>
    <div></div>
</template>

<script>
export default {
    data() {
        return {
            option: {},
        };
    },
    mounted() {
        setTimeout(() => {
            this.option = {
                xAxis: {
                    type: "category",
                    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                },
                yAxis: {
                    type: "value",
                },
                series: [
                    {
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: "line",
                        smooth: true,
                    },
                ],
            };
        }, 1000);
    },
};
</script>

<style>
</style>