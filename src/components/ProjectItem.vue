<template>
  <li class="todo-item" :class="{ active: isActive }">
    <div class="todo-header">
      <h3 class="todo-title">{{ title }}</h3>
      <div class="button inspect" @click="onTodoClick" title="Todo Details">
        <button class="button">
          <img class="icon" src="@/assets/bars.png" alt>
        </button>
      </div>
      <button class="button remove" title="Remove Todo" @click="onRemoveTodoClick">
        <span class="button">X</span>
      </button>
      <p class="description">{{ description }}</p>
    </div>
    <div class="info-wrapper">
      <div class="due-date">
        <span class="text" v-if="isDue(dueDate)">Was due on</span>
        <span v-else class="text">Due On</span>
        <span class="day">{{ shortDay(dueDate) }}</span>
        <span class="time">{{ time(dueDate) }}</span>
      </div>
      <div class="priority button" :class="priorityClass(priority)" @click="onPriorityClick">
        <p>{{ priorityText(priority) }}</p>
        <div class="drop-down" v-if="changingPriority" ref="priorityDrop">
          <h4>Change Priority</h4>
          <ul>
            <li
              v-for="item in priorities"
              :key="item.value"
              v-show="item.value != priority"
              @click.stop="onPriorityListClick(item.value)"
              class="button"
              :class="item.class"
            >{{ item.name }}</li>
          </ul>
          <button class="button cancel" @click.stop="changingPriority = false">Cancel</button>
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
        { value: 0, name: "No", class: "none" },
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
      this.$nextTick(() => {
        document
          .getElementById("todo-details")
          .scrollIntoView({ behavior: "smooth" });
      });
    },

    onRemoveTodoClick() {
      this.$store.dispatch("removeTodo", this.id);
    },

    onCompletedClick() {
      this.$store.dispatch("toggleTodo", this.id);
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
.todo-item {
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
    grid-template-columns: 1fr repeat(2, 40px);
    grid-template-rows: 1fr auto;
    // border-top-right-radius: $little-radius;
    color: $color5;
  }

  .todo-title {
    grid-area: 1 / 1 / 2 / 2;
    background: $color1-light;
    border-top-left-radius: $little-radius;
    flex-grow: 2;
    padding: 0.5em;
    padding-right: 0;
    text-transform: capitalize;
  }

  .description {
    grid-column: 1 / -1;
    background: $color1-faded;
    color: $color1-light;
    font-style: italic;
    margin: auto 0;
    padding: 0.5em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .inspect {
    display: flex;
    justify-content: center;
    align-content: center;
    background: $color1;
    padding: 0 0.5em;

    .button {
      background: none;
      margin: auto 0;
    }

    .icon {
      display: block;
      width: 16px;
    }
  }

  .remove {
    border-top-right-radius: $little-radius;
    font-size: 1em;
  }

  .info-wrapper {
    display: flex;
    justify-content: space-between;
    background: $color1-faded;
  }

  .due-date {
    flex-grow: 2;
    display: flex;
    justify-content: flex-start;
    align-content: center;
    background: $color1-faded;

    & > * {
      margin: auto 0.25em auto 0;
      background: none;
      color: $color5;
      font-weight: 700;
      padding: 0 0.5em;
    }
  }

  .priority,
  .completion {
    padding: $button-padding;
    text-align: center;
  }

  .priority {
    position: relative;
    display: grid;
    place-content: center;
    color: $color5;
    width: 6em;
  }

  .drop-down {
    position: absolute;
    top: 0;
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

  .button:active {
    transform: none;
  }
}
</style>