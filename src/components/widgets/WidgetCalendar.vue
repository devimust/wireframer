<template>
  <vue-interactjs
    :widget="widget"
    :minw="200"
    :minh="180"
  >
    <div v-if="widget" class="calendar">
      <div class="header">Mon Tue Wed Thu Fri Sat Sun</div>
      <div class="grid">
        <span v-for="day in 28" :key="day">{{ day }}</span>
      </div>
    </div>
  </vue-interactjs>
</template>

<script>
  import VueInteractjs from '../../helpers/vue-interactjs'

  export default {
    props: ['widget'],
    components: { 'vue-interactjs': VueInteractjs }
  }
</script>

<style scoped lang="scss">
  .calendar {
    width: 100%;
    height: 100%;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    background: #fff;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    .header {
      padding: 8px;
      background: #f1f5f9;
      border-bottom: 1px solid #e5e7eb;
      text-align: center;
      word-spacing: 8px;
    }
    .grid {
      padding: 8px;
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 4px;
      span {
        display: block;
        padding: 6px 0;
        text-align: center;
        border-radius: 4px;
        background: #f8fafc;
        border: 1px solid #e5e7eb;
      }
    }
  }
</style>
