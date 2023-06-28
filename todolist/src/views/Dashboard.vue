<template>
  <div class="dashboard">
    <h1 class="subheading grey--text">Dashboard</h1>

    <!--这部分是点击ADD project之后的Popup弹窗-->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <h2>Add a New Project</h2>
        </v-card-title>
        <v-card-text>
          <v-form class="px-3">
            <v-text-field
              label="Title"
              v-model="title"
              prepend-icon="folder"
            ></v-text-field>
            <v-text-field
              label="Person"
              v-model="person"
              prepend-icon="person"
            ></v-text-field>
            <v-textarea
              label="Information"
              v-model="content"
              prepend-icon="edit"
            ></v-textarea>
            <!--鼠标移出事件  失焦-->
            <v-menu max-width="290">
              <template v-slot:activator="{ on }">
                <v-text-field
                  :value="due"
                  label="Due date"
                  prepend-icon="mdi-calendar-range"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="due"></v-date-picker>
            </v-menu>

            <v-btn text class="primary mx-0 mt-3" @click="postProject"
              >Add project</v-btn
            >
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!--openDialog是Dashboard页面的添加按钮之后dialog-->
    <v-btn @click="openDialog" class="success">Add new project</v-btn>

    <!-- 点击Sorts projects by name按照项目名A - Z排列-->
    <v-container class="my-5">
      <v-row class="mb-3">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              small
              text
              color="grey"
              @click="sortByProject('title')"
              v-on="on"
            >
              <v-icon left small>mdi-folder</v-icon>
              <span right class="caption text-lowercase">by projects name</span>
            </v-btn>
          </template>
          <span>Sorts projects by name</span>
        </v-tooltip>

        <!-- 点击Sorts projects By person按照人名A - Z排列-->
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              small
              text
              color="grey"
              @click="sortByProject('person')"
              v-on="on"
            >
              <v-icon left small>mdi-account</v-icon>
              <span right class="caption text-lowercase">By person</span>
            </v-btn>
          </template>
          <span>Sorts projects By person</span>
        </v-tooltip>
      </v-row>

      <div>
        <!-- 显示title，person，due date的内容，projects-->
        <v-card
          text
          tile
          class="px-3"
          v-for="item in projectsList"
          :key="item._id"
          :class="projectStatus(item.due)"
        >
          <v-row align="center" justify="space-around">
            <v-col cols="12" md="6" class="pl-3">
              <div class="caption grey--text">Project Title</div>
              <div>{{ item.title }}</div>
            </v-col>
            <v-col xs="2">
              <div class="caption grey--text">Person</div>
              <div>{{ item.person }}</div>
            </v-col>
            <v-col xs="2">
              <div class="caption grey--text">Due Date</div>
              <div>{{ item.due }}</div>
            </v-col>
            <v-col xs="2">
              <div>
                <v-chip
                  small
                  :class="`${projectStatus(
                    item.due
                  )}-chip v-chip--active white--text caption my-2`"
                >
                  {{ projectStatus(item.due) }}
                </v-chip>
              </div>
            </v-col>
            <v-btn depressed color="error" @click="deleteProject(item._id)"
              >DELETE</v-btn
            >
          </v-row>
          <v-row cols="12"> </v-row>
        </v-card>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "DashBoard",
  data() {
    return {
      title: "",
      content: "",
      test: false,
      person: "",
      due: "",
      status: "", // 添加状态属性
      formattedDate: "",
      sortProp: "title",
      dialog: false,
      isDataLoaded: false,
    };
  },
  created() {
    this.$store.dispatch("getProjects").then(() => {
      console.log("Projects fetched from the server:", this.projectsList);
    });
  },

  mounted() {
    this.getProjects(); // 在组件挂载时再次调用
    console.log("Projects fetched from the server:", this.projectsList);
  },

  computed: {
    ...mapGetters(["projectsList"]), // 使用全局的 projectsList
    sortedProjects() {
      return [...this.projectsList].sort((a, b) =>
        a[this.sortProp] < b[this.sortProp] ? -1 : 1
      );
    },
  },

  methods: {
    ...mapActions(["getProjects", "deleteProject", "addProject"]),

    projectStatus(dueDate) {
      const due = new Date(dueDate);
      const now = new Date();
      if (due < now) {
        return "overdue";
      } else if (due.toDateString() === now.toDateString()) {
        return "ongoing";
      } else {
        return "future";
      }
    },
    openDialog() {
      (this.title = ""),
        (this.content = ""),
        (this.due = ""),
        (this.test = true);
      this.dialog = true;
    },
    async postProject() {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set time to 00:00:00.000

      const dueDate = new Date(this.due);

      let status = "";
      if (dueDate < today) {
        status = "overdue";
      } else if (dueDate.getTime() === today.getTime()) {
        status = "ongoing";
      } else {
        status = "future";
      }

      const project = {
        title: this.title,
        person: this.person,
        due: this.due,
        status: status,
        content: this.content,
      };

      try {
        await this.addProject(project);
        this.title = "";
        this.due = "";
        this.content = "";
        this.person = "";
        this.dialog = false;
      } catch (error) {
        console.error(error);
      }
    },

    sortByProject(prop) {
      this.sortProp = prop;
    },
    statusClass(project) {
      switch (project.status) {
        case "overdue":
          return "overdue";
        case "ongoing":
          return "ongoing";
        case "future":
          return "future";
        default:
          return "";
      }
    },
  },
};
</script>

<style>
.overdue-chip {
  background: #3cd1c2;
}

.ongoing-chip {
  background: #ffaa2c;
}

.future-chip {
  background: #f83e70;
}
</style>
