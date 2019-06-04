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

html,
body {
  height: 100%;
  width: 100%;
}

body {
  background: $color1;
}

#app {
  height: 100%;
  font-family: $font-family;
}

// globals

ul {
  list-style-type: none;
}

a {
  color: $color1;
  text-decoration: none;
}

.button {
  border: none;
  transition: $quick-ease;
  user-select: none;

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

.remove {
  background: $color-bad;
  border: none;
  color: #fff;
  font-size: 0.8em;
  font-weight: 700;
  padding: $button-padding;
}

// Gives the impresion container is above and light comes from the left;
.above-left {
  border-right: 4px solid $color5;
  box-shadow: 15px 0px 10px -5px rgba($color: #000000, $alpha: 0.2);
}

.fade-enter-active,
.fade-leave-active {
  transition: $quick-ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-from-left-enter-active,
.slide-from-left-leave-active {
  transition: $fast-ease-both;
}

.slide-from-left-enter,
.slide-from-left-leave-to {
  transform: translateX(-100%);
}
</style>