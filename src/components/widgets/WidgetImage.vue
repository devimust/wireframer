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
        :style="imageStyle"
        :class="{'image-placeholder': widget.l == ''}"
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

    computed: {
      imageStyle: function () {
        var style = {};

        if (this.widget.l) {
          Object.assign(style, {
            'background-image': 'url(' + this.widget.l + ')',
            'background-repeat': 'no-repeat',
            'background-size': '100% 100%',
          })
        } else {
          Object.assign(style, {
            'border': 'solid 2px rgba(15, 13, 13, 0.89)',
            'backgroundColor': this.widget.bc
          })
        }

        return style
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

  /*
    credit @link https://stackoverflow.com/a/19848543
  */
  .image-placeholder {
    background:
       linear-gradient(to top left,
           rgba(0,0,0,0) 0%,
           rgba(0,0,0,0) calc(50% - 0.8px),
           rgba(0,0,0,1) 50%,
           rgba(0,0,0,0) calc(50% + 0.8px),
           rgba(0,0,0,0) 100%),
       linear-gradient(to top right,
           rgba(0,0,0,0) 0%,
           rgba(0,0,0,0) calc(50% - 0.8px),
           rgba(0,0,0,1) 50%,
           rgba(0,0,0,0) calc(50% + 0.8px),
           rgba(0,0,0,0) 100%);
  }

</style>
