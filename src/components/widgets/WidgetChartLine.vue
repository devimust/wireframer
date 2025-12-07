<template>
  <vue-interactjs
    :widget="widget"
    :minw="200"
    :minh="120"
  >
    <div v-if="widget" class="chart" :style="{ backgroundColor: widget.bc || '#fff' }">
      <svg :viewBox="'0 0 100 50'" preserveAspectRatio="none">
        <polyline
          :points="points"
          fill="none"
          stroke="#3b82f6"
          stroke-width="2"
        />
      </svg>
    </div>
  </vue-interactjs>
</template>

<script>
  import VueInteractjs from '../../helpers/vue-interactjs'

  export default {
    props: ['widget'],
    computed: {
      points () {
        if (!this.widget || !Array.isArray(this.widget.d) || this.widget.d.length === 0) {
          return '0,50 100,50'
        }
        const max = Math.max(...this.widget.d)
        const min = Math.min(...this.widget.d)
        const span = Math.max(max - min, 1)
        const step = 100 / Math.max(this.widget.d.length - 1, 1)
        return this.widget.d.map((val, idx) => {
          const x = idx * step
          const y = 50 - ((val - min) / span) * 40 - 5
          return `${x},${y}`
        }).join(' ')
      }
    },
    components: { 'vue-interactjs': VueInteractjs }
  }
</script>

<style scoped lang="scss">
  .chart {
    width: 100%;
    height: 100%;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 6px;
    box-sizing: border-box;
  }
  svg {
    width: 100%;
    height: 100%;
  }
</style>
