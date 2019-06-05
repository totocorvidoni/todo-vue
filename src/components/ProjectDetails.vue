<template>
  <div id="project-details" class="above-left">
    <div class="section-header">
      <h1 class="title">{{ activeProject.name }}</h1>
      <span class="category">Project</span>
    </div>
    <div class="projects-wrapper">
      <transition name="fade" mode="out-in">
        <new-todo-form v-if="addingTodo" @close-form="addingTodo = false"/>
        <button v-else class="button new-todo-button" @click="addingTodo = true">New Todo</button>
      </transition>
      <ul class="todos">
        <project-item v-for="todo in activeTodos" :key="todo.id" v-bind="todo"/>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProjectItem from "@/components/ProjectItem.vue";
import NewTodoForm from "@/components/NewTodoForm.vue";

export default {
  name: "project-details",
  components: { ProjectItem, NewTodoForm },

  data() {
    return {
      addingTodo: false
    };
  },

  methods: {},

  computed: {
    ...mapGetters(["activeProject", "activeTodos"])
  }
};
</script>

<style lang="scss">
#project-details {
  background: $color5;
  border-color: $color1;
  color: $color1;
  overflow-y: auto;
  z-index: 10;

  .projects-wrapper {
    display: grid;
    grid-template-rows: auto 1fr;
    padding: 1em;
  }

  .new-todo-button {
    justify-self: end;
    background: $color3;
    border-radius: $little-radius;
    color: $color1;
    font-weight: 700;
    padding: 0.5em 1em;
    margin-bottom: 0.5em;
  }
}
</style>
