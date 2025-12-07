<template>
  <div class="container" :style="{width: containerWidth + 'px' }">
    <div class="open-close">
      <i v-if="containerOpen" class="material-icons" @click="toggleContainerState">chevron_left</i>
      <i v-if="!containerOpen" class="material-icons" @click="toggleContainerState">chevron_right</i>
    </div>

    <div v-if="containerOpen" class="row">
      <div v-if="activePage" class="col-sm">
        <div v-for="menuItem in menuItems" :key="menuItem.name">
          <h2>{{ menuItem.name }}</h2>

          <ul>
            <li v-for="item in menuItem.items" :key="item.name" @click="createWidget(item.type)">
              <div class="icon-holder">
                <i v-if="item.iconName" class="material-icons">{{item.iconName}}</i>
                <span v-else :class="item.iconName" class="icon-text">{{ item.iconText }}</span>
              </div>

              <span class="icon-label">{{ item.label }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div v-else class="col-sm">
        <h2>select a page</h2>
      </div>
    </div>
    <div class="resize-handle" @mousedown.prevent="startResize"></div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        containerOpen: true,
        openWidth: 290,
        resizing: false,
        startX: 0,
        startWidth: 290,
        menuItems: [{
          name: 'form',
          items: [{
            iconName: 'check_circle',
            label: 'button',
            type: 'button'
          },{
            iconName: 'check_box',
            label: 'checkbox',
            type: 'checkbox'
          },{
            iconName: 'arrow_drop_down_circle',
            label: 'dropdown',
            type: 'dropdown'
          },{
            iconName: 'settings_ethernet',
            label: 'scrollbar',
            type: 'scrollbar'
          },{
            iconName: 'radio_button_checked',
            label: 'radio',
            type: 'radio'
          },{
            iconName: 'toggle_on',
            label: 'toggle',
            type: 'toggle'
          },{
            iconName: 'I',
            label: 'input',
            type: 'input'
          },{
            iconName: 'remove',
            label: 'hr',
            type: 'hr'
          },{
            iconName: 'swap_vert',
            label: 'v-slider',
            type: 'vslider'
          },{
            iconName: 'swap_horiz',
            label: 'h-slider',
            type: 'hslider'
          }]
        },{
          name: 'typography',
          items: [{
            iconName: 'H',
            label: 'heading',
            type: 'heading'
          },{
            iconName: 'T',
            label: 'label',
            type: 'label'
          },{
            iconName: 'notes',
            label: 'sub heading',
            type: 'subheading'
          },{
            iconName: 'notes',
            label: 'paragraph',
            type: 'paragraph'
          },{
            iconName: 'list',
            label: 'list',
            type: 'list'
          }]
        },{
          name: 'content',
          items: [{
            iconName: 'photo',
            label: 'image',
            type: 'image'
          },{
            iconName: 'lens',
            label: 'shape',
            type: 'shape'
          },{
            iconName: 'table_rows',
            label: 'table',
            type: 'table'
          },{
            iconName: 'calendar_month',
            label: 'calendar',
            type: 'calendar'
          }]
        },{
          name: 'other',
          items: [{
            iconName: 'computer',
            label: 'browser',
            type: 'browser'
          },{
            iconName: 'phone_android',
            label: 'mobile',
            type: 'mobile'
          },{
            iconName: 'tab',
            label: 'tabs',
            type: 'tabs'
          },{
            iconName: 'menu',
            label: 'navigation',
            type: 'navigation'
          },{
            iconName: 'crop_landscape',
            label: 'container',
            type: 'container'
          },{
            iconName: 'last_page',
            label: 'pagination',
            type: 'pagination'
          },{
            iconName: 'search',
            label: 'search',
            type: 'search'
          },{
            iconName: 'date_range',
            label: 'date picker',
            type: 'datepicker'
          },{
            iconName: 'radio_button_unchecked',
            label: 'round button',
            type: 'roundbutton'
          },{
            iconName: 'more_horiz',
            label: 'button bar',
            type: 'buttonbar'
          },{
            iconName: 'data_exploration',
            label: 'chart line',
            type: 'chartline'
          },{
            iconName: 'error',
            label: 'alert box',
            type: 'alertbox'
          },{
            iconName: 'info',
            label: 'popover',
            type: 'popover'
          },{
            iconName: 'tips_and_updates',
            label: 'tooltip',
            type: 'tooltip'
          },{
            iconName: 'linear_scale',
            label: 'progress',
            type: 'progressbar'
          },{
            iconName: 'star',
            label: 'icon',
            type: 'icon'
          }]
        }]
      }
    },

    computed: {
      containerWidth () {
        if (!this.containerOpen) {
          return 32
        }
        return this.openWidth
      },

      activePage () {
        return this.$store.getters.activePage
      }
    },

    methods: {
      createWidget (type) {
        var widget = {
          type: type
        }

        // if a container is active, set as parent and place at its top-left
        const active = this.$store.getters.activeWidget
        if (active && active.type === 'container') {
          widget.p = active.id
          widget.x = 10
          widget.y = 10
        }

        switch (type) {
          case 'button':
            Object.assign(widget, {
              w: 120,
              h: 40,
              bc: '#ffffff',
              t: 'button',
              a: 'center'
            });
            break;
          case 'checkbox':
            Object.assign(widget, {
              w: 140,
              h: 40,
              d: [{n: 'checbox', c: true}]
            });
            break;
          case 'dropdown':
            Object.assign(widget, {
              w: 160,
              h: 40,
              bc: '#ffffff',
              t: 'dropdown',
              a: 'left'
            });
            break;
          case 'scrollbar':
            Object.assign(widget, {
              w: 160,
              h: 32,
              bc: '#ffffff'
            });
            break;
          case 'radio':
            Object.assign(widget, {
              w: 140,
              h: 40,
              a: 'left',
              d: [{n: 'radio', c: true}]
            });
            break;
          case 'toggle':
            Object.assign(widget, {
              w: 80,
              h: 36,
              d: [{ n: 'on', c: true }]
            });
            break;
          case 'list':
            Object.assign(widget, {
              w: 140,
              h: 40,
              a: 'left',
              d: [{n: 'item 1'}, {n: 'item 2'}, {n: 'item 3'}]
            });
            break;
          case 'vslider':
            Object.assign(widget, {
              w: 40,
              h: 140,
              d: [{n: '50%'}]
            });
            break;
          case 'hslider':
            Object.assign(widget, {
              w: 180,
              h: 40,
              d: [{n: '50%'}]
            });
            break;
          case 'paragraph':
            Object.assign(widget, {
              w: 220,
              h: 120,
              a: 'left',
              t: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent varius.'
            });
            break;
          case 'input':
            Object.assign(widget, {
              w: 180,
              h: 40,
              t: 'Label',
              a: 'left',
              c: '#000000',
              bc: '#ffffff'
            });
            break;
          case 'hr':
            Object.assign(widget, {
              w: 180,
              h: 20,
              c: '#000000'
            });
            break;
          case 'heading':
            Object.assign(widget, {
              w: 180,
              h: 40,
              t: 'Heading',
              a: 'left',
              f: '28',
              c: '#000000'
            });
            break;
          case 'label':
            Object.assign(widget, {
              w: 100,
              h: 30,
              t: 'Label',
              a: 'left',
              c: '#000000',
              bc: 'auto'
            });
            break;
          case 'image':
            Object.assign(widget, {
              w: 100,
              h: 100,
              bc: '#ffffff',
              l: ''
            });
            break;
          case 'table':
            Object.assign(widget, {
              w: 260,
              h: 160,
              bc: '#ffffff',
              d: [
                { n: 'Header 1', c: 'Header 2' },
                { n: 'Row 1', c: 'Value 1' },
                { n: 'Row 2', c: 'Value 2' }
              ]
            });
            break;
          case 'shape':
            Object.assign(widget, {
              w: 200,
              h: 200,
              bc: '#e1e1e1',
              s: 'rectangle'
            });
            break;
          case 'browser':
            Object.assign(widget, {
              w: 300,
              h: 300,
              bc: '#ffffff',
              z: 0,
              t: 'http://'
            });
            break;
          case 'datepicker':
            Object.assign(widget, {
              w: 200,
              h: 50,
              bc: '#ffffff',
              t: '2024-01-01'
            });
            break;
          case 'mobile':
            Object.assign(widget, {
              w: 230,
              h: 340,
              bc: '#ffffff',
              z: 0
            });
            break;
          case 'calendar':
            Object.assign(widget, {
              w: 260,
              h: 220,
              bc: '#ffffff'
            });
            break;
          case 'search':
            Object.assign(widget, {
              w: 220,
              h: 44,
              bc: '#ffffff',
              t: 'Search'
            });
            break;
          case 'tabs':
            Object.assign(widget, {
              w: 240,
              h: 120,
              bc: '#ffffff',
              d: [{n: 'Tab 1'}, {n: 'Tab 2'}, {n: 'Tab 3'}]
            });
            break;
          case 'navigation':
            Object.assign(widget, {
              w: 180,
              h: 200,
              bc: '#ffffff',
              d: [{n: 'Home'}, {n: 'About'}, {n: 'Contact'}]
            });
            break;
          case 'container':
            Object.assign(widget, {
              w: 280,
              h: 200,
              bc: '#f5f5f5',
              z: 1
            });
            break;
          case 'pagination':
            Object.assign(widget, {
              w: 220,
              h: 60,
              bc: '#ffffff',
              d: [{n: 'Prev'}, {n: '1'}, {n: '2'}, {n: '3'}, {n: 'Next'}]
            });
            break;
          case 'roundbutton':
            Object.assign(widget, {
              w: 60,
              h: 60,
              bc: '#ff8a65',
              t: '+'
            });
            break;
          case 'buttonbar':
            Object.assign(widget, {
              w: 240,
              h: 60,
              bc: '#ffffff',
              d: [{n: 'One'}, {n: 'Two'}, {n: 'Three'}]
            });
            break;
          case 'progressbar':
            Object.assign(widget, {
              w: 240,
              h: 30,
              bc: '#ffffff',
              f: 40
            });
            break;
          case 'popover':
            Object.assign(widget, {
              w: 200,
              h: 120,
              bc: '#ffffff',
              t: 'Popover content'
            });
            break;
          case 'tooltip':
            Object.assign(widget, {
              w: 180,
              h: 60,
              bc: '#333333',
              c: '#ffffff',
              t: 'Tooltip text'
            });
            break;
          case 'chartline':
            Object.assign(widget, {
              w: 260,
              h: 140,
              bc: '#ffffff',
              d: [10, 30, 20, 40, 25, 50]
            });
            break;
          case 'alertbox':
            Object.assign(widget, {
              w: 260,
              h: 100,
              bc: '#fff8e1',
              c: '#d97706',
              t: 'Alert title',
              a: 'left'
            });
            break;
          case 'icon':
            Object.assign(widget, {
              w: 48,
              h: 48,
              c: '#333333',
              t: 'favorite'
            });
            break;
        }

        this.$store.dispatch('createWidget', widget)
      },

      toggleContainerState () {
        const containerState = !this.containerOpen
        this.containerOpen = containerState

        localStorage.setItem('sideSelectorState', containerState)
      },

      startResize (e) {
        if (!this.containerOpen) {
          return
        }
        this.resizing = true
        this.startX = e.clientX
        this.startWidth = this.openWidth
        window.addEventListener('mousemove', this.onResize)
        window.addEventListener('mouseup', this.stopResize)
      },

      onResize (e) {
        if (!this.resizing) {
          return
        }
        const dx = e.clientX - this.startX
        let next = this.startWidth + dx
        next = Math.min(Math.max(next, 200), 420)
        this.openWidth = next
        localStorage.setItem('sideSelectorWidth', next)
      },

      stopResize () {
        if (!this.resizing) {
          return
        }
        this.resizing = false
        window.removeEventListener('mousemove', this.onResize)
        window.removeEventListener('mouseup', this.stopResize)
      }
    },

    created () {
      const containerState = localStorage.getItem('sideSelectorState')

      if (!containerState) {
        // continue to width load attempt
      } else {
        this.containerOpen = JSON.parse(containerState)
      }

      const storedWidth = localStorage.getItem('sideSelectorWidth')
      if (storedWidth) {
        const width = parseInt(storedWidth)
        if (!isNaN(width)) {
          this.openWidth = width
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

  @use '../styles/vars' as *;
  @use '../styles/main';
  @use 'sass:color';

  .container {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    overflow-y: auto;
    background-color: $sidebar-background-color;
    z-index: 1000;
    color: $sidebar-color;
    padding-bottom: 40px;
    border-right: 1px solid color.adjust($sidebar-background-color, $lightness: -5%);
  }

  .open-close {
    position: absolute;
    top: 20px;
    right: 5px;
    color: $sidebar-color;
    z-index: 1;
    cursor: pointer;
  }

  .resize-handle {
    position: absolute;
    top: 0;
    right: 0;
    width: 8px;
    height: 100%;
    cursor: ew-resize;
    background: transparent;
  }

  .row {
    padding-top: 10px;
    padding-bottom: 20px;

    h2 {
      margin: 10px 0 15px 0;
    }

    ul {
      list-style: none;
      margin: 0;
      padding: 0;

      li {
        display: inline-block;
        text-align: center;
        width: 84px;
        margin: 0 2px 10px 0;
        padding: 15px 0 5px 0;
        min-height: 66px;
        position: relative;

        background-color: $sidebar-icon-background-color;
        border-radius: 5px;
        transform: scale(0.9);

        .icon-holder {
          height: 40px;
          font-size: 2.6rem;
          line-height: 2.8rem;
          color: $sidebar-icon-color-primary;

          .icon-text {
            font-style: italic;
            font-size: 2.6rem;
          }
        }

        &:hover {
          box-shadow: 0 0 8px $sidebar-icon-background-color-hover;
          cursor: pointer;
        }
      }
    }
  }

</style>
