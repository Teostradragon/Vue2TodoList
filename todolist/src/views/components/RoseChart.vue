<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import * as echarts from "echarts";

export default {

  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
        chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
    watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
       setOptions({ data } = {}) {
      this.chart.setOption({
        title: {
          text: '南丁格尔玫瑰图',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          top: 'bottom',
          data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6']
        },
        series: [
          {
            name: '面积模式',
            type: 'pie',
            radius: [30, 110],
            roseType: 'area',
            data: data,
          }
        ]
      })
    }}
  }

</script>
