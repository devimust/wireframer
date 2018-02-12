<template>
  <vue-interactjs
    :widget=widget
    :minw="100"
    :minh="30"
  >
    <div v-if="widget" class="outer" v-for="(item, index) in widget.d" :key="index">
      <div class="inner"
        :style="{textAlign: widget.a}"
      >
        <i class="material-icons">{{ item.c ? 'radio_button_checked' : 'radio_button_unchecked' }} </i>

        <span>{{ item.n }}</span>
      </div>
    </div>
  </vue-interactjs>
</template>

<script>

  import VueInteractjs from '../../helpers/vue-interactjs'

  export default {
    props: [ 'widget' ],

    components: {
      'vue-interactjs': VueInteractjs
    }
  }

</script>

<style lang=scss scoped>

  .outer {
    display: table;
    width: 100%;
    height: 100%;

  .inner {
      padding: 10px;
      display: table-cell;
      vertical-align: middle;
      text-align: center;
      font-family: 'Delius', serif;
      font-size: 18px;
      line-height: 2px;
      padding: 0;

      span {
        position: relative;
        top: -6px;
      }
    }
  }

</style>
