<template>
    <div>
        <chart :option="option" />
    </div>
</template>

<script>
import Chart from "@/components/Chart.vue";
export default {
    components: { Chart },
    data() {
        return {
            option: {},

            mounted() {
                setTimeout(() => {
                    this.option = {
                        title: {
                            text: "Referer of a Website",
                            subtext: "Fake Data",
                            left: "center",
                        },
                        tooltip: {
                            trigger: "item",
                        },
                        legend: {
                            orient: "vertical",
                            left: "left",
                        },
                        series: [
                            {
                                name: "Access From",
                                type: "pie",
                                radius: "50%",
                                data: [
                                    { value: 1048, name: "Search Engine" },
                                    { value: 735, name: "Direct" },
                                    { value: 580, name: "Email" },
                                    { value: 484, name: "Union Ads" },
                                    { value: 3000, name: "Video Ads" },
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
                    };
                }, 1000);
            },
        };
    },
};
</script>

<style>
</style>