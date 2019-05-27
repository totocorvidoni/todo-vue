<template>
  <div id="full-view">
    <div id="projects">projects</div>
    <div id="todos">todos</div>
    <div id="todo">todo</div>
  </div>
</template>

<script>
export default {
  name: "full-view"
};
</script>

<style lang="scss">
#full-view {
  display: grid;
  grid-template-columns: 1fr 2fr 2fr;
  height: 100%;
  #projects {
  }

  #todos {
    background: $color5;
  }

  #todo {
    background: $color5;
  }
}
</style>
