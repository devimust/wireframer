<template>
  <vue-interactjs
    :widget="widget"
    :minw="120"
    :minh="30"
  >
    <div v-if="widget" class="hslider">
      <div class="track">
        <div class="fill"></div>
        <div class="thumb"></div>
      </div>
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
  .hslider {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .track {
      position: relative;
      width: 90%;
      height: 10px;
      background: #e5e7eb;
      border-radius: 8px;
    }
    .fill {
      position: absolute;
      left: 0;
      width: 50%;
      height: 100%;
      background: linear-gradient(90deg, #34d399, #10b981);
      border-radius: 8px;
    }
    .thumb {
      position: absolute;
      left: 50%;
      top: -6px;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: #fff;
      border: 1px solid #cbd5e1;
      box-shadow: 0 2px 4px rgba(0,0,0,0.15);
      transform: translateX(-50%);
    }
  }
</style>
