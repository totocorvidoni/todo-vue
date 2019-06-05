<template>
  <div id="quick-view">
    <main id="project">
      <h2 class="title">{{ project.name }}</h2>
      <quick-todos/>
    </main>
    <div class="go-full">
      <router-link :to="{ name: 'full' }" class="button link">Full View</router-link>
    </div>
    <header>
      <div class="logo">
        <img src="@/assets/logo-todo.svg" alt="A Gothic letter T">
      </div>
      <h1 class="main-title">THOU SHALL DO</h1>
      <p class="subtitle">I needed a larger title (I also needed a subtitle)</p>
    </header>
  </div>
</template>

<script>
import QuickTodos from "@/components/QuickTodos.vue";

export default {
  name: "quick-view",
  components: {
    QuickTodos
  },

  computed: {
    project() {
      return this.$store.getters.activeProject;
    }
  }
};
</script>

<style lang="scss">
#quick-view {
  display: grid;
  grid-gap: 1rem;
  justify-items: center;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: minmax(360px, 1fr) auto;
  color: $color5;
  padding: 2rem;
  height: 100%;

  header {
    grid-row: 1 / -1;
    grid-column: 2 / -1;
    align-self: center;
    display: flex;
    flex-flow: column;
    text-align: center;
  }

  .logo {
    background: $color1-dark;
    border-radius: $regular-radius;
    box-shadow: inset 0px 0px 5px 2px rgba(0, 0, 0, 0.2);
    padding: 1rem 0.25rem;
    margin: 0 auto;
    img {
      height: 250px;
      width: 250px;
    }
  }

  .main-title {
    font-size: 2.5rem;
    // margin: 0;
  }

  .subtitle {
    font-size: 1.5rem;
    font-weight: 300;
    font-style: italic;
    margin-top: -1rem;
    margin-bottom: 2rem;
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

    .title {
      display: grid;
      place-content: center;
      background: $color1-dark;
      border-top-left-radius: $regular-radius;
      border-top-right-radius: $regular-radius;
      line-height: 1.5em;
      padding: 0.5em 2em;
      text-align: center;
      width: 480px;
      height: 60px;
    }
  }

  .go-full {
    // grid-column: 2 / 3;
    background: $color1-dark;
    border-radius: $regular-radius;
    padding: 1em;

    .link {
      display: inline-block;
      background: $color5;

      border-radius: $regular-radius;
      font-size: 1.2em;
      font-weight: 700;
      padding: 0.5em 1em;
      line-height: 2em;
      text-transform: uppercase;
    }
  }
}
</style>
 