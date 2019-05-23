<template>
  <button class="button add-button" @click="$emit('addClick')">
    <div class="add">+</div>
    <p>
      <slot></slot>
    </p>
  </button>
</template>

<script>
export default {
  name: "add-button"
};
</script>

<style lang="scss">
.add-button {
  display: flex;
  padding: $button;
  background: $color5;
  color: $color1;
  border-radius: $little-radius;
  font-weight: normal;

  .add {
    font-weight: 700;
    margin-right: 2px;
  }
}
</style>
