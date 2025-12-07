<template>
  <vue-interactjs
    :widget="widget"
    :minw="60"
    :minh="30"
  >
    <div v-if="widget" class="toggle" :class="{ on: widget.d && widget.d[0] && widget.d[0].c }">
      <div class="thumb"></div>
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
  .toggle {
    position: relative;
    width: 100%;
    height: 100%;
    max-height: 36px;
    border-radius: 999px;
    background: #e5e7eb;
    border: 1px solid #d1d5db;
    transition: background 0.2s ease;
    .thumb {
      position: absolute;
      top: 3px;
      left: 3px;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: #fff;
      box-shadow: 0 1px 3px rgba(0,0,0,0.25);
      transition: transform 0.2s ease;
    }
    &.on {
      background: #34d399;
      border-color: #10b981;
      .thumb { transform: translateX(28px); }
    }
  }
</style>
