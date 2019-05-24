<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Nunito:300,300i,400,400i,700&display=swap&subset=latin-ext");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  height: 100vh;
  background: $color1;
}

#app {
  height: 100%;
  font-family: $font-family;
}

// globals

.button {
  border: none;
  transition: $quick-ease;

  &:active,
  &:focus {
    outline: none;
  }

  &:hover {
    cursor: pointer;
    filter: $little-light;
  }
  &:active {
    transform: $press;
    filter: $little-shadow;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: $quick-ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
