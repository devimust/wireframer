<template>
  <vue-interactjs
    :widget=widget
    :minw="100"
    :minh="30"
    class="outer"
  >
    <div class="inner"
      :style="{backgroundColor: widget.bc, textAlign: widget.a}"
    >{{ widget.t }}</div>
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
    padding: 0;
    margin: 0;

    .inner {
      display: table-cell;
      vertical-align: middle;
      text-align: center;
      font-family: 'Delius', serif;
      font-size: 18px;
      line-height: 2px;
      padding: 0 10px 0 10px;
      border-radius: 8px 8px 8px 8px;
      -moz-border-radius: 8px 8px 8px 8px;
      -webkit-border-radius: 8px 8px 8px 8px;
      border:solid 3px rgba(15, 13, 13, 0.89);
    }
  }

</style>
