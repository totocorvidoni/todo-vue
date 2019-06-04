<template>
  <div id="quick-view">
    <div class="logo">
      <img src="@/assets/logo-todo.svg" alt="A Gothic letter T">
    </div>
    <h1 class="main-title">THOU SHALL DO</h1>
    <p class="subtitle">I needed a larger title (I also needed a subtitle)</p>
    <main id="project">
      <h2 class="title">Quick Todos</h2>
      <quick-todos/>
    </main>
    <router-link :to="{ name: 'full' }" class="button go-full">Full View</router-link>
  </div>
</template>

<script>
import QuickTodos from "@/components/QuickTodos.vue";

export default {
  name: "quick-view",
  components: {
    QuickTodos
  }
};
</script>

<style lang="scss">
#quick-view {
  display: grid;
  grid-gap: 1rem;
  justify-items: center;
  grid-template-rows: auto auto auto minmax(240px, 1fr) auto;
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

  .main-title {
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
 