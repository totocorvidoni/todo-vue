<template>
  <form class="new-todo-form" @submit.prevent="onFormSubmit">
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
</template>

<script>
import DatePicker from "vue2-datepicker";

export default {
  name: "new-todo-form",
  components: { DatePicker },
  data() {
    return {
      newTodoTitle: "",
      newTodoDescription: "",
      newTodoDate: "",
      newTodoPriority: 0
    };
  },

  methods: {
    onFormSubmit() {
      // TODO - make the created TODO active so you automatically see the info.
      this.$store.dispatch("addTodo", {
        title: this.newTodoTitle,
        description: this.newTodoDescription,
        dueDate: this.newTodoDate,
        priority: this.newTodoPriority
      });
      this.$emit("close-form");
      this.resetForm();
    },

    onFormCancel() {
      this.$emit("close-form");
      this.resetForm();
    },

    resetForm() {
      this.newTodoTitle = "";
      this.newTodoDescription = "";
      this.newTodoDueDate = "";
      this.newTodoPriority = 0;
    }
  }
};
</script>

<style lang="scss">
.new-todo-form {
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
    background: $color3;
    color: $color1;
  }

  & > .form-cancel {
    grid-column: 2 / 3;
    background: $color5;
    color: $color1;
  }
}
</style>

