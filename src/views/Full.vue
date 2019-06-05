<template>
  <div id="full-view">
    <project-list :class="{ 'visible-flex': showingMenu }" @panel-closing="showingMenu = false"/>
    <button class="project-list-toggler button" @click="showingMenu = true" v-if="!showingMenu">
      <img src="@/assets/bars-purple.png" alt>
    </button>
    <project-details v-if="activeProject"/>
    <div v-else class="above-left nothing-wrapper projects">
      <div class="nothing-here">
        <img class="pending-image project-image" src="@/assets/project-pending.svg" alt>
        <div class="notice-wrapper">
          <h2 class="title">There is no active Project</h2>
          <p>Select a project on the panel at your left to see it's todos. If you don't no projects you can create one using the "+" button</p>
        </div>
      </div>
    </div>
    <todo-details v-if="activeTodo"/>
    <div v-else class="nothing-wrapper">
      <div class="nothing-here">
        <img class="pending-image todo-image" src="@/assets/bars-pending.svg" alt>
        <div class="notice-wrapper">
          <h2 class="title">There is no Todo selected.</h2>
          <p>
            You can view all the details of a Todo and even add notes by clicking on the
            <img
              class="details-icon"
              src="@/assets/bars-pending.png"
              alt
            > button in the project panel.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProjectList from "@/components/ProjectsList.vue";
import ProjectDetails from "@/components/ProjectDetails.vue";
import TodoDetails from "@/components/TodoDetails.vue";

export default {
  name: "full-view",
  components: {
    ProjectList,
    ProjectDetails,
    TodoDetails
  },
  data() {
    return {
      showingMenu: false
    };
  },

  computed: {
    ...mapGetters(["activeProject", "activeTodos", "noActiveTodos"]),
    activeProject() {
      return this.$store.state.activeProjectId;
    },

    activeTodo() {
      return this.$store.state.activeTodoId;
    }
  }
};
</script>

<style lang="scss">
#full-view {
  display: grid;
  grid-template-columns: 20% 40% 40%;
  background: $color1-dark;
  border: 0.5rem solid $color1-dark;
  border-left: none;
  border-radius: $regular-radius;
  color: $color1;
  height: 100%;

  .nothing-here {
    display: grid;
    grid-template-rows: 1fr auto;
    grid-gap: 1em;
    border: 5px solid $color1-faded;
    border-radius: 5%;
    margin: 3rem 5rem;
    padding: 2rem 3rem;
    color: $color1-light;
    user-select: none;
  }

  .notice-wrapper {
    background: $color1-faded;
    border-radius: $regular-radius;
    padding: 2rem;

    .title {
      margin-bottom: 0.25em;
    }

    .details-icon {
      height: 1em;
      width: auto;
      margin: 0 0.1em;
    }
  }

  .nothing-wrapper {
    overflow-y: auto;
    background: $color5;
    border-color: $color1;

    &.projects {
      z-index: 10;
    }
  }

  .pending-image {
    width: 100%;
    height: 300px;
    margin: 0 auto;
  }

  .project-image {
    padding: 2em 0;
  }

  .todo-image {
    padding: 0 1em;
  }

  .project-list-toggler {
    position: absolute;
    top: 2%;
    display: none;
    background: $color3;
    padding: 0.5em;
    border: 2px solid $color5;
    border-radius: $little-radius;
    border-left: none;
    z-index: 100;

    img {
      width: 12px;
      height: auto;
    }
  }

  .visible-flex {
    display: flex !important;
  }
}

@media screen and (max-width: 1250px) {
  #full-view {
    grid-template-columns: 30% 1fr;
    grid-template-rows: 1fr 1fr;
    border: none;
  }

  #project-list {
    grid-row: 1;
    position: fixed;
    width: 30%;
    height: 100%;
  }

  #project-details,
  #todo-details,
  .nothing-wrapper {
    grid-column: 2 / -1;
    overflow-y: visible !important;
    width: 100%;
  }

  .nothing-wrapper {
    border-right: none;
    border-bottom: 0.5rem solid $color1-dark;
  }
}

@media screen and (max-width: 750px) {
  #full-view {
    grid-template-columns: 1fr;

    #project-list {
      display: none;
    }

    .project-list-toggler {
      display: block;
    }
  }
}
</style>
