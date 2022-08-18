<template>
    <div id="app1">
        <sb-line :data="zz" :options="options"></sb-line>
    </div>
</template>

<script>
export default {
    name: "EchartsVIEW",
    data() {
        return {
            zz: [
                {
                    date: "2020-01-01",
                    shouru: 51000,
                    zhichu: 13000,
                    zhongjiang: 14000,
                },
                {
                    date: "2020-01-02",
                    shouru: 16000,
                    zhichu: 10500,
                    zhongjiang: 12000,
                },
                {
                    date: "2020-01-03",
                    shouru: 41000,
                    zhichu: 70300,
                    zhongjiang: 14400,
                },
                {
                    date: "2020-01-04",
                    shouru: 10500,
                    zhichu: 12600,
                    zhongjiang: 24000,
                },
                {
                    date: "2020-01-05",
                    shouru: 12200,
                    zhichu: 14030,
                    zhongjiang: 11000,
                },
            ],
            options: {
                title: "我的图表",
                subtext: "@simbajs",
                xAxisKey: "date",
                tooltipFmt(data) {
                    return `${data.name}<br>${data.marker} ${data.seriesName}了${data.value}元`;
                },
                keys: [
                    {
                        label: "收入",
                        val: "shouru",
                    },
                    {
                        label: "支出",
                        val: "zhichu",
                    },
                    {
                        label: "抽奖",
                        val: "zhongjiang",
                    },
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
