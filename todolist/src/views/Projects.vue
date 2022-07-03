<template>
  <div class="projects">
    <h1 class="subheading grey--text">Projects</h1>

    <!--展示projects中的content内容和due date -->
    <v-container class="my-5">
      <v-expansion-panels>
        <v-expansion-panel v-for="project in projects" :key="project.title">
          <v-expansion-panel-header>{{
            project.title
          }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card text>
              <v-card-text class="px-4 py-0 grey--text">
                <div class="font-weight-bold">due by {{ project.due }}</div>
                <div>{{ project.content }}</div>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "ProjectView",
  data() {
    return {
      projects: [],
    };
  },
  created() {
    this.getProjectsList();
  },
  methods: {
    // 初始化数据，但是只需要未来要做的content内容，不要overdue的内容。fetchTask，Projects
    getProjectsList() {
      this.$axios.post("http://124.71.237.87:8777/list").then((res) => {
        let data = res.data;
        for (let a in data) {
          if (data[a].status != "overdue") {
            this.projects.push(data[a]);
          }
        }
        console.log(this.projects);
      });
      //json  x-www form-data
      // .catch((error) => {
      //   if (error.statusCode == 401) {
      //   }
      //   if (error.statusCode == 401) {
      //   }
      // });
    },
  },
  computed: {
    // 只展示Chris Wu将要做的内容，已经过期的内容不要。
    fetchTask() {
      return this.projects.filter((project) => {
        return project.person === "Chris Wu" && project.status != "complete";
      });
    },
  },
};
</script>
