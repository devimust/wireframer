<template>
  <vue-draggable-resizable
    :x=widget.x
    :y=widget.y
    :w=widget.w
    :h=widget.h
    :z=widget.z
    :minw="100"
    :minh="30"
    :maxw="800"
    :maxh="800"
    @resizestop="resizestop"
    @dragstop="dragstop"
    @activated="activated"
    @deactivated="deactivated"
    :parent="true"
  >
    <div class="outer"
      :style="{backgroundColor: widget.bc}">
      <div class="inner"></div>

      <div class="button-holder">
        <div class="button"></div>
      </div>
    </div>
  </vue-draggable-resizable>
</template>

<script>

  import VueDraggableResizable from '../../helpers/vue-draggable-resizable'

  export default {
    props: [ 'widget' ],

    methods: {
      activated: function(e) {
        this.$store.dispatch('setActiveWidget', this.widget)
      },
      deactivated: function(e) {
        // this.$store.dispatch('setActiveWidget', null)
      },
      resizestop: function(x, y, w, h) {
        this.widget.y = y
        this.widget.x = x
        this.widget.w = w
        this.widget.h = h

        this.$store.dispatch('updateWidgetDimensions', this.widget)
      },
      dragstop: function(x, y) {
        this.widget.y = y
        this.widget.x = x

        this.$store.dispatch('updateWidgetDimensions', this.widget)
      }
    },
    components: {
      'vue-draggable-resizable': VueDraggableResizable
    }
  }

</script>

<style scoped>

  .outer {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 20px 20px 20px 20px;
    -moz-border-radius: 20px 20px 20px 20px;
    -webkit-border-radius: 20px 20px 20px 20px;
    border: solid 3px rgba(15, 13, 13, 0.89);
    padding: 20px 15px 45px 15px;
  }

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

</style>
