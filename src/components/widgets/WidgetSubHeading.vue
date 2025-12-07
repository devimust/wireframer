<template>
  <vue-interactjs
    :widget="widget"
    :minw="120"
    :minh="30"
  >
    <div v-if="widget" class="subheading" :style="{ textAlign: widget.a || 'left', color: widget.c || '#222', fontSize: (widget.f || 18) + 'px' }">
      {{ widget.t }}
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
  .subheading {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    font-weight: 600;
    font-family: 'Roboto', sans-serif;
    text-align: left;
    box-sizing: border-box;
    padding: 4px;
  }
</style>
