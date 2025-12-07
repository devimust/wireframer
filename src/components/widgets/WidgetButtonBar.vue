<template>
  <vue-interactjs
    :widget="widget"
    :minw="180"
    :minh="50"
  >
    <div v-if="widget" class="button-bar" :style="{ backgroundColor: widget.bc || '#fff' }">
      <button v-for="(item, index) in widget.d" :key="index">{{ item.n }}</button>
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
  .button-bar {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px;
    box-sizing: border-box;
    button {
      border: 1px solid #d1d5db;
      background: #f8fafc;
      border-radius: 4px;
      padding: 6px 10px;
      font-size: 12px;
    }
  }
</style>
