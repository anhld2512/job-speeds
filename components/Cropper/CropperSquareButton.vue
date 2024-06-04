<template>
  <div class="square-button bg-white rounded-xl text-white front-bold text-lg border border-2 border-white" @click="$emit('click', $event)" v-bind="$attrs">
    <slot />
  </div>
</template>

<style lang="scss">
.square-button {
  background: rgba(black, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  width: 42px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background 0.5s;

  &:hover {
    background: black;
  }
}
</style>