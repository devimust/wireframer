<template>
  <div class="main"
    :style="customStyles()"
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

        x{{widget.name}}x
  </div>
</template>

<script>

  // import VueDraggableResizable from '../../helpers/vue-draggable-resizable'
  import dragNdrop from 'npm-dragndrop'

  export default {
    props: [ 'widget' ],

    mounted () {

      var vm = this
      dragNdrop({
      // element to be dragged (DOM element)
        element: this.$el,
        customStyles: false,
        useTransform: false,
        // element: this.$el,
        // constraints (false / 'x' / 'y' / DOM element)
        constraints: document.getElementById('widget-holder'),
        callback: function(event) {

          console.log(event)


          console.log(event.element.offsetLeft, event.element.offsetTop)
          vm.widget.y = event.element.offsetTop
          vm.widget.x = event.element.offsetLeft
          vm.$store.dispatch('updateWidgetDimensions', vm.widget)

      //     this.widget.y = y
      // this.widget.x = x

// event.element.style.left = "200px"
// div.style.top = "200px";
// div.style.left = "200px";


          // var parentLeft = document.getElementById('widget-holder').getBoundingClientRect().left
          // var childLeft = event.element.getBoundingClientRect().left
          // var widgetLeft = childLeft - parentLeft
          // console.log('left: ', widgetLeft);
        }
      })
    },


    methods: {

      customStyles () {

        const obj = {
          left: this.widget.x + 'px',
          top: this.widget.y + 'px',
          width: this.widget.w + 'px',
          height: this.widget.h + 'px',
          // width: '100px',
          // height: '100px',
          // zIndex: this.widget.z + 'px'
        }

        console.log(obj)

        return obj
      },
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
      // 'vue-draggable-resizable': VueDraggableResizable
    }
  }

</script>

<style scoped>


  .main {
    /* left: 20px;
    top: 20px;
    width: 100px;
    height: 100px; */
    background-color: green;
  }

  /* .outer {
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
    border-radius: 8px 8px 8px 8px;
    -moz-border-radius: 8px 8px 8px 8px;
    -webkit-border-radius: 8px 8px 8px 8px;
    border:solid 3px rgba(15, 13, 13, 0.89);
  } */

</style>
