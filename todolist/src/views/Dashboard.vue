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

    <!-- 这部分是点击UPDATE project之后的Popup弹窗 -->
    <v-dialog v-model="updateDialog" max-width="600px">
      <v-card>
        <v-card-title>
          <h2>Update Project</h2>
        </v-card-title>
        <v-card-text>
          <v-form class="px-3">
            <v-text-field
              label="Title"
              v-model="updateTitle"
              prepend-icon="folder"
            ></v-text-field>
            <v-text-field
              label="Person"
              v-model="updatePerson"
              prepend-icon="person"
            ></v-text-field>
            <v-textarea
              label="Information"
              v-model="updateContent"
              prepend-icon="edit"
            ></v-textarea>
            <!--鼠标移出事件  失焦-->
            <v-menu max-width="290">
              <template v-slot:activator="{ on }">
                <v-text-field
                  :value="updateDue"
                  label="Due date"
                  prepend-icon="mdi-calendar-range"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="updateDue"></v-date-picker>
            </v-menu>

            <v-btn text class="primary mx-0 mt-3" @click="updateProject"
              >Update project</v-btn
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
              <span right class="caption text-lowercase">
                {{
                  sortProp === "title" && sortOrder === "asc"
                    ? "by projects name (A - Z)"
                    : "by projects name (Z - A)"
                }}
              </span>
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
              <span right class="caption text-lowercase">{{
                sortProp === "person" && sortOrder === "asc"
                  ? "by person (A - Z)"
                  : "by person (Z - A)"
              }}</span>
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
          v-for="item in sortedProjects"
          :key="item._id"
          :class="projectStatus(item.due)"
          @click.stop="openUpdateDialog(item._id)"
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
              <div>{{ item.due | formatDate }}</div>
              <!-- 使用 formatDate 过滤器 -->
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

            <v-btn depressed color="error" @click.stop="deleteProject(item._id)"
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
      sortOrder: "asc", // 默认为升序排序
       currentUpdatingProjectId: null,
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
      const projects = [...this.projectsList]; // 创建一个新的数组副本，以避免修改原始数据
      projects.sort((a, b) => {
        const propA = a[this.sortProp];
        const propB = b[this.sortProp];
        let comparison = 0;

        if (propA > propB) {
          comparison = 1;
        } else if (propA < propB) {
          comparison = -1;
        }

        // 根据排序顺序乘以比较结果以切换升序或降序排序
        return this.sortOrder === "asc" ? comparison : -comparison;
      });

      return projects;
    },
  },

  filters: {
    formatDate(date) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString(undefined, options);
    },
  },

  methods: {
    ...mapActions(["getProjects", "deleteProject", "addProject"]),

    projectStatus(dueDate) {
      const due = new Date(dueDate);
      const now = new Date();

      if (due.setHours(23, 59, 59, 999) < now) {
        return "overdue";
      } else if (
        due.getDate() === now.getDate() &&
        due.getMonth() === now.getMonth() &&
        due.getFullYear() === now.getFullYear()
      ) {
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
      this.currentUpdatingProjectId = null;
    },

      openUpdateDialog(id) {
  // 查找要更新的项目
  const project = this.projectsList.find(p => p._id === id);

  // 将项目信息加载到表单中
  this.title = project.title;
  this.person = project.person;
  this.content = project.content;
  this.due = project.due;

  // 保存当前正在更新的项目的 ID
  this.currentUpdatingProjectId = id;

  // 打开对话框
  this.dialog = true;
},


    async postProject() {
      const formattedDueDate = new Date(this.due).toISOString().split("T")[0]; // 将日期格式化为年月日字符串

      const today = new Date();
      const dueDate = new Date(this.due);

      let status = "";
      if (dueDate.setHours(23, 59, 59, 999) < today) {
        status = "overdue";
      } else if (dueDate.getTime() === today.getTime()) {
        status = "ongoing";
      } else {
        status = "future";
      }

      const project = {
        title: this.title,
        person: this.person,
        due: formattedDueDate, // 使用格式化后的日期字符串
        status: status, // 设置任务的状态属性
        content: this.content,
      };

      try {
        await this.addProject(project);
        this.title = "";
        this.due = "";
        this.content = "";
        this.person = "";
        this.dialog = false;
        this.getProjects();
      } catch (error) {
        console.error(error);
      }
    },



    sortByProject(prop) {
      const defaultSortOrder = {
        title: "asc",
        person: "desc",
      };
      if (this.sortProp === prop) {
        // 如果当前的排序属性与点击的属性相同，则切换排序顺序
        this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
      } else {
        // 如果当前的排序属性与点击的属性不同，则将排序属性设置为点击的属性，并将排序顺序设置为默认的升序
        this.sortProp = prop;
        this.sortOrder = defaultSortOrder[prop];
      }
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
.future-chip {
  background: #3cd1c2;
}

.ongoing-chip {
  background: #ffaa2c;
}

.overdue-chip {
  background: #f83e70;
}
</style>
