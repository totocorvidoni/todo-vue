<template>
  <div id="full-view">
    <project-list/>
    <project-details v-if="activeProject"/>
    <div v-else>No projects here</div>
    <todo-details v-if="activeTodo"/>
    <div v-else>No todos here</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProjectList from "@/components/ProjectsList.vue";
import ProjectDetails from "@/components/ProjectDetails.vue";
import TodoDetails from "@/components/TodoDetails.vue";

export default {
  name: "full-view",
  components: {
    ProjectList,
    ProjectDetails,
    TodoDetails
  },

  methods: {},

  computed: {
    ...mapGetters(["activeProject", "activeTodos", "noActiveTodos"]),
    activeProject() {
      return this.$store.state.activeProjectId;
    },

    activeTodo() {
      return this.$store.state.activeTodoId;
    }
  }
};
</script>

<style lang="scss">
#full-view {
  display: grid;
  grid-template-columns: 20% 40% 40%;
  background: $color5;
  border: 0.5rem solid $color1;
  border-left: none;
  border-radius: $regular-radius;
  color: $color1;
  min-height: 100%;
}
</style>
