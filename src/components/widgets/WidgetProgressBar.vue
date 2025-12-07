<template>
  <vue-interactjs
    :widget="widget"
    :minw="160"
    :minh="24"
  >
    <div v-if="widget" class="progress" :style="{ backgroundColor: widget.bc || '#f1f5f9' }">
      <div class="fill" :style="{ width: (widget.f || 40) + '%'}"></div>
      <span class="label" :style="{ color: widget.c || '#0f172a' }">{{ widget.f || 40 }}%</span>
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
  .progress {
    width: 100%;
    height: 100%;
    border-radius: 6px;
    position: relative;
    overflow: hidden;
    border: 1px solid #e2e8f0;
    .fill {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      background: linear-gradient(90deg, #3b82f6, #2563eb);
      transition: width 0.2s ease;
    }
    .label {
      position: absolute;
      width: 100%;
      text-align: center;
      font-size: 11px;
      line-height: 24px;
      color: #0f172a;
      mix-blend-mode: difference;
    }
  }
</style>
