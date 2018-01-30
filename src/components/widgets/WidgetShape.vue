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
    :grid=[10,10]
    @resizestop="resizestop"
    @dragstop="dragstop"
    @activated="activated"
    @deactivated="deactivated"
    :parent="true"
  >
    <div class="outer">
      <div class="inner"
        :style="{backgroundColor: widget.bc}"
        :class="widget.s"
      ></div>
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
    width: 100%;
    height: 100%;
  }

  .inner {
    width: 100%;
    height: 100%;
  }

  .circle {
    border-radius: 50%;
  }

</style>
