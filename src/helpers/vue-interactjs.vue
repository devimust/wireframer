<template>
  <div
    :style="styleDimensions(widget)"
    :data-x="widget.x"
    :data-y="widget.y"
    :data-w="widget.w"
    :data-h="widget.h"
  >
    <slot></slot>
  </div>
</template>

<script>

  import interact from 'interactjs'

  export default {
    props: {
      widget: Object,
      minw: {
        type: Number,
        default: 0,
        validator: function (val) {
          return val > 0
        }
      },
      minh: {
        type: Number,
        default: 0,
        validator: function (val) {
          return val > 0
        }
      },
      maxw: {
        type: Number,
        default: 20000,
        validator: function (val) {
          return val > 0
        }
      },
      maxh: {
        type: Number,
        default: 20000,
        validator: function (val) {
          return val > 0
        }
      },
    },

    mounted () {
      const vm = this

      interact(this.$el)
        .draggable({
          onstart: function (event) {
            console.log('start');
            vm.$emit('onstart', vm.widget)
          },
          onmove: function (event) {
            console.log('move');
            var target = event.target,
                // keep the dragged position in the data-x/data-y attributes
                x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

            // translate the element
            target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

            // update the posiion attributes
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);

          },
          onend: function (event) {
            console.log('end');
            var target = event.target,
                x = (parseFloat(target.getAttribute('data-x')) || 0),
                y = (parseFloat(target.getAttribute('data-y')) || 0);

            vm.widget.y = y
            vm.widget.x = x

            vm.$store.dispatch('updateWidgetDimensions', vm.widget)
          },
          restrict: {
            restriction: 'parent',
            elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
          },
        })
        .resizable({
          // resize from all edges and corners
          edges: { left: false, right: true, bottom: true, top: false },

          // keep the edges inside the parent
          restrictEdges: {
            outer: 'parent',
            endOnly: true,
          },

          // minimum size
          restrictSize: {
            min: { width: vm.minw, height: vm.minh },
            max: { width: vm.maxw, height: vm.maxh },
          },

          inertia: true,
        })
        .on('resizemove', function (event) {
          var target = event.target,
              x = (parseFloat(target.getAttribute('data-x')) || 0),
              y = (parseFloat(target.getAttribute('data-y')) || 0);

          // update the element's style
          target.style.width  = event.rect.width + 'px';
          target.style.height = event.rect.height + 'px';

          // translate when resizing from top or left edges
          x += event.deltaRect.left;
          y += event.deltaRect.top;

          target.style.webkitTransform = target.style.transform =
              'translate(' + x + 'px,' + y + 'px)';

          target.setAttribute('data-x', x);
          target.setAttribute('data-y', y);
          target.setAttribute('data-w', Math.round(event.rect.width));
          target.setAttribute('data-h', Math.round(event.rect.height));
        })
        .on('resizeend', function (event) {
          var target = event.target,
              x = (parseFloat(target.getAttribute('data-x')) || 0),
              y = (parseFloat(target.getAttribute('data-y')) || 0),
              w = (parseFloat(target.getAttribute('data-w')) || 0),
              h = (parseFloat(target.getAttribute('data-h')) || 0);

          vm.widget.y = y
          vm.widget.x = x
          vm.widget.w = w
          vm.widget.h = h

          vm.$store.dispatch('updateWidgetDimensions', vm.widget)
        })
    },

    methods: {
      styleDimensions (widget) {
        const obj = {
          left: 0,
          top: 0,
          width: widget.w + 'px',
          height: widget.h + 'px',
          transform: 'translate(' + widget.x + 'px, ' + widget.y + 'px)',
          zIndex: widget.z
        }
        return obj
      }
    }
  }
</script>
