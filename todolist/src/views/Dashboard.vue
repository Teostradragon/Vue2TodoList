<template>
  <div class="dashboard">
    <h1 class="subheading grey--text">Dashboard</h1>

    <!--弹窗  所有得变量都 需要 定义-->
    <v-dialog v-model="test" max-width="600px">
      <v-card>
        <v-card-title>
          <h2>Add a New Project</h2>
        </v-card-title>
        <v-card-text>
          <v-form class="px-3">
            <v-text-field label="Title" v-model="title" prepend-icon="folder">
            </v-text-field>
            <v-textarea
              label="Information"
              v-model="content"
              prepend-icon="edit"
            >
            </v-textarea>

            <v-menu max-width="290">
              <template v-slot:activator="{ on }">
                <v-text-field
                  :value="formattedDate"
                  label="Due date"
                  prepend-icon="mdi-calendar-range"
                  @change="iii(formattedDate)"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="due"></v-date-picker>
            </v-menu>

            <v-btn text class="primary mx-0 mt-3" @click="baocun"
              >Add project</v-btn
            >
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-btn @click="opendialog" class="success">Add new project</v-btn>
    <v-container class="my-5">
      <v-row class="mb-3">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn small text color="grey" @click="sortBy('title')" v-on="on">
              <v-icon left small>mdi-folder</v-icon>
              <span right class="caption text-lowercase">by projects name</span>
            </v-btn>
          </template>
          <span>Sorts projects by name</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn small text color="grey" @click="sortBy('person')" v-on="on">
              <v-icon left small>mdi-account</v-icon>
              <span right class="caption text-lowercase">By person</span>
            </v-btn>
          </template>
          <span>Sorts projects By person</span>
        </v-tooltip>
      </v-row>

      <v-card text tile class="px-3" v-for="item in projects" :key="item.id">
        <v-row>
          <v-col cols="12" md="6" :class="`pl-3 project ${item.status}`">
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
              <!-- <v-chip small :class="`${project.status} white--text caption my-2`"> {{ project.status }}</v-chip> -->
              <v-chip
                small
                :color="`${item.status}`"
                :class="`v-chip--active white--text caption my-2`"
              >
                {{ item.status }}</v-chip
              >
            </div>
          </v-col>
        </v-row>
        <v-row cols="12">
          <v-divider></v-divider>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "DashBoard",
  data() {
    return {
      titles: [],
      persons: [],
      projects: [],

      title: "",
      content: "",
      test: false,
      person: "",
      due: "",
      status: "",
      formattedDate: "",
      Information: "",
    };
  },
  created() {
    console.log(this.projects);
    this.sortBy();
    this.ceshi();
  },
  methods: {
    ceshi() {
      this.$axios.post("http://124.71.237.87:8777/list").then((res) => {
        this.projects = res.data;
      });
    },
    opendialog() {
      (this.title = ""),
        (this.content = ""),
        (this.due = ""),
        (this.test = true);
    },

    //'http://124.71.237.87:8777/add'添加接口
    baocun() {
      let params = {
        title: this.title,
        person: this.content,
        due: this.due,
        status: this.sortBy(this.due),
      };
      this.$axios.post("http://124.71.237.87:8777/add", params).then((res) => {
        console.log(res);
      });

      this.test = false;
      console.log(this.projects);
    },
    sortBy() {
      let mont = new Date();
      let date = {
        year: mont.getFullYear(),
        month: mont.getMonth() + 1,
        day: mont.getDate(),
      };
      let dayDate =
        date.year +
        "-" +
        (date.month >= 10 ? date.month : "0" + date.month) +
        "-" +
        (date.day >= 10 ? date.day : "0" + date.day);
      if (this.due > dayDate) {
        return "complete";
      } else if ((this.due = dayDate)) {
        return "ongoing";
      } else if (this.due < dayDate) {
        return "overdue";
      }
    },
  },
};
</script>

<style>
.project.complete {
  border-left: 4px solid #3cd1c2;
}

.project.ongoing {
  border-left: 4px solid orange;
}

.project.overdue {
  border-left: 4px solid tomato;
}

.v-chip.complete {
  background: #3cd1c2;
}

.v-chip.ongoing {
  background: #ffaa2c;
}

.v-chip.overdue {
  background: #f83e70;
}
</style>
