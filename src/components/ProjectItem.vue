<template>
  <li class="todo" :class="{ active: isActive }">
    <div class="todo-header" @click="onTodoClick">
      <h3 class="todo-title">{{ title }}</h3>
      <p class="description">- {{ description }}</p>
    </div>
    <div class="info-wrapper">
      <div class="due-date">
        <span class="text" v-if="isDue(dueDate)">Was due on</span>
        <span v-else class="text">Due On</span>
        <div class="date">
          <!-- TODO - Add date picker to this buttons -->
          <button class="button day">{{ shortDay(dueDate) }}</button>
          <button class="button time">{{ time(dueDate) }}</button>
        </div>
      </div>
      <div class="priority" :class="priorityClass(priority)">
        <span class="button priority-text" @click="onPriorityClick">
          <p>{{ priorityText(priority) }}</p>
        </span>
        <div
          class="drop-down"
          v-if="changingPriority"
          @focusout="changinPriority = false"
          ref="priorityDrop"
        >
          <h4>Change Priority</h4>
          <ul>
            <li
              v-for="item in priorities"
              :key="item.value"
              v-show="item.value != priority"
              @click="onPriorityListClick(item.value)"
              class="button"
              :class="item.class"
            >{{ item.name }}</li>
          </ul>
          <button class="button cancel" @click="changingPriority = false">Cancel</button>
        </div>
      </div>
      <button
        class="button completion"
        :class="completed ? 'completed' : 'not-completed'"
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

  data() {
    return {
      priorities: [
        { value: 0, name: "None", class: "none" },
        { value: 1, name: "Low", class: "low" },
        { value: 2, name: "High", class: "high" },
        { value: 3, name: "Very High", class: "very-high" }
      ],

      changingPriority: false
    };
  },

  methods: {
    onTodoClick() {
      this.$store.commit("setActiveTodo", this.id);
    },

    onCompletedClick() {
      this.$store.commit("toggleTodo", this.id);
    },

    onPriorityClick() {
      if (this.changingPriority) {
        this.changingPriority = false;
      }
      this.changingPriority = true;
    },

    onPriorityListClick(value) {
      this.$store.commit("changeTodoPriority", {
        todoId: this.id,
        priority: value
      });
      this.changingPriority = false;
    }
  },

  computed: {
    ...mapGetters(["activeTodo"]),
    completedText() {
      return this.completed ? "Completed" : "Not completed";
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

  &.active {
    border: 5px solid $color4;
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

    &:hover {
      cursor: pointer;
    }
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

    .button:active {
      transform: none;
    }
  }

  .priority,
  .completion {
    padding: $button-padding;
    text-align: center;
  }

  .priority {
    position: relative;
    border-right: 2px solid $color1-light;
    color: $color5;
    width: 6em;
  }

  .priority-text {
    display: grid;
    place-content: center;
  }

  .drop-down {
    position: absolute;
    background: $color1;
    padding: 0.5em;
    left: 100%;
    z-index: 100;

    h4 {
      padding: 0 0.5em;
      margin-bottom: 0.5em;
    }

    li {
      padding: $button-padding;

      &:not(:last-child) {
        margin-bottom: 0.25em;
      }
    }

    .cancel {
      background: $color1-light;
      border-radius: $little-radius;
      color: $color5;
      font-size: 0.9em;
      padding: $button-padding;
      margin-top: 0.5em;
    }
  }

  .due-date {
    flex-grow: 2;
    display: flex;
    justify-items: end;
    align-items: center;
    background: $color1-faded;

    .text {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 0.5em;
    }

    .date {
      flex-grow: 2;
      display: flex;
      height: 100%;

      .day {
        border-left: 2px solid $color1-light;
      }

      .day,
      .time {
        background: $color1-faded;
        border-right: 2px solid $color1-light;
        font-weight: 700;
        color: $color5;
        height: 100%;
        padding: 0 0.5em;
        width: 50%;
      }
    }
  }

  .completion {
    color: $color5;
    font-weight: 700;
    width: 9em;

    &.completed {
      background: $color-done;
    }

    &.not-completed {
      background: $color-not-done;
    }
  }

  .none {
    background: $no-priority;
  }

  .low {
    background: $low-priority;
  }

  .high {
    background: $high-priority;
  }

  .very-high {
    background: $very-high-priority;
  }
}
</style>