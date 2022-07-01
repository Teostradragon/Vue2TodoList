<template>
  <div class="projects">
    <h1 class="subheading grey--text">Projects</h1>

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
    this.myproject();
  },
  methods: {
    myproject() {
      this.$axios.post("http://124.71.237.87:8777/list").then((res) => {
        let data = res.data;
        for (let a in data) {
          if (data[a].status != "overdue") {
            this.projects.push(data[a]);
          }
        }
        console.log(this.projects);
      });
    },
  },
  computed: {
    myProjects() {
      return this.projects.filter((project) => {
        return project.person === "Chris Wu" && project.status != "complete";
      });
    },
  },
};
</script>
