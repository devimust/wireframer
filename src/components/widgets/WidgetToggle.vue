<template>
  <vue-interactjs
    :widget="widget"
    :minw="60"
    :minh="30"
  >
    <div
      v-if="widget"
      class="toggle"
      :style="toggleStyle">
      <div class="thumb" :style="thumbStyle"></div>
    </div>
  </vue-interactjs>
</template>

<script>
  import VueInteractjs from '../../helpers/vue-interactjs'

  export default {
    props: ['widget'],
    components: { 'vue-interactjs': VueInteractjs },

    computed: {
      isOn () {
        return !!(this.widget && this.widget.d && this.widget.d[0] && this.widget.d[0].c)
      },
      toggleStyle () {
        const onColor = (this.widget && this.widget.c) || '#34d399'
        const offColor = (this.widget && this.widget.bc) || '#e5e7eb'
        const bg = this.isOn ? onColor : offColor
        const border = this.isOn ? onColor : '#d1d5db'
        return {
          background: bg,
          borderColor: border
        }
      },
      thumbStyle () {
        const offset = 3
        const thumbWidth = 26
        const left = this.isOn ? `calc(100% - ${thumbWidth + offset + 1}px)` : `${offset}px`
        return {
          left,
          background: '#fff'
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .toggle {
    position: relative;
    width: 100%;
    height: 100%;
    max-height: 36px;
    border-radius: 999px;
    background: #e5e7eb;
    border: 1px solid #d1d5db;
    transition: background 0.2s ease;
    .thumb {
      position: absolute;
      top: 3px;
      left: 3px;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: #fff;
      box-shadow: 0 1px 3px rgba(0,0,0,0.25);
      transition: transform 0.2s ease;
    }
  }
</style>
