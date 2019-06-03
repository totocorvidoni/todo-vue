<template>
  <div id="project-details" class="above-left">
    <h1 class="title">Project: {{ activeProject.name }}</h1>
    <ul class="todos">
      <project-item v-for="todo in activeTodos" :key="todo.id" v-bind="todo"/>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProjectItem from "@/components/ProjectItem.vue";

export default {
  name: "project-details",
  components: { ProjectItem },

  computed: {
    ...mapGetters(["activeProject", "activeTodos"])
  }
};
</script>

<style lang="scss">
#project-details {
  display: grid;
  grid-template-rows: auto 1fr;
  border-color: $color1;
  color: $color1;
  padding: 0 1.5rem;
  overflow-y: auto;

  .title {
    justify-self: center;
    background: $color1;
    border-radius: $regular-radius;
    color: $color5;
    font-size: 1.5em;
    padding: 0.5em;
    text-align: center;
  }

  .todos {
  }
}
</style>
