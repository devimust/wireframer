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
        <i class="material-icons float-right">arrow_drop_up</i>

        <i class="material-icons float-left">arrow_drop_down</i>

        <span class="left" style="{marginLeft: '50px'}">&nbsp;</span>
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

  .inner {
    padding: 0;
    height: 24px;
    border:solid 3px rgba(15, 13, 13, 0.89);

    i {
      transform: rotate(90deg);
      position: relative;
      top: -2px;
    }

    span {
      background-color: #1f1f1f;
      position: relative;
      width: 22px;
      display: inline-block;
      height: 100%;
      margin-left: 10px;
    }
  }

</style>
