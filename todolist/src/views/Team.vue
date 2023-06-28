<template>
    <div class="team">
        <h1 class="subheading grey--text">Team</h1>

        <v-container class="my-5">
            <v-row>
                <v-col cols="12" sm="6" md="4" lg="3" v-for="person in team" :key="person.name">
                    <v-card class="text-center ma-3">
                        <v-responsive class="pt-4">
                            <v-avatr size="100" class="grey lighten-2">
                                <img :src="person.avatar" />
                            </v-avatr>
                        </v-responsive>
                        <v-card-text>
                            <div class="text-subtitle-1">{{ person.name }}</div>
                            <div class="grey--text">{{ person.role }}</div>
                        </v-card-text>
                        <v-card-action>
                            <v-btn depressed class="grey--text">
                                <v-icon small left>mdi-message</v-icon>
                                <span>Message</span>
                            </v-btn>
                        </v-card-action>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    name: "TeamView",
    data() {
        return {
            team: [
                {
                    name: "Wu",
                    role: "Web developer",
                    avatar: "/avatar-1.png",
                },
                {
                    name: "Yuan",
                    role: "Graphic designer",
                    avatar: "/avatar-2.png",
                },
                {
                    name: "AA",
                    role: "Web developer",
                    avatar: "/avatar-3.png",
                },
                {
                    name: "BB",
                    role: "Social media maverick",
                    avatar: "/avatar-4.png",
                },
                { name: "CC", role: "Sales guru", avatar: "/avatar-5.png" },
            ],
        };
    },
};
</script>
