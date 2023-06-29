<template>
    <nav>
        <v-app-bar text app>
            <v-app-bar-nav-icon @click="drawer = !drawer" class="grey--text"></v-app-bar-nav-icon>
            <v-app-bar-title class="text-uppercase grey--text">
                <span class="font-weight-light">Todo</span>
                <span>List</span>
            </v-app-bar-title>

            <v-spacer></v-spacer>
            <v-menu offset-y>
                <template v-slot:activator="{ on }">
                    <v-btn text v-on="on" color="grey">
                        <v-icon left>expand_more</v-icon>
                        <span>Menu</span>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
                        <v-list-item-title>{{ link.text }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>

            <v-btn text color="grey">
                <span>Sign Out</span>
                <v-icon right>exit_to_app</v-icon>
            </v-btn>
        </v-app-bar>

        <v-navigation-drawer app v-model="drawer" class="primary">
            <v-row>
                <v-col class="mt-5 text-center">
                    <v-avatar size="100">
                        <img src="/avatar-1.png" alt />
                    </v-avatar>
                    <p class="white--text text-subtitle-1 mt-1">Chris Wu</p>
                </v-col>
                <v-col class="mb-3 text-center"></v-col>
            </v-row>

            <v-list>
                <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
                    <v-list-item-action>
                        <v-icon class="white--text">{{ link.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title class="white--text">{{ link.text }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </nav>
</template>

<script>
export default {
    name: "NavBar",
    data() {
        return {
            drawer: false,
            links: [
                { icon: "dashboard", text: "Dashboard", route: "/" },
                { icon: "folder", text: "My Projects", route: "/projects" },
                { icon: "person", text: "Team", route: "/team" },
               
            ],
        };
    },
};
</script>

<style></style>
