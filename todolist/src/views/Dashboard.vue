<template>
    <div class="dashboard">
        <h1 class="subheading grey--text">Dashboard</h1>

        <!--这部分是点击ADD project之后的Popup弹窗-->
        <v-dialog v-model="test" max-width="600px">
            <v-card>
                <v-card-title>
                    <h2>Add a New Project</h2>
                </v-card-title>
                <v-card-text>
                    <v-form class="px-3">
                        <v-text-field label="Title" v-model="title" prepend-icon="folder"></v-text-field>
                        <v-text-field label="Person" v-model="person" prepend-icon="person"></v-text-field>
                        <v-textarea label="Information" v-model="content" prepend- icon="edit"></v-textarea>
                        <!--鼠标移出事件  失焦-->
                        <v-menu max-width="290">
                            <template v-slot:activator="{ on }">
                                <v-text-field :value="formattedDate" label="Due date" prepend-icon="mdi-calendar-range" @change="iii(formattedDate)" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="due"></v-date-picker>
                        </v-menu>

                        <v-btn text class="primary mx-0 mt-3" @click="postProjectsList">Add project</v-btn>
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
                        <v-btn small text color="grey" @click="sortByProject('title')" v-on="on">
                            <v-icon left small>mdi-folder</v-icon>
                            <span right class="caption text-lowercase">by projects name</span>
                        </v-btn>
                    </template>
                    <span>Sorts projects by name</span>
                </v-tooltip>

                <!-- 点击Sorts projects By person按照人名A - Z排列-->
                <v-tooltip top>
                    <template v-slot:activator="{ on }">
                        <v-btn small text color="grey" @click="sortByProject('person')" v-on="on">
                            <v-icon left small>mdi-account</v-icon>
                            <span right class="caption text-lowercase">By person</span>
                        </v-btn>
                    </template>
                    <span>Sorts projects By person</span>
                </v-tooltip>
            </v-row>

            <!-- 显示title，person，due date的内容，projects-->
            <v-card text tile class="px-3" v-for="item in projects" :key="item.id">
                <v-row align="center" justify="space-around">
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
                            <v-chip small :color="`${item.status}`" :class="`v-chip--active white--text caption my-2`">{{ item.status }}</v-chip>
                        </div>
                    </v-col>
                    <v-btn depressed color="error" @click="deleteProjectsList(item)">DELETE</v-btn>
                </v-row>
                <v-row cols="12">
                    <v-divider></v-divider>
                </v-row>
            </v-card>
        </v-container>
    </div>
</template>

<script>
import { addProjects, delProjects } from "@/api";
export default {
    name: "DashBoard",
    data() {
        return {
            titles: [],
            persons: [],
            // projects: [],
            content: "",

            title: "",
            ctonten: "",
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
        this.getProjectsList();
    },
    computed: {
        projects() {
            return this.$store.state.projects;
        },
    },
    methods: {
        //删除一个数据
        deleteProjectsList(row) {
            delProjects(row.id).then(() => {
                this.getProjectsList();
            });
        },
        // 初始化Projects数据
        getProjectsList() {
            this.$store.dispatch("getProjects");
            // getProjectsList().then((res) => {
            //     this.projects = res.data;
            // });
        },
        //打开弹窗
        openDialog() {
            (this.title = ""),
                (this.content = ""),
                (this.due = ""),
                (this.test = true);
        },

        //添加数据
        postProjectsList() {
            let params = {
                title: this.title,
                person: this.person,
                content: this.content,
                due: this.due,
                status: this.sortBy(this.due),
            };
            addProjects(params).then((res) => {
                console.log(res);
            });

            this.test = false;
            console.log(this.projects);
        },

        // 封装判断状态方法   根据当天的日期来标记任务的状态，如果是当天就是ongoing, 如果是以前的日期就是overdue, 如果是未来的话就是complete
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
            console.log(this.due, dayDate);
            let a = this.due.split("-");
            let b = dayDate.split("-");

            if (a[0] > b[0]) {
                return "complete";
            } else if (a[0] < b[0]) {
                return "overdue";
            } else if ((a[0] = b[0])) {
                if (a[1] > b[1]) {
                    return "complete";
                } else if (a[1] < b[1]) {
                    return "overdue";
                } else if ((a[1] = b[1])) {
                    if (a[2] > b[2]) {
                        return "complete";
                    } else if (a[2] < b[2]) {
                        return "overdue";
                    } else if ((a[2] = b[2])) {
                        return "ongoing";
                    }
                }
            }

            // if (this.due > dayDate) {
            //     return "complete";
            // } else if ((this.due = dayDate)) {
            //     return "ongoing";
            // } else if (this.due < dayDate) {
            //     return "overdue";
            // }
        },

        //sort函数对数据进行排序。 sort方法接受一个arrow函数作为回调,a和b代表两个数据元素，prop可以是title或者person
        //这里函数应该返回-1或者1，如果需要更改顺序，则为1，反之-1； ？是说如果真的返还1，假的返-1
        sortByProject(prop) {
            this.projects.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
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
