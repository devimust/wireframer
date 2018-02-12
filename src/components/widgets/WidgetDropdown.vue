<template>
  <vue-interactjs
    :widget=widget
    :minw="100"
    :minh="30"
  >
    <div class="outer">
      <div class="inner clearfix"
        :style="{backgroundColor: widget.bc, textAlign: widget.a}"
      >
        <i class="material-icons float-right">arrow_drop_down</i>
        <span class="float-left">{{ widget.t }}</span>
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
      line-height: 20px;
      padding: 0;
      border-radius: 8px 8px 8px 8px;
      -moz-border-radius: 8px 8px 8px 8px;
      -webkit-border-radius: 8px 8px 8px 8px;
      border:solid 3px rgba(15, 13, 13, 0.89);

      span {
        margin: 2px 0 0 10px;
      }
    }
  }

</style>
