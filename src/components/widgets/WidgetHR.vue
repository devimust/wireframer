<template>
  <vue-interactjs
    :widget=widget
    :minw="100"
    :minh="30"
  >
    <div class="outer">
      <div class="inner">
        <div class="hr" :style="{borderTopColor: widget.c}">
        </div>
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
      height: 10px;
      display: table-cell;
      vertical-align: middle;

      .hr {
        border-top: 4px solid black;
      }
    }
  }

</style>
