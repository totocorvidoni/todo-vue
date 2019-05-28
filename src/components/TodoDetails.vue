<template>
  <div id="todo-details">
    <h1 class="title">{{ todo.title }}</h1>
    <p class="description">{{todo.description}}</p>
    <p>{{ prettyDate }}</p>
    <p>{{ prettyTime }}</p>
    <p>{{ todo.priority }}</p>
    <p>{{ todo.notes }}</p>
    <p>
      {{
      todo.completed}}
    </p>
  </div>
</template>

<script>
import { format } from "date-fns";

export default {
  name: "todo-details",

  computed: {
    todo() {
      return this.$store.state.todos[this.$store.state.activeTodoId];
    },

    prettyDate() {
      return format(this.todo.dueDate, "dddd do of MMMM");
    },

    prettyTime() {
      return format(this.todo.dueDate, "HH:mm");
    }
  }
};
</script>

<style lang="scss">
#todo-details {
  display: grid;
  justify-items: center;
  align-items: start;

  .title {
    align-self: start;
    border: 2px solid $color1;
    border-radius: $regular-radius;
    padding: 0.5em;
    text-transform: capitalize;
    font-size: 1.5em;
  }

  .description {
    font-weight: 700;
    font-size: 1.5em;
    width: 60%;
    text-align: center;
    background: $color3;
    padding: 1em;
  }
}
</style>
