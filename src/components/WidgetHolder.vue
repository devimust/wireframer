<template>


    <div id="widget-holder" v-if="activePage"
      class="widget-holder-container widget-holder"
      :draggable=false
      :x=0
      :y=0
      :w=containerCanvasWidth
      :h=containerCanvasHeight
      :minw="400"
      :minh="400"
      :maxw="4000"
      :maxh="4000"
      :handles="['mr', 'bm']"
      @resizestop="canvasResizeStop"
      @resizing="canvasResizing"
      @activated="clickactivated"
      @deactivated="clickdeactivated"
    >
      {{ widgets }}
      <component class="draggable-item"
        v-for="(widget, index) in widgets"
        :key="index"
        :widget="widget"
        :is="widget.name"
      >
      </component>

      <!-- <div id="btn1" class="btnx">a</div>
      <div id="btn2" class="btnx">b</div> -->

      <!-- <div class="widget-holder" id="holder1"> -->
        <!-- <widget-button class="draggable-item"
          v-for="widget in widgets('button')"
          :class="{selected: activeWidget && widget.id == activeWidget.id}"
          :widget="widget" :key="activePage.id + '-' + widget.id"
          @click="clickme"
        ></widget-button>

        <widget-checkbox class="draggable-item"
          v-for="widget in widgets('checkbox')"
          :class="{selected: activeWidget && widget.id == activeWidget.id}"
          :widget="widget" :key="activePage.id + '-' + widget.id"
        ></widget-checkbox> -->

        <!-- <widget-dropdown class="draggable-item"
          v-for="widget in widgets('dropdown')"
          :class="{selected: activeWidget && widget.id == activeWidget.id}"
          :widget="widget" :key="activePage.id + '-' + widget.id"
        ></widget-dropdown>

        <widget-scrollbar class="draggable-item"
          v-for="widget in widgets('scrollbar')"
          :class="{selected: activeWidget && widget.id == activeWidget.id}"
          :widget="widget" :key="activePage.id + '-' + widget.id"
        ></widget-scrollbar>

        <widget-radio class="draggable-item"
          v-for="widget in widgets('radio')"
          :class="{selected: activeWidget && widget.id == activeWidget.id}"
          :widget="widget" :key="activePage.id + '-' + widget.id"
        ></widget-radio>

        <widget-list class="draggable-item"
          v-for="widget in widgets('list')"
          :class="{selected: activeWidget && widget.id == activeWidget.id}"
          :widget="widget" :key="activePage.id + '-' + widget.id"
        ></widget-list>

        <widget-input class="draggable-item"
          v-for="widget in widgets('input')"
          :class="{selected: activeWidget && widget.id == activeWidget.id}"
          :widget="widget" :key="activePage.id + '-' + widget.id"
        ></widget-input>

        <widget-hr class="draggable-item"
          v-for="widget in widgets('hr')"
          :class="{selected: activeWidget && widget.id == activeWidget.id}"
          :widget="widget" :key="activePage.id + '-' + widget.id"
        ></widget-hr>

        <widget-heading class="draggable-item"
          v-for="widget in widgets('heading')"
          :class="{selected: activeWidget && widget.id == activeWidget.id}"
          :widget="widget" :key="activePage.id + '-' + widget.id"
        ></widget-heading>

        <widget-label class="draggable-item"
          v-for="widget in widgets('label')"
          :class="{selected: activeWidget && widget.id == activeWidget.id}"
          :widget="widget" :key="activePage.id + '-' + widget.id"
        ></widget-label>

        <widget-image class="draggable-item"
          v-for="widget in widgets('image')"
          :class="{selected: activeWidget && widget.id == activeWidget.id}"
          :widget="widget" :key="activePage.id + '-' + widget.id"
        ></widget-image>

        <widget-shape class="draggable-item"
          v-for="widget in widgets('shape')"
          :class="{selected: activeWidget && widget.id == activeWidget.id}"
          :widget="widget" :key="activePage.id + '-' + widget.id"
        ></widget-shape>

        <widget-browser class="draggable-item"
            v-for="widget in widgets('browser')"
          :class="{selected: activeWidget && widget.id == activeWidget.id}"
          :widget="widget" :key="activePage.id + '-' + widget.id"
        ></widget-browser>

        <widget-mobile class="draggable-item"
          v-for="widget in widgets('mobile')"
          :class="{selected: activeWidget && widget.id == activeWidget.id}"
          :widget="widget" :key="activePage.id + '-' + widget.id"
        ></widget-mobile> -->
      <!-- </div> -->

      <div class="canvas-dimensions">{{ displayCanvasWidth }} x {{ displayCanvasHeight }}</div>

      <div class="canvas-page-name">{{ activePage.name }}</div>
    </div>
