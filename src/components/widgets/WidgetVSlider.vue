<template>
  <vue-interactjs
    :widget="widget"
    :minw="30"
    :minh="100"
  >
    <div v-if="widget" class="vslider">
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
  .vslider {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .track {
      position: relative;
      width: 10px;
      height: 90%;
      background: #e5e7eb;
      border-radius: 8px;
    }
    .fill {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 50%;
      background: linear-gradient(180deg, #60a5fa, #2563eb);
      border-radius: 8px;
    }
    .thumb {
      position: absolute;
      bottom: 50%;
      left: -6px;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: #fff;
      border: 1px solid #cbd5e1;
      box-shadow: 0 2px 4px rgba(0,0,0,0.15);
      transform: translateY(50%);
    }
  }
</style>
