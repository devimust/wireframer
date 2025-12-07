<template>
  <vue-interactjs
    :widget="widget"
    :minw="200"
    :minh="80"
  >
    <div v-if="widget" class="alert" :style="{ backgroundColor: widget.bc || '#fff8e1', color: widget.c || '#d97706' }">
      <i class="material-icons">error_outline</i>
      <div class="body">
        <strong>{{ widget.t }}</strong>
        <span>{{ widget.d && widget.d[0] ? widget.d[0].n : 'Details go here' }}</span>
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
  .alert {
    width: 100%;
    height: 100%;
    display: flex;
    gap: 8px;
    align-items: flex-start;
    padding: 10px;
    border-radius: 6px;
    border: 1px solid #facc15;
    box-sizing: border-box;
    i {
      font-size: 18px;
      margin-top: 2px;
    }
    .body {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 12px;
    }
  }
</style>
