<script>
export default {
  props: {
    href: {
      type: String,
      default: '',
    },
    noBorder: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<template>
  <div class="example-wrapper" :class="{ 'example-wrapper--no-border': noBorder }">
    <slot />
    <a :href="href" title="Full Source" class="example-wrapper__icon" target="_blank" rel="nofollow noopener" v-if="href">
      <img src="" />
    </a>
  </div>
</template>

<style lang="scss">
.example-wrapper {
  position: relative;
  user-select: none;
  padding-top: 3%;
  padding-bottom: 3%;

  &--no-border {
    border: none;
  }

  &__icon {
    opacity: 0.5;
    position: absolute;
    top: 0;
    right: -32px;
    height: 16px;
    display: flex;
    cursor: pointer;
    transition: 0.5s;

    &:hover {
      opacity: 1;
    }

    @media screen and (max-width: 1090px) {
      right: -24px;
    }
  }
}
</style>