</template>

<script>

  import dragNdrop from 'npm-dragndrop'

  import VueDraggableResizable from '../helpers/vue-draggable-resizable'
  import WidgetButton from './widgets/WidgetButton.vue'
  import WidgetCheckbox from './widgets/WidgetCheckbox.vue'
  import WidgetDropdown from './widgets/WidgetDropdown.vue'
  import WidgetScrollbar from './widgets/WidgetScrollbar.vue'
  import WidgetRadio from './widgets/WidgetRadio.vue'
  import WidgetList from './widgets/WidgetList.vue'
  import WidgetInput from './widgets/WidgetInput.vue'
  import WidgetHR from './widgets/WidgetHR.vue'
  import WidgetHeading from './widgets/WidgetHeading.vue'
  import WidgetLabel from './widgets/WidgetLabel.vue'
  import WidgetImage from './widgets/WidgetImage.vue'
  import WidgetShape from './widgets/WidgetShape.vue'
  import WidgetBrowser from './widgets/WidgetBrowser.vue'
  import WidgetMobile from './widgets/WidgetMobile.vue'

  export default {
    data () {
      return {
        displayCanvasWidth: 0,
        displayCanvasHeight: 0,
        containerCanvasWidth: 400,
        containerCanvasHeight: 400
      }
    },

    mounted () {
      console.log('in here...')

      // console.log(this.$el)
      // dragNdrop({
      //   // element to be dragged (DOM element)
      //   element: document.getElementById('main-btn')
      // })

      // var vm = this

      var elementList = document.querySelectorAll('.draggable-item');

      // Iterate through each element in the array
      for (var i = 0; i < elementList.length; i++) {
        //Create the MouseDown, MouseUp, and MouseMove events for the element
        var ele = elementList[i];
        console.log(ele)

//         dragNdrop({
//         // element to be dragged (DOM element)
//           element: ele,
//           customStyles: false,
//           useTransform: false,
//           // element: this.$el,
//           // constraints (false / 'x' / 'y' / DOM element)
//           constraints: document.getElementById('widget-holder'),
//           callback: function(event) {
//             console.log(event)


//             this.widget.y = y
//         this.widget.x = x

// event.element.style.left = "200px"
// // div.style.top = "200px";
// // div.style.left = "200px";


//             // var parentLeft = document.getElementById('widget-holder').getBoundingClientRect().left
//             // var childLeft = event.element.getBoundingClientRect().left
//             // var widgetLeft = childLeft - parentLeft
//             // console.log('left: ', widgetLeft);
//           }
//         })
          // ele.onmousedown = slide_MouseDown;
          // ele.onmouseup = slide_MouseUp;
          // ele.onmousemove = slide_MouseMove;

          // //Create the Click event just to see if it's working
          // ele.onclick = slide_MouseClick;
      }


      // dragNdrop({
      // // element to be dragged (DOM element)
      //   element: document.getElementById('btn1'),
      //   customStyles: false,
      //   // element: this.$el,
      //   // constraints (false / 'x' / 'y' / DOM element)
      //   constraints: document.getElementById('widget-holder'),
      //   callback: function(event) {
      //     console.log(event)
      //     var parentLeft = document.getElementById('widget-holder').getBoundingClientRect().left
      //     var childLeft = event.element.getBoundingClientRect().left
      //     var widgetLeft = childLeft - parentLeft
      //     console.log('left: ', widgetLeft);
      //   }
      // })
    },


    methods: {

      clickme () {
        console.log('hey')
      },

      updateWidgetDrag (item) {
        this.$store.dispatch('updateItem', item)
      },

      updateWidgetResize (data) {
        this.items.find( (item) => {
          if (item.id === data.id) {
            item.width = data.width;
            item.height = data.height;
          }
        });
      },

      canvasResizing (x, y, w, h) {
        this.displayCanvasWidth = w
        this.displayCanvasHeight = h
      },

      canvasResizeStop (x, y, w, h) {
        this.$store.dispatch('updatePageCanvasSize', {
          width: w,
          height: h
        });

        this.displayCanvasWidth = w
        this.displayCanvasHeight = h
      },

      clickactivated () {
        // console.log('WidgetHolder: clickactivated()')
      },

      clickdeactivated () {
        // console.log('WidgetHolder: clickdeactivated()')
      },



      clickOuterContainer () {
        this.$store.dispatch('setActiveWidget', null)
      }
    },

    computed: {

widgets () {
        var widgets = []

        if (this.activePage) {
          for (var i=0; i<this.activePage.widgets.length; i++) {
            const widget = this.activePage.widgets[i]

            widget.name="widget-button"
console.log('added')
            // if (widget.type == type) {
              widgets.push(this.activePage.widgets[i])
            // }
          }
        }

        return widgets
      },

      activePage () {
        const page = this.$store.getters.activePage

        if (!page) {
          return null
        }

        this.containerCanvasWidth = page.w
        this.containerCanvasHeight = page.h

        return page
      },

      activeWidget () {
        const widget = this.$store.getters.activeWidget

        if (!widget) {
          return null
        }

        return widget
      }
    },

    components: {
      'widget-button': WidgetButton,
      'widget-checkbox': WidgetCheckbox,
      'widget-dropdown': WidgetDropdown,
      'widget-scrollbar': WidgetScrollbar,
      'widget-radio': WidgetRadio,
      'widget-list': WidgetList,
      'widget-input': WidgetInput,
      'widget-hr': WidgetHR,
      'widget-heading': WidgetHeading,
      'widget-label': WidgetLabel,
      'widget-image': WidgetImage,
      'widget-shape': WidgetShape,
      'widget-browser': WidgetBrowser,
      'widget-mobile': WidgetMobile,
      'vue-draggable-resizable': VueDraggableResizable
    }
  }

