<template>
  <vue-interactjs
    :widget="widget"
    :minw="160"
    :minh="40"
  >
    <div v-if="widget" class="search" :style="{ backgroundColor: widget.bc || '#fff' }">
      <i class="material-icons">search</i>
      <input type="text" :placeholder="widget.t || 'Search'" />
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
  .search {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 10px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    box-sizing: border-box;
    i {
      font-size: 18px;
      color: #6b7280;
    }
    input {
      border: none;
      outline: none;
      flex: 1;
      font-size: 14px;
    }
  }
</style>
