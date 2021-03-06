<template>
  <div id="todo-details">
    <div class="section-header">
      <h1 class="title">{{ activeTodo.title }}</h1>
      <span class="category">Todo</span>
      <span
        class="priority"
        :class="priorityClass(activeTodo.priority)"
      >{{ priorityText(activeTodo.priority) }} Priority</span>
    </div>
    <form v-if="changingDescription" @submit.prevent="onDescriptionChange" class="description">
      <label for="new-description">New Todo Description</label>
      <input type="text" name="new-description" v-model="newDescription">
      <input type="submit" value="Confirm" class="button">
    </form>
    <div v-else class="description">
      <p class="text">{{ activeTodo.description }}</p>
      <button class="button edit" @click="changingDescription = true">Edit</button>
    </div>
    <transition name="fade">
      <div class="due-date-wrapper">
        <div class="info-wrapper" :class="statusClass">
          <!-- TODO - refactor, too much logic on template -->
          <h2 v-if="activeTodo.completed">Completed {{ timeLeft(activeTodo.completed) }} ago</h2>
          <h2 v-else-if="!activeTodo.dueDate">This todo has no due date.</h2>
          <h2 v-else-if="isDue(date)">Has been due for {{ timeLeft(date) }}</h2>
          <h2 v-else>Due in {{ timeLeft(date) }}</h2>
          <p v-if="activeTodo.completed">{{ longDate(activeTodo.completed) }}</p>
          <p v-else-if="activeTodo.dueDate">{{ longDate(date) }}</p>
        </div>
        <div v-if="!pickingDate" class="date-actions">
          <button class="button complete" @click="onCompleteClick">{{ completeButtonText }}</button>
          <button
            class="button reschedule"
            title="Change Due Date"
            @click="pickingDate = true"
          >Reschedule?</button>
        </div>
        <div v-else class="date-actions date-picker">
          <date-picker
            class="date-picker"
            v-model="newDueDate"
            type="datetime"
            lang="en"
            format="DD/MM/YYYY - HH:mm"
            :time-picker-options="{ start: '00:00', step: '00:30', end: '23:30' }"
          />
          <button class="button date-confirm" @click="onNewDateConfirm">Confirm</button>
        </div>
      </div>
    </transition>
    <div class="notes-wrapper">
      <form class="new-note" @submit.prevent="onNewNote">
        <textarea name="new-note" v-model="newNote" rows="4"/>
        <input class="button" type="submit" value="Add Note">
      </form>
      <div class="notes">
        <div class="note" v-for="(note, index) in activeTodo.notes">
          <p class="text">{{ note }}</p>
          <button class="remove button" @click="onRemoveNoteClick(index)">X</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DatePicker from "vue2-datepicker";
import datesHelper from "@/mixins/datesHelper";
import priorityHelper from "@/mixins/priorityHelper";

export default {
  name: "todo-details",
  components: { DatePicker },
  mixins: [datesHelper, priorityHelper],
  data() {
    return {
      pickingDate: false,
      changingDescription: false,
      newDescription: "",
      newDueDate: "",
      newNote: ""
    };
  },

  methods: {
    onDescriptionChange() {
      this.$store.commit("changeTodoDescription", {
        todoId: this.activeTodo.id,
        description: this.newDescription
      });
      this.changingDescription = false;
      this.newDescription = "";
    },

    onCompleteClick() {
      this.$store.dispatch("toggleTodo", this.activeTodo.id);
    },

    onNewDateConfirm() {
      this.$store.commit("changeTodoDueDate", {
        todoId: this.activeTodo.id,
        dueDate: this.newDueDate
      });
      this.newDueDate = "";
      this.pickingDate = false;
    },

    onNewNote(e) {
      if (this.newNote !== "") {
        this.$store.commit("addTodoNote", {
          todoId: this.activeTodo.id,
          note: this.newNote
        });
      }
      this.newNote = "";
    },

    onRemoveNoteClick(index) {
      this.activeTodo.notes.splice(index, 1);
    }
  },

  computed: {
    ...mapGetters(["activeTodo"]),

    date() {
      return this.activeTodo.dueDate;
    },

    completeButtonText() {
      return this.activeTodo.completed ? "Uncomplete todo" : "Complete Todo!";
    },

    statusClass() {
      if (this.activeTodo.completed) {
        return "done";
      } else {
        return this.howSoon(this.date);
      }
    }
  }
};
</script>

