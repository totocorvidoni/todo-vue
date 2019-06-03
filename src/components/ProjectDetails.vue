<template>
  <div id="project-details" class="above-left">
    <h1 class="title">Project: {{ activeProject.name }}</h1>
    <transition name="fade" mode="out-in">
      <form class="new-todo" @submit.prevent="onFormSubmit" v-if="addingTodo">
        <h3 class="form-title">New Todo</h3>
        <label for="title">Title</label>
        <input type="text" name="title" v-model="newTodoTitle" class="new-title">
        <label for="description">Description</label>
        <textarea name="description" rows="3" v-model="newTodoDescription" class="new-description"/>
        <label for="date">Due Date</label>
        <date-picker
          class="new-date"
          name="date"
          v-model="newTodoDate"
          type="datetime"
          lang="en"
          format="DD/MM/YYYY - HH:mm"
          :time-picker-options="{ start: '00:00', step: '00:30', end: '23:30' }"
        />
        <label for="priority">Priority</label>
        <select name="priority" v-model="newTodoPriority" class="new-priority">
          <option value="0" selected>None</option>
          <option value="1">Low</option>
          <option value="2">High</option>
          <option value="3">Very High</option>
        </select>
        <button class="button form-cancel" @click.prevent="onFormCancel">Cancel</button>
        <input class="button form-submit" type="submit" value="Create">
      </form>
      <button v-else class="button new-todo-button" @click="addingTodo = true">New Todo</button>
    </transition>
    <ul class="todos">
      <project-item v-for="todo in activeTodos" :key="todo.id" v-bind="todo"/>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DatePicker from "vue2-datepicker";
import ProjectItem from "@/components/ProjectItem.vue";

export default {
  name: "project-details",
  components: { DatePicker, ProjectItem },

  data() {
    return {
      addingTodo: false,
      newTodoTitle: "",
      newTodoDescription: "",
      newTodoDate: "",
      newTodoPriority: 0
    };
  },

  methods: {
    onFormSubmit() {
      this.$store.dispatch("addTodo", {
        title: this.newTodoTitle,
        description: this.newTodoDescription,
        dueDate: this.newTodoDate,
        priority: this.newTodoPriority
      });
      this.addingTodo = false;
      this.resetForm();
    },

    onFormCancel() {
      this.addingTodo = false;
      this.resetForm();
    },

    resetForm() {
      this.newTodoTitle = "";
      this.newTodoDescription = "";
      this.newTodoDueDate = "";
      this.newTodoPriority = 0;
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
  grid-template-rows: auto auto 1fr;
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

  .new-todo {
    display: grid;
    grid-template-columns: auto auto 1fr;
    grid-gap: 0.5em;
    align-items: center;
    background: $color1-light;
    border-radius: $little-radius;
    margin: 0.5em auto;
    padding: 1em;

    & > .form-title {
      grid-column: 1 / -1;
    }

    & > .new-title,
    & > .new-description,
    & > .new-date,
    & > .new-priority {
      grid-column: 2 / -1;
    }

    & > .form-title {
      justify-self: center;
      border-bottom: 2px solid $color3;
      color: $color3;
      text-align: center;
      padding: 0 1em;
      margin-bottom: 0.5em;
    }

    & > label {
      justify-self: end;
      color: $color5;
      font-weight: 700;
      white-space: nowrap;
    }

    & > .new-title,
    & > .new-description {
      padding: 0 0.25em;
    }

    & > .new-title {
      line-height: 1.5em;
    }

    & > .new-priority {
      background: #fff;
    }

    & > .form-submit,
    & > .form-cancel {
      justify-self: start;
      border-radius: $little-radius;
      font-weight: 700;
      padding: $button-padding;
    }

    & > .form-submit {
      grid-column: 3;
      background: $color1;
      color: $color5;
    }

    & > .form-cancel {
      grid-column: 2 / 3;
      background: $color5;
      color: $color1;
    }
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
