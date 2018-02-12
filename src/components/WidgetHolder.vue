<template>
    <div v-if="activePage" class="widget-holder bg-blocks"
      @click="setActiveWidget(null)"
      :style="styleDimensions"
    >
      <component class="widget-resize-drag"
        v-for="(widget, index) in widgets"
        :key="index"
        :widget="widget"
        :is="'widget-'+widget.type"
        :class="{selected: activeWidget && widget.id == activeWidget.id}"
        @click.native.stop="setActiveWidget(widget)"
      >
      </component>

      <div class="canvas-dimensions">{{ activePage.w }} x {{ activePage.h }}</div>

      <div class="canvas-page-name">{{ activePage.name }}</div>
    </div>
</template>

<script>

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
    methods: {
      setActiveWidget (widget) {
        this.$store.dispatch('setActiveWidget', widget)
      },
    },

    computed: {
      widgets () {
        var widgets = []

        if (!this.activePage) {
          return widgets
        }

        for (var i=0; i<this.activePage.widgets.length; i++) {
          widgets.push(this.activePage.widgets[i])
        }

        return widgets
      },

      styleDimensions () {
        const obj = {
          width: this.activePage.w + 'px',
          height: this.activePage.h + 'px'
        }
        return obj
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
      'widget-mobile': WidgetMobile
    }
  }

</script>

<style lang=scss scoped>

  @import '../styles/_main.scss';

  .bg-blocks {
    background-color: $canvas-background-color;
    background-image: linear-gradient(rgba(255,255,255,.3) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,.3) 2px, transparent 2px), linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent 1px);
    background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px;
    background-position: -2px -2px, -2px -2px, -1px -1px, -1px -1px;
  }

  .widget-holder {
    position: relative;
    display: block;
    width: 600px;
    height: 600px;
    margin: 0 auto;
    margin-top: 50px;
    -webkit-box-shadow: 0 0 10px #bebebe;
    -moz-box-shadow: 0 0 10px #bebebe;
    box-shadow: 0 0 10px #bebebe;

    .widget-resize-drag {
      position: absolute;
      box-sizing: border-box;
      left: 0;
      top: 0;
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
      border: 4px dotted $active-widget-border-color;
    }
  }

</style>
