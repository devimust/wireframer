<template>
  <vue-interactjs
    :widget="widget"
    :minw="140"
    :minh="140"
  >
    <nav v-if="widget" class="nav" :style="{ backgroundColor: widget.bc || '#fff' }">
      <a v-for="(item, index) in widget.d" :key="index" href="#">
        {{ item.n }}
      </a>
    </nav>
  </vue-interactjs>
</template>

<script>
  import VueInteractjs from '../../helpers/vue-interactjs'

  export default {
    props: ['widget'],
    components: {
      'vue-interactjs': VueInteractjs
    }
  }
</script>

<style lang="scss" scoped>
  .nav {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #e1e1e1;
    a {
      text-decoration: none;
      color: #222;
      padding: 8px 10px;
      border-radius: 4px;
      font-size: 13px;
      background: #f7f7f7;
      border: 1px solid #dcdcdc;
    }
  }
</style>
