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
    <div class="outer">
      <div class="inner browser"
        :style="{backgroundColor: widget.bc, textAlign: widget.a}"
      >
        <div class="top-bar">
            <div class="url" data-attribute="text">{{widget.t}}</div>
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

  .inner {
    padding: 10px;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    font-family: 'Delius', serif;
    font-size: 18px;
    line-height: 2px;
    padding: 0;
    border: solid 3px rgba(15, 13, 13, 0.89);
    position: relative;
  }

  .browser {
    border: solid 3px rgba(15, 13, 13, 0.89);
  }

  .top-bar {
    display: table-cell;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    border-bottom: solid 3px rgba(15, 13, 13, 0.89);
  }

  .top-bar .url {
    width: 60%;
    height: 40px;
    margin: 0 auto;

    margin-top: 4px;
    text-align: left;
    font-weight: normal;

    border: 3px solid #383838;
    border-radius: 5px;
    top: 5px;
    position: relative;
    padding: 15px 0 0 15px;
  }

</style>
