<template>
  <div id="app" class="container-fluid">
    <app-side-selector></app-side-selector>
    <app-widget-holder></app-widget-holder>
    <app-side-properties></app-side-properties>
  </div>
</template>

<script>

  import SideSelector from './components/SideSelector.vue'
  import WidgetHolder from './components/WidgetHolder.vue'
  import SideProperties from './components/SideProperties.vue'

  export default {
    name: 'app',

    created () {
      this.$store.dispatch('loadPagesFromLocalStorage')
    },

    components: {
      'app-side-selector': SideSelector,
      'app-widget-holder': WidgetHolder,
      'app-side-properties': SideProperties
    }
  }

</script>

<style lang="scss">

  @import './styles/_vars.scss';

  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    font-size: 62.5%;
  }

  body {
    margin: 0;
    padding: 0;
    // font-family: 'Delius', cursive;
    font-family: 'Roboto', sans-serif;
    font-size: 1.4rem;
  }

</style>
