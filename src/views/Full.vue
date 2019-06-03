<template>
  <div id="full-view">
    <project-list/>
    <project-details v-if="activeProject"/>
    <div v-else>No projects here</div>
    <todo-details v-if="activeTodo"/>
    <div v-else class="no-todo">
      <img src="@/assets/bars-pending.svg" alt>
      <div class="notice-wrapper">
        <h2 class="title">There is no Todo selected.</h2>
        <p>
          You can view all the details of a Todo and even add notes by clicking on the
          <img
            class="details-icon"
            src="@/assets/bars-pending.png"
            alt
          > button in the panel to the left from here.
        </p>
      </div>
    </div>
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
  height: 100%;

  .no-todo {
    // background: $color1-faded;
    border: 5px solid $color1-faded;
    border-radius: 5%;
    margin: 3rem 5rem;
    padding: 2rem 5rem;
    color: $color1-light;
    user-select: none;
  }

  .notice-wrapper {
    background: $color1-faded;
    // border: 2px solid $color1-faded;
    border-radius: $regular-radius;
    padding: 2rem;

    .title {
      margin-bottom: 0.25em;
    }

    .details-icon {
      height: 1em;
      width: auto;
      margin: 0 0.1em;
    }
  }
}
</style>
