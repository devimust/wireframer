<template>
  <vue-interactjs
    :widget="widget"
    :minw="180"
    :minh="50"
  >
    <div v-if="widget" class="pagination" :style="{ backgroundColor: widget.bc || '#fff' }">
      <button
        v-for="(item, index) in widget.d"
        :key="index"
        class="page-btn"
        :class="{ primary: index === 1 }">
        {{ item.n }}
      </button>
    </div>
  </vue-interactjs>
</template>

<script>
  import VueInteractjs from '../../helpers/vue-interactjs'

  export default {
    props: ['widget'],
    components: {
      'vue-interactjs': VueInteractjs
    }
  }
</script>

<style lang="scss" scoped>
  .pagination {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #e1e1e1;
    border-radius: 4px;
  }

  .page-btn {
    border: 1px solid #d4d4d4;
    background: #f7f7f7;
    border-radius: 4px;
    padding: 6px 10px;
    font-size: 12px;
    cursor: default;
    &.primary {
      background: #e5ecff;
      border-color: #c3d1ff;
      font-weight: 600;
    }
  }
</style>
