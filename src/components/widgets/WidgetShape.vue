<template>
  <vue-interactjs
    :widget=widget
    :minw="100"
    :minh="30"
  >
    <div class="outer">
      <div class="inner"
        :style="{backgroundColor: widget.bc}"
        :class="widget.s"
      ></div>
    </div>
  </vue-interactjs>
</template>

<script>

  import VueInteractjs from '../../helpers/vue-interactjs'

  export default {
    props: [ 'widget' ],

    components: {
      'vue-interactjs': VueInteractjs
    }
  }

</script>

<style lang=scss scoped>

  .outer {
    width: 100%;
    height: 100%;

    .inner {
      width: 100%;
      height: 100%;
    }
  }

  .circle {
    border-radius: 50%;
  }

</style>
