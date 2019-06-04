<template>
  <div id="project-list" class="above-left">
    <h1 class="title">Projects</h1>
    <button class="add-project button" @click="onAddProjectClick" v-if="!addingProject">+</button>
    <form v-else @submit.prevent="onNewProjectSubmit">
      <input
        class="add-project new-project"
        type="text"
        name="new-project"
        v-model="newProjectName"
        ref="newProjectName"
      >
    </form>
    <ul>
      <li
        v-for="project in projects"
        :key="project.id"
        class="project-title button"
        :class="{ active: isActive(project.id) }"
      >
        <p @click="onProjectClick(project.id)">{{ project.name }}</p>
        <button class="button remove" @click="removeProject(project.id)">X</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "projects-list",
  data() {
    return {
      addingProject: false,
      newProjectName: ""
    };
  },

  methods: {
    isActive(id) {
      if (this.activeProject) {
        return this.activeProject.id == id;
      }
    },

    onAddProjectClick() {
      this.addingProject = true;
      this.$nextTick(() => {
        this.$refs.newProjectName.focus();
      });
    },

    onNewProjectSubmit() {
      if (this.newProjectName) {
        this.$store.dispatch("addProject", { name: this.newProjectName });
        this.newProjectName = "";
        this.addingProject = false;
      }
    },

    onProjectClick(id) {
      this.$store.dispatch("setActiveProject", id);
    },

    removeProject(id) {
      this.$store.dispatch("removeProject", id);
    }
  },

  computed: {
    ...mapGetters(["activeProject", "projects"]),
    projects() {
      return this.$store.state.projects;
    }
  }
};
</script>

<style lang="scss">
#project-list {
  background: $color1;
  overflow-y: auto;
  z-index: 1000;

  .title {
    background: $color1-dark;
    border-top-right-radius: 0.5rem;
    color: $color5;
    margin: 0;
    padding: 0.5em;
    text-align: center;
  }

  .add-project {
    display: block;
    background: $color1-dark;
    border: none;
    border-radius: $little-radius;
    color: $color3;
    font-size: 2.5rem;
    font-weight: 700;
    line-height: 1em;
    margin: 1rem auto 0;
    padding: 0.1em 0.3em;
  }

  .new-project {
    font-size: 1.2em;
    line-height: 2.5em;
    padding: 0 1em;
    transition: $quick-ease;

    &:focus {
      outline: none;
      box-shadow: $input-border;
    }
  }

  ul {
    background: $color1-dark;
    border-radius: $regular-radius;
    margin: 1rem;
    padding: 1em;
  }

  .project-title {
    display: flex;
    align-content: center;
    border: 2px solid $color5;
    border-radius: $regular-radius;
    color: $color5;
    font-weight: 700;
    margin-bottom: 5px;
    transition: $quick-ease;

    p {
      flex-grow: 2;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding: 0.5em 1em;
      margin: auto 0;
    }

    &:hover,
    &.active {
      background: $color5;
      color: $color1;
      transform: none;
    }

    &:hover {
      cursor: pointer;
    }
  }

  .remove {
    border-top-right-radius: $regular-radius;
    border-bottom-right-radius: $regular-radius;
    padding: 0 1em;

    &.button:active {
      transform: none;
    }
  }
}
</style>
