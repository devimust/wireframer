<template>
  <vue-interactjs
    :widget="widget"
    :minw="50"
    :minh="50"
  >
    <div v-if="widget" class="round-btn" :style="{ backgroundColor: widget.bc || '#ff8a65', color: widget.c || '#fff' }">
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
  .round-btn {
    width: 100%;
    height: 100%;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 700;
    box-shadow: 0 3px 8px rgba(0,0,0,0.2);
  }
</style>
