<template>
  <li class="todo" @click="onTodoClick" :class="{ active: isActive }">
    <div class="todo-header" :title="title + ' - ' + description">
      <h3 class="todo-title">{{ title }}</h3>
      <p class="description">- {{ description }}</p>
    </div>
    <div class="info-wrapper">
      <div class="due-date">
        <p>Due on</p>
        <p>{{ shortDay(dueDate) }}</p>
        <p>{{ time(dueDate) }}</p>
      </div>
      <p class="priority" :class="priorityClass(priority)">{{ priorityText(priority) }}</p>
      <button
        class="button completion"
        :class="[ completed ? 'completed' : 'not-completed' ]"
        @click="onCompletedClick"
      >{{ completedText }}</button>
    </div>
  </li>
</template>

<script>
import { mapGetters } from "vuex";
import DatePicker from "vue2-datepicker";
import datesHelper from "@/mixins/datesHelper";
import priorityHelper from "@/mixins/priorityHelper";

export default {
  name: "project-item",
  components: { DatePicker },
  props: [
    "id",
    "title",
    "description",
    "dueDate",
    "priority",
    "notes",
    "completed"
  ],
  mixins: [datesHelper, priorityHelper],

  methods: {
    onTodoClick() {
      this.$store.commit("setActiveTodo", this.id);
    },

    onCompletedClick() {
      this.$store.commit("toggleTodo", this.id);
    }
  },

  computed: {
    ...mapGetters(["activeTodo"]),
    completedText() {
      return this.completed ? "Completed" : "Not Completed";
    },

    isActive() {
      if (this.activeTodo) {
        return this.id == this.activeTodo.id;
      }
    }
  }
};
</script>

<style lang="scss">
.todo {
  border: 5px solid $color1-faded;
  border-top-left-radius: $regular-radius;
  border-top-right-radius: $regular-radius;
  margin-bottom: 0.5em;
  transition: $regular-ease;

  &:hover {
    cursor: pointer;
  }

  &.active {
    border: 5px solid $color3;
  }

  .todo-header {
    display: grid;
    grid-auto-flow: column;
    justify-content: flex-start;
    background: $color1-light;
    border-top-left-radius: $little-radius;
    border-top-right-radius: $little-radius;
    color: $color5;
    padding: 0.5em 1em;
  }

  .todo-title {
    text-transform: capitalize;
    margin-right: 0.25em;
    flex-grow: 2;
  }

  .description {
    margin: auto 0;
    font-style: italic;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .info-wrapper {
    display: flex;
    justify-content: space-between;
    background: $color1-faded;
  }

  .priority,
  .due-date,
  .completion {
    padding: $button-padding;
    text-align: center;
  }

  .priority {
    padding: auto 0;

    &.low {
      background: $color-good;
      color: $color5;
    }

    &.high {
      background: $color-bad;
      color: $color5;
    }

    &.very-high {
      background: $color-very-bad;
      color: $color5;
    }

    &.none {
      background: $color-very-bad;
    }
  }

  .due-date {
    display: flex;
    justify-content: space-evenly;
    flex-grow: 2;
    background: $color1-faded;
  }

  .completion {
    color: $color5;
    font-weight: 700;
    width: 9em;

    &.completed {
      background: $color-done;
    }

    &.not-completed {
      background: $color-action;
    }

    &:active {
      transform: none;
    }
  }
}
</style>