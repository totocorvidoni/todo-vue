<template>
  <div id="project-details" v-if="activeProject">
    <h1>{{ activeProject.name }}</h1>
    <ul>
      <li v-for="todo in activeTodos" :key="todo.id">{{ todo.title }}</li>
    </ul>
  </div>
  <div v-else>No Active Project</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "project-details",

  computed: {
    ...mapGetters(["activeProject", "activeTodos"])
  }
};
</script>

<style lang="scss">
#project-details {
}
</style>
