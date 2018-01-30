<template>
  <vue-draggable-resizable
    :x=widget.x
    :y=widget.y
    :w=widget.w
    :h=widget.h
    :z=widget.z
    :minw="100"
    :minh="32"
    :maxw="800"
    :maxh="800"
    :grid=[2,2]
    :handles="['ml','mr']"
    @resizestop="resizestop"
    @dragstop="dragstop"
    @activated="activated"
    @deactivated="deactivated"
    :parent="true"
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

  .inner {
    padding: 0;
    height: 24px;
    border:solid 3px rgba(15, 13, 13, 0.89);
  }

  .inner i {
    transform: rotate(90deg);
    position: relative;
    top: -2px;
  }

  .inner span {
    background-color: #1f1f1f;
    position: relative;
    width: 22px;
    display: inline-block;
    height: 100%;
    margin-left: 10px;
  }

</style>
