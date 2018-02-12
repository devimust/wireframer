<template>
  <vue-interactjs
    :widget=widget
    :minw="100"
    :minh="30"
  >
    <div class="outer">
      <div class="inner">
        <span :style="{color: widget.c, textAlign: widget.a}">{{ widget.t }}</span>

        <div :style="{backgroundColor: widget.bc}"></div>
      </div>
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
    display: table;
    width: 100%;
    height: 100%;

    .inner {
      padding: 10px;
      display: table-cell;
      vertical-align: middle;
      text-align: center;
      font-family: 'Delius', serif;
      font-size: 18px;
      line-height: 2px;
      padding: 0;

      span {
        display: block;
        height: 14px;
      }

      div {
        height: 30px;
        border:solid 3px rgba(15, 13, 13, 0.89);
      }
    }
  }

</style>
