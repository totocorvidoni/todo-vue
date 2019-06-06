<template>
  <div id="project-details" class="above-left">
    <div class="section-header">
      <h1 class="title">{{ activeProject.name }}</h1>
      <span class="category">Project</span>
    </div>
    <div class="projects-wrapper">
      <div v-if="noActiveTodos && !addingTodo" class="empty-project">
        <h2>This project has no todos.</h2>
        <p>Add some by clicking the "New Todo" button!</p>
      </div>
      <ul v-else class="todos">
        <project-item v-for="todo in activeTodos" :key="todo.id" v-bind="todo"/>
      </ul>
      <transition name="fade" mode="out-in">
        <new-todo-form v-if="addingTodo" @close-form="addingTodo = false"/>
        <button v-else class="button new-todo-button" @click="addingTodo = true">New Todo</button>
      </transition>
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
    ...mapGetters(["activeProject", "activeTodos", "noActiveTodos"])
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

  .empty-project {
    background: $color1-faded;
    border-radius: $regular-radius;
    color: $color1-light;
    margin: 3em;
    padding: 3em;
  }
}

@media screen and (max-width: 1250px) {
  #project-details {
    border-right: none;
    border-bottom: 5px solid $color1-dark;
  }
}

@media screen and (max-width: 750px) {
  #project-details {
    .title {
      padding: 0 2rem;
    }
  }
}
</style>
