<template>
  <vue-interactjs
    :widget="widget"
    :minw="180"
    :minh="80"
  >
    <div v-if="widget" class="tabs" :style="{ backgroundColor: widget.bc || '#fff' }">
      <div
        v-for="(tab, index) in widget.d"
        :key="index"
        class="tab"
        :class="{ active: index === 0 }"
      >
        {{ tab.n }}
      </div>
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
  .tabs {
    display: flex;
    height: 100%;
    align-items: flex-start;
    gap: 8px;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #e1e1e1;
    background: #fff;
  }

  .tab {
    padding: 8px 12px;
    border-radius: 4px 4px 0 0;
    border: 1px solid #d8d8d8;
    background: #f5f5f5;
    font-size: 12px;
    cursor: default;
    &.active {
      background: #ffffff;
      border-bottom-color: #ffffff;
      font-weight: 600;
    }
  }
</style>
