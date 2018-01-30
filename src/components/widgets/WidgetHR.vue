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
    :handles="['ml','mr']"
    @resizestop="resizestop"
    @dragstop="dragstop"
    @activated="activated"
    @deactivated="deactivated"
    :parent="true"
  >
    <div class="outer">
      <div class="inner">
        <div class="hr" :style="{borderTopColor: widget.c}">
        </div>
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
    display: table;
    width: 100%;
    height: 100%;
  }

  .inxner {
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
  }

  .inner {
    height: 10px;
    display: table-cell;
    vertical-align: middle;
  }

  .hr {
    border-top: 4px solid black;
  }

</style>
