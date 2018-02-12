<template>
  <vue-interactjs
    :widget=widget
    :minw="100"
    :minh="30"
  >
    <div class="outer"
      :style="{backgroundColor: widget.bc}">
      <div class="inner"></div>

      <div class="button-holder">
        <div class="button"></div>
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
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 20px 20px 20px 20px;
    -moz-border-radius: 20px 20px 20px 20px;
    -webkit-border-radius: 20px 20px 20px 20px;
    border: solid 3px rgba(15, 13, 13, 0.89);
    padding: 20px 15px 45px 15px;

    .inner {
      border: solid 2px rgba(15, 13, 13, 0.89);
      width: 100%;
      height: 100%;
    }

    .button-holder {
      position: absolute;
      bottom: 15px;
      width: 100%;
      left: 0;
      height: 15px;
    }

    .button {
      margin: 0 auto;
      width: 80px;
      height: 100%;
      border-radius: 20px 20px 20px 20px;
      -moz-border-radius: 20px 20px 20px 20px;
      -webkit-border-radius: 20px 20px 20px 20px;
      border: solid 2px rgba(15, 13, 13, 0.89);
    }
  }

</style>
