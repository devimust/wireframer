<template>
  <vue-interactjs
    :widget="widget"
    :minw="160"
    :minh="40"
  >
    <div v-if="widget" class="date-picker">
      <input type="date" :value="widget.t" />
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
  .date-picker {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    input {
      width: 100%;
      height: 34px;
      padding: 6px 10px;
      border: 1px solid #d1d5db;
      border-radius: 4px;
      font-size: 14px;
      box-sizing: border-box;
    }
  }
</style>
