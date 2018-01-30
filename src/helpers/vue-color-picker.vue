<template>
  <ul>
    <li
      v-for="color in colors"
      :key="color.name"
      :style="{ 'background-color': '#' + color.rgb }"
      @click="clickColor(color)">
      &nbsp;
    </li>
  </ul>
</template>

<script>

  import VueEditable from '../helpers/vue-editable.vue'

  export default {
    props: [],

    data () {
      return {
        colors: [{
          name: 'Black',
          rgb: '000000',
        },{
          name: 'Green',
          rgb: '7bd148',
        },{
          name: 'Bold blue',
          rgb: '5484ed'
        },{
          name: 'Blue',
          rgb: 'a4bdfc'
        },{
          name: 'Turquoise',
          rgb: '46d6db'
        },{
          name: 'Light green',
          rgb: '7ae7bf'
        },{
          name: 'Bold green',
          rgb: '51b749'
        },{
          name: 'Yellow',
          rgb: 'fbd75b'
        },{
          name: 'Orange',
          rgb: 'ffb878'
        },{
          name: 'Red',
          rgb: 'ff887c'
        },{
          name: 'Bold red',
          rgb: 'dc2127'
        },{
          name: 'Purple',
          rgb: 'dbadff'
        },{
          name: 'Gray',
          rgb: 'e1e1e1'
        },{
          name: 'White',
          rgb: 'ffffff',
        }]
      }
    },

    methods: {
      clickColor (val) {
        this.$emit('changed', val.rgb)
      }
    }
  }

</script>

<style scoped>

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-right: 2px;
    position: relative;
    cursor: pointer;
    -moz-border-radius: 8px;
    -webkit-border-radius: 8px;
    border-radius: 8px;
  }

</style>
