<template>
  <vue-interactjs
    :widget="widget"
    :minw="140"
    :minh="140"
  >
    <div v-if="widget" class="container-box" :style="{ backgroundColor: widget.bc || '#f9f9f9' }">
      <div class="label">Container</div>
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
  .container-box {
    width: 100%;
    height: 100%;
    border: 2px dashed #c7c7c7;
    border-radius: 6px;
    position: relative;
    background: rgba(245, 245, 245, 0.6);
    .label {
      position: absolute;
      top: 6px;
      right: 6px;
      background: #fff;
      border: 1px solid #dedede;
      border-radius: 4px;
      padding: 2px 6px;
      font-size: 10px;
      color: #666;
    }
  }
</style>
