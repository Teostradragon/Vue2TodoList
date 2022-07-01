<template>
  <div>
    <v-btn text @click.stop="dialog = true" class="success"
      >Add new project</v-btn
    >
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <h2>Add a New Project</h2>
          {{ title }}
        </v-card-title>
        <v-card-text>
          <v-form class="px-4">
            <v-text-field
              label="Title"
              v-model="title"
              prepend-icon="folder"
              :rules="inputRules"
            >
            </v-text-field>
            <v-textarea
              label="person"
              v-model="content"
              prepend-icon="edit"
              :rules="inputRules"
            >
            </v-textarea>

            <v-textarea
              label="person"
              v-model="person"
              prepend-icon="edit"
              :rules="inputRules"
            >
            </v-textarea>

            <v-menu max-width="290">
              <template v-slot:activator="{ on }">
                <v-text-field
                  :rules="inputRules"
                  :value="formattedDate"
                  label="Due date"
                  prepend-icon="mdi-calendar-range"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="due"></v-date-picker>
            </v-menu>

            <v-btn text class="primary mx-0 mt-3" @click="submit"
              >Add project</v-btn
            >
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import moment from "moment";
function abc() {}
export default {
  data() {
    return {
      dialog: false,
      title: "",
      content: "",
      person: "",
      due: null,
      inputRules: [
        (v) => (v && v.length >= 3) || "Minimum length is 3 characters",
      ],
    };
  },
  created() {},
  methods: {
    submit() {},
  },
  computed: {
    formattedDate() {
      return this.due ? moment(this.due).format("Do MMMM YYYY") : "";
    },
  },
};
</script>
