<template>
  <div id="quick-view">
    <header>
      <div class="logo">
        <img src="@/assets/logo-todo.svg" alt="A Gothic letter T">
      </div>
      <h1 class="main-title">THOU SHALL DO</h1>
      <p class="subtitle">Set your goals. Achive them. Pat yourself on the back.</p>
      <p class="to-author">
        Made by
        <a href="https://github.com/totocorvidoni">@TotoCorvidoni</a>.
      </p>
    </header>
    <div class="go-full">
      <router-link :to="{ name: 'full' }" class="button link">Full View</router-link>
    </div>
    <main id="project">
      <h2 class="title">{{ project.name }}</h2>
      <quick-todos/>
    </main>
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
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr auto;
  grid-column-gap: 5rem;
  grid-row-gap: 2rem;
  color: $color5;
  padding: 3rem;
  min-height: 700px;

  header {
    grid-row: 1 / -1;
    grid-column: 1;
    display: flex;
    flex-flow: column;
    text-align: center;
    margin-top: 3rem;
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
  }

  .subtitle {
    font-size: 1.5rem;
    font-weight: 300;
    font-style: italic;
    margin-top: -1rem;
  }
  .to-author {
    margin: 1em 0 2em;
    font-size: 1.2em;

    & > a {
      color: $color3;

      &:hover {
        filter: brightness(1.2);
      }
    }
  }

  #project {
    grid-row: span 2;
    justify-self: start;
    display: grid;
    grid-auto-flow: column;
    grid-template-rows: auto 1fr;
    border: 3px solid $color5;
    border-top-left-radius: $regular-radius;
    border-top-right-radius: $regular-radius;
    transition: $regular-ease;
    width: 70%;
    overflow-y: auto;

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
    }
  }

  .go-full {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
    justify-self: center;
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

@media screen and (max-width: 850px) {
  #quick-view {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    max-height: none;

    header {
      grid-row: 1;
      grid-column: 1;
    }

    #project {
      grid-row: 2;
      width: 100%;
    }

    .go-full {
      grid-row: 3;
    }
  }
}
</style>
 