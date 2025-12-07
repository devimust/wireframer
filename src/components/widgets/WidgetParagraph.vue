<template>
  <vue-interactjs
    :widget="widget"
    :minw="120"
    :minh="80"
  >
    <div v-if="widget" class="paragraph"
      :style="{
        textAlign: widget.a,
        color: widget.c || '#333',
        backgroundColor: widget.bc || '#fdfdfd'
      }">
      <p>{{ widget.t }}</p>
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
  .paragraph {
    width: 100%;
    height: 100%;
    padding: 12px;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    line-height: 1.6;
    background-color: #fdfdfd;
    border: 1px dashed #d4d4d4;
    color: #333;
  }
</style>