<style lang="scss">
#todo-details {
  display: grid;
  grid-gap: 1rem;
  justify-items: center;
  align-content: start;
  background: $color5;
  overflow-y: auto;
  padding-bottom: 1em;

  .section-header {
    justify-self: stretch;
    color: $color5;
    text-align: center;
    padding: 1em;

    .title {
      text-transform: capitalize;
      margin: 0 0 0.2em;
    }
  }

  .priority {
    font-size: 1.2em;
    font-style: italic;
    font-weight: 700;

    &.none {
      color: $no-priority;
    }

    &.low {
      color: $low-priority;
    }

    &.high {
      color: $high-priority;

      &::after {
        content: "!";
      }
    }

    &.very-high {
      color: $very-high-priority;

      &::after {
        content: "!!!";
      }
    }
  }

  .description {
    justify-self: center;
    background: $color4;
    border-radius: $little-radius;
    color: $color1;
    font-weight: 700;
    font-size: 1.5em;
    text-align: center;
    width: 60%;

    .text {
      padding: 0.5em 1em;
    }

    .edit {
      background: none;
      color: $color1-light;
      font-size: 0.6em;
      font-weight: 700;
      border: 1px solid $color1-light;
      border-radius: $regular-radius;
      padding: $button-padding;
      margin-bottom: .5em;
    }

    & > label {
      display: block;
      padding: 0.5em 1em;
    }

    & > input[type="text"] {
      border: none;
      border-bottom: 2px solid $color1;
      background: none;
      color: $color1;
      padding: 0 0.5em;

      &:focus {
        outline: none;
      }
    }

    & > input[type="submit"] {
      background: $color1;
      border-radius: $little-radius;
      color: $color4;
      font-size: 0.8em;
      margin: 0.5em 0;
      padding: $button-padding;
    }
  }

  h2 {
    margin-bottom: 0.25em;
    text-align: center;
  }

  .due-date-wrapper {
    text-align: center;
    border-radius: $regular-radius;

    .info-wrapper {
      border-top-left-radius: $little-radius;
      border-top-right-radius: $little-radius;
      color: $color5;
      padding: 1em 2em;
    }

    .not-soon {
      background: $no-priority;
    }

    .soon {
      background: $low-priority;
    }

    .very-soon {
      background: $high-priority;
    }

    .due {
      background: $very-high-priority;
    }

    .done {
      background: $color-done;
    }
  }

  .complete,
  .reschedule {
    color: $color5;
    font-weight: 700;
    padding: 0.5em 1em;
    width: 50%;
    white-space: nowrap;
  }

  .complete {
    background: $color-done;
    border-bottom-left-radius: $regular-radius;
  }

  .reschedule {
    background: $color1;
    border-bottom-right-radius: $regular-radius;
  }

  .date-confirm {
    background: $color-not-done;
    border-bottom-right-radius: $little-radius;
    color: $color5;
    font-weight: 700;
    padding: 0.5em 1em;
  }

  .notes {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .note {
    display: flex;
    align-content: center;
    background: $color1-light;
    border-radius: $regular-radius;
    color: $color5;
    font-weight: 700;
    margin: 0.25em;

    .text {
      margin: auto 0;
      padding: 1em;
    }

    .remove {
      display: block;
      border-top-right-radius: $regular-radius;
      border-bottom-right-radius: $regular-radius;

      &:active {
        transform: none;
      }
    }
  }

  .new-note {
    display: flex;
    align-content: center;
    justify-content: center;
    background: $color1;
    border-radius: $regular-radius;
    padding: 1em;
    margin: 0.5em auto;
    width: min-content;

    textarea {
      background: $color1-light;
      border: none;
      border-radius: $little-radius;
      color: $color5;
      padding: 0.5em 1em;
      transition: $quick-ease;

      &:focus {
        outline: none;
        box-shadow: $input-border;
      }
    }

    input[type="submit"] {
      border: none;
      border-radius: $little-radius;
      background: $color1;
      color: $color5;
      font-weight: 700;
      margin-left: 0.5em;
      width: 4em;
      white-space: normal;
    }
  }

  .button:active {
    transform: none;
  }
}
</style>
