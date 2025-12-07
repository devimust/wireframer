<template>
  <vue-interactjs
    :widget="widget"
    :minw="140"
    :minh="40"
  >
    <div v-if="widget" class="tooltip" :style="styleObject">
      {{ widget.t }}
    </div>
  </vue-interactjs>
</template>

<script>
  import VueInteractjs from '../../helpers/vue-interactjs'

  export default {
    props: ['widget'],
    computed: {
      styleObject () {
        const color = this.widget && this.widget.c ? this.widget.c : '#fff'
        const bg = this.widget && this.widget.bc ? this.widget.bc : '#111'
        return {
          backgroundColor: color,
          color: bg,
          borderColor: color,
          boxShadow: '0 3px 10px rgba(0,0,0,0.25)'
        }
      }
    },
    components: { 'vue-interactjs': VueInteractjs }
  }
</script>

<style scoped lang="scss">
  .tooltip {
    width: 100%;
    height: 100%;
    border: 1px solid rgba(0,0,0,0.35);
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    border-radius: 4px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px 8px;
    box-sizing: border-box;
    text-align: center;
    min-width: 120px;
    min-height: 40px;
    opacity: 1;
  }
</style>