</script>

<style lang=scss scoped>

  .widget-holder {
    margin: 50px 0 0 50px;
    border: 1px solid red;
    position: relative;
    display: block;
    width: 600px;
    height: 600px;
    /* background: white url(../assets/paper.png);
    -webkit-box-shadow: 0 0 10px #bebebe;
    -moz-box-shadow: 0 0 10px #bebebe;
    box-shadow: 0 0 10px #bebebe;
    width: 100%;
    height: 100%;
    position: relative; */

    /* .draggable-item {
      position: absolute;
      border: 1px dotted green;
    } */
  }

  /* .btnx {
    width: 100px;
    height: 100px;
    position: absolute;
  }

  #btn1 {
    background-color: green;
    left: 200px;
    top: 200px;
  }

  #btn2 {
    background-color: red;
    left: 50px;
    top: 50px;
  } */

  .xwidget-outer {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
  }

  .xwidget-holder-container {
    margin: 0 auto;
    width: 600px;
    height: 800px;
    position: relative !important;
    margin-top: 40px;

    .xwidget-holder {
      border: 1px solid #d1d1d1;
      background: white url(../assets/paper.png);
      -webkit-box-shadow: 0 0 10px #bebebe;
      -moz-box-shadow: 0 0 10px #bebebe;
      box-shadow: 0 0 10px #bebebe;
      width: 100%;
      height: 100%;
      position: relative;
    }

    .canvas-dimensions {
      position: absolute;
      left: 4px;
      bottom: 0;
      font-size: 10px;
      bottom: -18px;
      color: grey;
    }

    .canvas-page-name {
      position: absolute;
      right: 4px;
      bottom: 0;
      font-size: 10px;
      bottom: -18px;
      color: grey;
    }

    .selected {
      border: 4px dotted grey;
    }
  }

</style>
