<template>
  <div id="quick-view">
    <div class="logo">
      <img src="@/assets/logo-todo.svg" alt="A Gothic letter T">
    </div>
    <h1 class="title">THOU SHALL DO</h1>
    <p class="subtitle">I needed a larger title (I also needed a subtitle)</p>
    <div class="creators">
      <add-button @addClick="onAddProjectClick">Add Project</add-button>
      <add-button @addClick="onAddTodoClick">Add Todo</add-button>
    </div>
    <main id="project">
      <div class="title-wrapper">
        <transition name="fade" mode="out-in">
          <form
            name="new-project"
            class="new-project"
            v-if="addingProject"
            @submit.prevent="submitProject"
          >
            <input
              type="text"
              v-model="newProject"
              maxlength="30"
              minlength="1"
              placeholder="New Proyect"
              ref="newProject"
              @keyup.enter="submitProject"
            >
            <input type="submit" name="submitName" value="Create" class="button">
          </form>
          <h2 v-else>{{ activeProject.name }}</h2>
        </transition>
      </div>
      <div class="todos">
        <div class="no-todos" v-if="noActiveTodos">
          <img src="@/assets/faded-checkmark.svg" alt>
          <p>There is nothing left To Do.</p>
        </div>
        <ul v-else>
          <li v-for="todo in activeTodos" :key="todo.id">{{ todo.name }}</li>
        </ul>
      </div>
    </main>
    <router-link :to="{ name: 'full' }" class="button go-full">Full View</router-link>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AddButton from "@/components/AddButton.vue";

export default {
  name: "quick-view",
  components: {
    AddButton
  },
  data() {
    return {
      addingProject: false,
      newProject: ""
    };
  },

  methods: {
    onAddProjectClick() {
      this.addingProject = true;
      this.$nextTick(function() {
        setTimeout(() => {
          this.$refs.newProject.focus();
        }, 700);
      });
    },

    onAddTodoClick() {
      console.log("a click has happend on todo");
    },

    async submitProject() {
      await this.$store.dispatch("addProject", {
        name: this.newProject
      });
      this.$store.commit(
        "setActiveProject",
        this.$store.state.mostRecentProject
      );
      this.addingProject = false;
    }
  },

  computed: {
    ...mapGetters(["activeTodos", "noActiveTodos"]),
    activeProject() {
      return this.$store.state.activeProject;
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
  padding: 4rem 0 2rem;
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

      ul {
        list-style-type: none;
        padding: 0.2em;
      }

      li {
        background: $color3;
        padding: 0.2em 0.5em;

        &:not(:first-of-type) {
          margin-top: 2px;
        }
      }
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
 