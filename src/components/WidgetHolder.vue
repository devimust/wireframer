<template>
  <div>
    <div class="widget-outer"
      @click.prevent="clickOuterContainer">
    </div>

    <vue-draggable-resizable id="widget-holder" v-if="activePage"
      class="widget-holder-container"
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
      <div class="widget-holder">
        <widget-button class="draggable-item"
          v-for="widget in widgets('button')"
          :class="{selected: activeWidget && widget.id == activeWidget.id}"
          :widget="widget" :key="activePage.id + '-' + widget.id"
        ></widget-button>

        <widget-checkbox class="draggable-item"
          v-for="widget in widgets('checkbox')"
          :class="{selected: activeWidget && widget.id == activeWidget.id}"
          :widget="widget" :key="activePage.id + '-' + widget.id"
        ></widget-checkbox>

        <widget-dropdown class="draggable-item"
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
        ></widget-mobile>
      </div>

      <div class="canvas-dimensions">{{ displayCanvasWidth }} x {{ displayCanvasHeight }}</div>

      <div class="canvas-page-name">{{ activePage.name }}</div>
    </vue-draggable-resizable>
  </div>
</template>

<script>

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

    methods: {
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

      widgets (type) {
        var widgets = []

        if (this.activePage) {
          for (var i=0; i<this.activePage.widgets.length; i++) {
            const widget = this.activePage.widgets[i]

            if (widget.type == type) {
              widgets.push(this.activePage.widgets[i])
            }
          }
        }

        return widgets
      },

      clickOuterContainer () {
        this.$store.dispatch('setActiveWidget', null)
      }
    },

    computed: {
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

  .widget-outer {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
  }

  .widget-holder-container {
    margin: 0 auto;
    width: 600px;
    height: 800px;
    position: relative !important;
    margin-top: 40px;

    .widget-holder {
      border: 1px solid #d1d1d1;
      background: white url(../assets/paper.png);
      -webkit-box-shadow: 0 0 10px #bebebe;
      -moz-box-shadow: 0 0 10px #bebebe;
      box-shadow: 0 0 10px #bebebe;
      width: 100%;
      height: 100%;
      position: absolute;
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
