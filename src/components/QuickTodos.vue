<template>
  <div class="quick-todos">
    <div class="no-todos" v-if="noActiveTodos && !addingTodo">
      <img src="@/assets/faded-checkmark.svg" alt="a checkmark">
      <p>
        There are no todos to... well...
        <br>
        <em>to do</em>.
      </p>
      <button class="button add" @click="onNewTodoButtonClick">Add some?</button>
    </div>
    <ul>
      <li
        v-for="todo in activeTodos"
        :key="todo.id"
        class="todo"
        :class="{ completed: todo.completed }"
      >
        <h3 class="todo-title button" @click="onTodoClick(todo.id)">{{ todo.title }}</h3>
        <button class="button remove" @click="removeTodo(todo.id)">X</button>
      </li>
      <li>
        <form
          name="new-todo"
          class="new-todo"
          @submit.prevent="submitTodo"
          v-if="!noActiveTodos || addingTodo"
        >
          <input
            type="text"
            v-model="newTodo"
            maxlength="30"
            minlength="1"
            placeholder="A New Todo"
            ref="newTodo"
          >
          <input type="submit" name="submitName" value="Create" class="button">
        </form>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "quick-todos",
  data() {
    return {
      addingTodo: false,
      newTodo: ""
    };
  },

  methods: {
    onNewTodoButtonClick() {
      this.addingTodo = true;
      this.$nextTick(() => {
        this.$refs.newTodo.focus({ preventScroll: false });
      });
    },

    submitTodo() {
      this.$store.dispatch("addTodo", {
        title: this.newTodo
      });
      this.newTodo = "";
      this.addingTodo = false;
    },

    removeTodo(id) {
      this.$store.dispatch("removeTodo", id);
    },
    onTodoClick(id) {
      this.$store.commit("toggleTodo", id);
    }
  },

  computed: {
    ...mapGetters(["activeTodos", "noActiveTodos"])
  }
};
</script>

<style lang="scss">
.quick-todos {
  background: $color5;
  color: $color1;
  max-height: 100%;
  overflow-y: auto;

  ul {
    list-style-type: none;
    padding: 0.5em;
  }

  li:not(:first-of-type) {
    margin-top: 0.25em;
  }

  .todo {
    display: flex;
    background: $color1-faded;
    border-radius: $little-radius;
    text-transform: capitalize;

    &.completed {
      background: $color-done;
      color: $color5;
    }
  }

  .todo-title {
    flex-grow: 2;
    font-weight: 700;
    padding: 0.5em;

    &:hover {
      transform: translateX(7px);
    }
  }

  .done-badge {
    height: 20px;
    width: auto;
    margin-right: 0.2em;
    user-select: none;
  }

  .remove {
    border-top-right-radius: $little-radius;
    border-bottom-right-radius: $little-radius;
    font-size: 1em;
  }

  .button.add {
    display: block;
    margin: 0 auto;
  }

  // TODO - get the form size exactly the same as the li elements.
  .new-todo {
    display: flex;
    justify-content: space-between;
    background: $color3;
    border-radius: $little-radius;
    padding: 0.25em 0.5em;
  }

  input[type="text"] {
    background: none;
    border: none;
    color: $color1;
    flex-grow: 2;
    font-weight: 700;

    &:focus {
      outline: none;
    }
  }

  input[type="submit"] {
    background: $color5;
    border-radius: $little-radius;
    color: $color1;
    font-weight: 700;
    padding: $button-padding;
  }
}

.button.add {
  background: $color3;
  border-radius: $regular-radius;
  color: $color1;
  padding: 0.5em 1em;
  font-weight: 700;
}

.no-todos {
  display: grid;
  justify-items: center;
  align-content: center;
  color: $color1;
  padding: 1em;
  text-align: center;

  img {
    padding: 1.5em;
    width: 50%;
    height: auto;
  }

  p {
    font-weight: 700;
    font-size: 1.5em;
    opacity: 0.66;
    margin-bottom: 0.5em;
  }
}
</style>
