<template>
  <div id="quick-view">
    <div class="logo">
      <img src="@/assets/logo.svg" alt="A Gothic letter T">
    </div>
    <h1 class="title">THOU SHALL DO</h1>
    <p class="subtitle">I needed a larger title (I also needed a subtitle)</p>
    <div class="creators">
      <add-button @addClick="onAddProjectClick">Add Project</add-button>
      <add-button @addClick="onAddTodoClick">Add Todo</add-button>
    </div>
    <main id="project">
      <div class="title-wrapper">
        <h2>Project title</h2>
      </div>
      <div class="todos">
        <ul>
          <li>Todo</li>
          <li>Todo</li>
          <li>Todo</li>
          <li>Todo</li>
          <li>Todo</li>
        </ul>
      </div>
    </main>
    <router-link :to="{ name: 'full' }" class="button go-full">Full View</router-link>
  </div>
</template>

<script>
import AddButton from "@/components/AddButton.vue";

export default {
  name: "quick-view",
  components: {
    AddButton
  },
  methods: {
    onAddProjectClick() {
      console.log("a click has happend on project");
    },

    onAddTodoClick() {
      console.log("a click has happend on todo");
    }
  }
};
</script>

<style lang="scss">
#quick-view {
  display: grid;
  grid-gap: 1rem;
  justify-items: center;
  grid-template-rows: auto auto auto auto 1fr auto;
  color: $color5;
  padding: 4rem 0 2rem;
  height: 100%;

  .logo {
    background: $color1-dark;
    border-radius: 50%;
    padding: 2rem;
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

    .title-wrapper {
      background: $color1-dark;
      border-top-left-radius: $regular-radius;
      border-top-right-radius: $regular-radius;
      padding: 0.5em 2em;
      text-transform: uppercase;
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
    padding: $button;
    text-decoration: none;
    text-transform: uppercase;
  }
}
</style>
