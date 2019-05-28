<template>
  <div id="full-view">
    <project-list/>
    <project-details/>
    <todo-details/>
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
    projects() {
      return this.$store.state.projects;
    },

    activeTodo() {
      return this.$store.state.activeTodo;
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
  height: 100%;
}
</style>
