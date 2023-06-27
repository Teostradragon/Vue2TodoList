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
import { mapState } from "vuex";

export default {
    name: "DashBoard",
    data() {
        return {
            titles: [],
            persons: [],
            content: "",
            title: "",
            ctonten: "",
            test: false,
            person: "",
            due: "",
            status: "",
            formattedDate: "",
            Information: "",
            sortProp: 'title',
        };
    },
    created() {
        this.getTodos();
    },
    computed: {
        ...mapState(['todos']),
         sortedTodos() {
        return [...this.todos].sort((a, b) => (a[this.sortProp] < b[this.sortProp] ? -1 : 1));
         }
   },
    methods: {

        //删除一个数据
        async deleteTodo(row) {
            try {
                await this.$store.dispatch('deleteTodo', row.id);
                this.getTodos();
            } catch (error) {
                console.error(error);
            }
        },
        // 初始化Projects数据
        async getTodos() {
            try {
                await this.$store.dispatch('getTodos');
            } catch (error) {
                console.error(error);
            }
        },
        //打开弹窗
        openDialog() {
            this.title = '',
            this.content = '',
            this.due = '',
            this.test = true;
        },

        //添加数据
async postTodo() {
    const todo = {
        name: this.title,
        status: this.sortBy(this.due)
    };
    try {
        await this.$store.dispatch('addTodo', todo);
        this.title = '';
        this.due = '';
        this.test = false;
    } catch (error) {
        console.error(error);
    }
},

        // 封装判断状态方法
        sortBy(dueDate) {
    const today = new Date();
    const due = new Date(dueDate);

    if (due > today) {
        return "complete";
    } else if (due.setHours(0,0,0,0) === today.setHours(0,0,0,0)) {
        return "ongoing";
    } else {
        return "overdue";
    }
}
,
            sortByProject(prop) {
        this.sortProp = prop;
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
