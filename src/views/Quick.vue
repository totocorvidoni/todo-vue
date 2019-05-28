<template>
  <div id="quick-view">
    <div class="logo">
      <img src="@/assets/logo-todo.svg" alt="A Gothic letter T">
    </div>
    <h1 class="title">THOU SHALL DO</h1>
    <p class="subtitle">I needed a larger title (I also needed a subtitle)</p>
    <div class="creators">
      <add-button @buttonClick="onNewProjectButtonClick">Add Project</add-button>
      <add-button @buttonClick="onNewTodoButtonClick">Add Todo</add-button>
    </div>
    <main id="project">
      <div class="todos">
        <!-- TODO - noActiveTodos doesn't go away with the form for new todos -->
        <div class="no-todos" v-if="noTodos">
          <img src="@/assets/faded-checkmark.svg" alt="a checkmark">
          <p>There is nothing left To Do.</p>
        </div>
        <ul v-else>
          <li v-for="todo in todos" :key="todo.id" class="todo">
            <h3
              class="todo-title button"
              @click="onTodoClick(todo.id)"
              :class="{ completed: todo.completed }"
            >{{ todo.title }}</h3>
            <transition name="fade">
              <img
                class="done-badge"
                src="@/assets/done-green.png"
                alt="done checkmark"
                v-if="todo.completed"
              >
            </transition>
            <button class="button remove" @click="removeTodo(todo.id)">X</button>
          </li>
        </ul>
        <form name="new-todo" class="new-todo" v-if="addingTodo" @submit.prevent="submitTodo">
          <input
            type="text"
            v-model="newTodo"
            maxlength="30"
            minlength="1"
            placeholder="New Todo"
            ref="newTodo"
          >
          <input type="submit" name="submitName" value="Create" class="button">
        </form>
      </div>
    </main>
    <router-link :to="{ name: 'full' }" class="button go-full">Full View</router-link>
  </div>
</template>

<script>
import { pick, isEmpty } from "lodash";
import AddButton from "@/components/AddButton.vue";

export default {
  name: "quick-view",
  components: {
    AddButton
  },
  data() {
    return {
      addingProject: false,
      addingTodo: false,
      newProject: "",
      newTodo: ""
    };
  },

  methods: {
    async submitTodo() {
      await this.$store.dispatch("addTodo", {
        title: this.newTodo
      });
      this.newTodo = "";
      this.addingTodo = false;
    },

    removeTodo(id) {
      this.$store.dispatch("removeTodo", id);
    },

    onNewTodoButtonClick() {
      this.addingTodo = true;
      this.$nextTick(function() {
        this.$refs.newTodo.focus({ preventScroll: false });
      });
    },

    onTodoClick(id) {
      this.$store.commit("toggleTodo", id);
    }
  },

  computed: {
    todos() {
      const ids = this.$store.state.defaultProject.todos;
      return pick(this.$store.state.todos, ids);
    },

    noTodos() {
      return isEmpty(this.$store.state.defaultProject.todos);
    }
  }
};
</script>

<style lang="scss">
#quick-view {
  display: grid;
  grid-gap: 1rem;
  justify-items: center;
  grid-template-rows: auto auto auto auto minmax(240px, 1fr) auto;
  color: $color5;
  padding: 2rem 0 2rem;
  height: 100%;

  .logo {
    background: $color1-dark;
    border-radius: $regular-radius;
    padding: 1rem 0.25rem;
    box-shadow: inset 0px 0px 5px 2px rgba(0, 0, 0, 0.2);
    img {
      height: 100px;
      width: 100px;
    }
  }

  .title {
    font-size: 2.5rem;
    margin: 0;
  }

  .subtitle {
    font-size: 1.5rem;
    font-weight: 300;
    font-style: italic;
    margin-top: -1rem;
    margin-bottom: 2rem;
  }

  .creators {
    display: flex;
    & > * {
      margin: 0 0.5em;
    }
  }

  #project {
    display: grid;
    grid-auto-flow: column;
    grid-template-rows: auto 1fr;
    border: 3px solid $color5;
    border-top-left-radius: $regular-radius;
    border-top-right-radius: $regular-radius;
    transition: $regular-ease;

    * {
      transition: $regular-ease;
    }

    .title-wrapper {
      display: grid;
      place-content: center;
      background: $color1-dark;
      border-top-left-radius: $regular-radius;
      border-top-right-radius: $regular-radius;
      padding: 0.5em 2em;
      text-align: center;
      width: 480px;
      height: 60px;
    }

    h2 {
      line-height: 1.5em;
    }

    .new-project {
      display: flex;
      justify-content: center;

      input[type="text"] {
        display: block;
        background: none;
        border: none;
        border-bottom: 2px solid $color5;
        color: $color5;
        font-size: 1.5em;
        font-weight: 700;
        text-align: center;
        padding: 0 0.2em;
        line-height: 1.5em;

        &:focus {
          outline: none;
        }
      }

      input[type="submit"] {
        background: $color5;
        padding: $button-padding;
        color: $color1;
        font-weight: 700;
        border-top-left-radius: $little-radius;
        border-top-right-radius: $little-radius;
      }
    }

    .no-todos {
      display: grid;
      justify-items: center;
      align-content: center;
      height: 100%;

      img {
        padding: 1.5em;
        width: 30%;
        height: auto;
      }

      p {
        font-weight: 700;
        font-size: 1.5em;
        color: $color1;
        opacity: 0.66;
      }
    }

    .todos {
      background: $color5;
      color: $color1;
      overflow-y: auto;

      ul {
        list-style-type: none;
        padding: 0.2em;
      }

      .todo {
        display: flex;
        background: $color3;
        border-radius: $little-radius;
        padding: 0.2em 0.5em;
        text-transform: capitalize;

        &:not(:first-of-type) {
          margin-top: 2px;
        }
      }

      .todo-title {
        flex-grow: 2;
        font-weight: 400;

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
        border-radius: 50%;
      }

      // TODO - get the form size exactly the same as the li elements.
      .new-todo {
        display: flex;
        justify-content: space-between;
        background: $color3;
        margin: 0 0.2em;
        padding: 0.2em 0.5em;
      }

      input[type="text"] {
        background: none;
        border: none;
        color: $color1;
        flex-grow: 2;

        &:focus {
          outline: none;
        }
      }

      input[type="submit"] {
        background: $color1-dark;
        border-radius: $little-radius;
        color: $color5;
        font-weight: 700;
        padding: 0 0.5em;
      }
    }

    .completed {
      color: $color5;
    }
  }

  .go-full {
    display: block;
    background: $color5;
    color: $color1;
    font-size: 1.2em;
    font-weight: 700;
    padding: 0.5em 1em;
    text-decoration: none;
    text-transform: uppercase;
  }
}
</style>
 