<template>
  <vue-interactjs
    :widget="widget"
    :minw="32"
    :minh="32"
  >
    <div v-if="widget" class="icon" :style="{ color: widget.c || '#333' }">
      <i class="material-icons" :style="{ fontSize: (widget.f || 24) + 'px' }">{{ widget.t || 'star' }}</i>
    </div>
  </vue-interactjs>
</template>

<script>
  import VueInteractjs from '../../helpers/vue-interactjs'

  export default {
    props: ['widget'],
    components: { 'vue-interactjs': VueInteractjs }
  }
</script>

<style scoped lang="scss">
  .icon {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
