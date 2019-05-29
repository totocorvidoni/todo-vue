<template>
  <div id="project-details" class="above-left">
    <h1 class="title">{{ activeProject.name }}</h1>
    <ul class="todos">
      <li class="todo" v-for="todo in activeTodos" :key="todo.id" @click="onTodoClick(todo.id)">
        <h3 class="todo-title">{{ todo.title }}</h3>
        <div class="info-wrapper">just something to see</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "project-details",

  methods: {
    onTodoClick(id) {
      this.$store.commit("setActiveTodo", id);
    }
  },

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
    .todo {
      padding: 0.5em 1em;
      background: $color3;
      // border: 1px solid $color3;
      border-top-left-radius: $regular-radius;
      border-top-right-radius: $regular-radius;
      margin-bottom: 0.5em;
    }

    .todo-title {
      text-transform: capitalize;
      padding-bottom: 0.5em;
    }

    .info-wrapper {
      background: $color5;
      padding: 1em;
    }
  }
}
</style>
