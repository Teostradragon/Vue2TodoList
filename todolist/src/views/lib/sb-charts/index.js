import Line from './line'
import * as echarts from "echarts";
export default {
    install(Vue) {
        Vue.mixin({
            methods: {
                initChart(container, option, onclick) {
                    const myChart = echarts.init(container);
                    option.color = ["#FF0FCC", 'orangred', "#99CCCC", "#FF6666", 'skyblue']
                    myChart.setOption(option);
                    if (onclick) myChart.on("click", onclick);
                }
            }
        })
        Vue.component('sb-line', Line)

    }
}