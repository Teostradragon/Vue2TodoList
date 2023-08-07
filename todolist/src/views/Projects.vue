<template>
  <div>
    <div id="main" style="width: 100%; height: 100vh"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import * as echarts from "echarts";

export default {
  name: "EchartsC",
  computed: {
    ...mapState(["projectsList"]),
    chartData() {
      let overdue = 0;
      let completed = 0;
      let future = 0;
      let ongoing = 0;

      const now = new Date();
      now.setHours(0, 0, 0, 0); // 设置 'now' 为午夜时间

      this.projectsList.forEach((project) => {
        const dueDate = new Date(project.due);
        dueDate.setHours(0, 0, 0, 0); // 将项目的 'due' 日期也设置为午夜时间

        if (project.status === "Done") {
          completed++;
        } else if (dueDate < now) {
          overdue++;
        } else if (dueDate.getTime() === now.getTime()) {
          ongoing++;
        } else {
          future++;
        }
      });

      return [
        { value: overdue, name: "Overdue" },
        { value: completed, name: "Completed" },
        { value: future, name: "Future" },
        { value: ongoing, name: "Ongoing" },
      ];
    },
  },
  methods: {
    renderChart() {
      var chartDom = document.getElementById("main");
      var myChart = echarts.init(chartDom, "dark");
      var option = {
        title: {
          text: "Project Status",
          subtext: "Overdue, Completed, Future",
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
            name: "Project Status",
            type: "pie",
            radius: "50%",
            data: this.chartData,
            itemStyle: {
              color: function (params) {
                switch (params.data.name) {
                  case "Overdue":
                    return "#ee6666";
                  case "Completed":
                    return "#91cc75";
                  case "Future":
                    return "#73c0de";
                  //3ba272
                  //5470c6
                  //91cc75 - 浅绿
                  //5470c6 - 深蓝
                  default:
                    return "#fac858";
                }
              },
            },
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

      option && myChart.setOption(option);
    },
  },
  mounted() {
    this.renderChart();
  },
  watch: {
    projectsList: {
      handler() {
        this.renderChart();
      },
      deep: true,
    },
  },
};
</script>
