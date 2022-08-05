     <template>
    <div> 
        <p>Echarts</p>
        <PieEcharts :config="option" />

        <PieEcharts :config="option" />

        <PieEcharts :config="option" />
        <!-- <div ref="echarts" class="simpleDemo"></div> -->
        <div>
            <router-link to="/">Go back to Dashboard</router-link>
        </div>
    </div>
</template>

<script>
// import * as echarts from "echarts";
import PieEcharts from "./echarts/PieEcharts.vue";
export default {
    name: "echartsView",
    components: {
        PieEcharts,
    },
    data() {
        return {
            option: {},
        };
    },
    // mounted() {
    //     // this.getPage();
    //     // setInterval(() => {
    //     //     this.option.series[0].data[0].value += 100;
    //     //     console.log(this.option.series[0].data);
    //     // }, 1000);
    // },
    // methods: {
    //     // getPage() {
    //     //     this.chart = echarts.init(this.$refs.echarts);
    //     //     // 使用刚指定的配置项和数据显示图表。
    //     //     this.chart.setOption(this.option);
    //     // },
    // },
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