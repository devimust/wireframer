<template>
  <vue-interactjs
    :widget=widget
    :minw="100"
    :minh="30"
  >
    <div class="outer">
      <div class="inner"
        :style="imageStyle"
        :class="{'image-placeholder': widget.l == ''}"
      ></div>
    </div>
  </vue-interactjs>
</template>

<script>

  import VueInteractjs from '../../helpers/vue-interactjs'

  export default {
    props: [ 'widget' ],

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
      'vue-interactjs': VueInteractjs
    }
  }

</script>

<style lang=scss scoped>

  .outer {
    width: 100%;
    height: 100%;

    .inner {
      width: 100%;
      height: 100%;
    }
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
