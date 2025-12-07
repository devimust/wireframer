<template>
  <vue-interactjs
    :widget="widget"
    :minw="160"
    :minh="80"
  >
    <div v-if="widget" class="popover" :style="{ backgroundColor: widget.bc || '#fff', color: widget.c || '#111' }">
      <div class="arrow"></div>
      <div class="content">{{ widget.t }}</div>
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
  .popover {
    position: relative;
    width: 100%;
    height: 100%;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 10px;
    box-sizing: border-box;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  }
  .arrow {
    position: absolute;
    top: -8px;
    left: 16px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid #e2e8f0;
  }
  .content {
    font-size: 12px;
  }
</style>
