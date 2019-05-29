<template>
  <div id="todo-details">
    <div class="title" :class="priorityClass">
      <h1>{{ activeTodo.title }}</h1>
      <p class="priority">{{ priorityText }}</p>
    </div>
    <p class="description">{{ activeTodo.description }}</p>
    <div class="due-date">
      <h2>Due in</h2>
      <p class="time-left" :class="howSoon(date)">{{ timeLeft(date) }}</p>
      <p class="due-date">{{ dueDate(date) }}</p>
    </div>
    <div class="notes-wrapper">
      <h2>Notes</h2>
      <div class="notes">
        <p class="note" v-for="note in activeTodo.notes">{{ note }}</p>
      </div>
    </div>
    <p>{{ activeTodo.completed }}</p>
  </div>
</template>

<script>
import date from "@/mixins/datesHelper";
import { mapGetters } from "vuex";

export default {
  name: "todo-details",
  mixins: [date],

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

  .due-date {
    text-align: center;

    .time-left {
      border-radius: $little-radius;
      color: $color5;
      font-size: 1.5em;
      font-weight: 700;
      margin-bottom: 0.5em;
      padding: $button-padding;
      text-transform: capitalize;
    }

    .due-date {
      font-style: italic;
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

  .notes {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .note {
    background: $color1-light;
    border-radius: $regular-radius;
    color: $color5;
    font-weight: 700;
    margin: 0.25em;
    padding: 1em;
  }
}
</style>
