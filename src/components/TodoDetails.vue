<template>
  <div id="todo-details">
    <div class="title" :class="priorityClass">
      <h1>{{ activeTodo.title }}</h1>
      <p class="priority">{{ priorityText }}</p>
    </div>
    <p class="description">{{ activeTodo.description }}</p>
    <button class="completed button" @click="onCompleteClick">{{ completeButtonText }}</button>
    <transition name="fade">
      <div class="due-date-wrapper" v-if="!this.activeTodo.completed">
        <h2 v-if="isDue(date)">Has been due for</h2>
        <h2 v-else>Due in</h2>
        <p class="time-left" :class="howSoon(date)">{{ timeLeft(date) }}</p>
        <div v-if="!pickingDate" class="due-date">
          <p>{{ dueDate(date) }}</p>
          <button class="button edit-date" title="Change Due Date" @click="pickingDate = true">
            <img src="@/assets/edit.png" alt>
          </button>
        </div>
        <div v-else class="date-picker">
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
      <h2>Notes</h2>
      <div class="notes">
        <div class="note" v-for="(note, index) in activeTodo.notes">
          <p class="text">{{ note }}</p>
          <button class="remove button" @click="onRemoveNoteClick(index)">X</button>
        </div>
      </div>
      <form class="new-note" @submit.prevent="onNewNote">
        <textarea name="new-note" v-model="newNote" rows="4"/>
        <input class="button" type="submit" value="Add Note">
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DatePicker from "vue2-datepicker";
import datesHelper from "@/mixins/datesHelper";

export default {
  name: "todo-details",
  components: { DatePicker },
  mixins: [datesHelper],
  data() {
    return {
      pickingDate: false,
      newDueDate: "",
      newNote: ""
    };
  },

  methods: {
    onCompleteClick() {
      this.$store.commit("toggleTodo", this.activeTodo.id);
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
    ...mapGetters(["activeTodo", "priorityText"]),

    date() {
      return this.activeTodo.dueDate;
    },

    priorityClass() {
      switch (this.activeTodo.priority) {
        case 1:
          return "low";
          break;
        case 2:
          return "high";
          break;
        case 3:
          return "very-high";
          break;
        default:
          return "none";
          break;
      }
    },

    completeButtonText() {
      return this.activeTodo.completed
        ? "Mark as not completed"
        : "Mark as completed";
    }
  }
};
</script>

<style lang="scss">
#todo-details {
  display: grid;
  grid-gap: 1.5rem;
  place-items: center;
  align-content: start;
  padding: 1em;
  overflow-y: auto;

  .title {
    color: $color5;
    text-align: center;
    padding: 1em;
    border-radius: $regular-radius;

    h1 {
      text-transform: capitalize;
      font-size: 1.5em;
      margin: 0 0 0.2em;
    }
  }

  .low,
  .high,
  .very-high {
    color: $color5;
  }

  .low {
    background: $color-good;
  }

  .high {
    background: $color-attention;
  }

  .very-high {
    background: $color-bad;
  }

  .none {
    border: 2px solid $color1;
    color: $color1;
  }

  .priority {
    font-style: italic;
  }

  h2 {
    text-decoration: underline;
    font-size: 1.5em;
    margin-bottom: 0.5em;
    text-align: center;
  }

  .description {
    font-weight: 700;
    font-size: 1.5em;
    width: 60%;
    text-align: center;
    background: $color3;
    padding: 1em;
  }

  .completed {
    background: $color-action;
    color: $color5;
    border-radius: $regular-radius;
    font-weight: 700;
    padding: 0.5em 1em;
  }

  .due-date-wrapper {
    text-align: center;

    .time-left {
      display: inline-block;
      border-radius: $little-radius;
      color: $color5;
      font-size: 1.5em;
      font-weight: 700;
      margin-bottom: 5px;
      padding: 0.25em 1em;
      text-transform: capitalize;
    }

    .due-date {
      display: flex;
      font-style: italic;
      margin: 0 auto;
      width: max-content;

      p {
        margin: auto 0;
      }
    }

    .not-soon {
      background: $color1-light;
    }

    .soon {
      background: $color-attention;
    }

    .very-soon {
      background: $color-bad;
    }

    .due {
      background: $color-very-bad;
    }
  }

  .edit-date {
    margin-left: 0.5em;
    background: none;

    img {
      width: 24px;
      height: auto;
    }
  }

  .date-confirm {
    background: $color-action;
    border-radius: $little-radius;
    color: $color5;
    font-weight: 700;
    margin-left: 0.5em;
    padding: $button-padding;
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
      border: 2px solid transparent;
      border-radius: $little-radius;
      color: $color5;
      padding: 0 0.5em;
      transition: $quick-ease;

      &:focus {
        outline: none;
        border-left: 2px solid $color5;
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
}
</style>
