<template>
  <vue-interactjs
    :widget=widget
    :minw="100"
    :minh="30"
  >
    <div v-if="widget" class="input-widget" :class="['label-' + labelPosition]" >
      <label v-if="showLabel" class="input-label" :style="labelStyle">{{ widget.t }}</label>
      <div class="input-field">
        <div class="input-outline" :style="outlineStyle"></div>
      </div>
      <div v-if="showSubtext" class="input-subtext">{{ widget.st || 'Helper text' }}</div>
    </div>
  </vue-interactjs>
</template>

<script>

  import VueInteractjs from '../../helpers/vue-interactjs'

  export default {
    props: [ 'widget' ],

    computed: {
      labelPosition () {
        return this.widget && this.widget.lp ? this.widget.lp : 'top'
      },
      showLabel () {
        return this.labelPosition !== 'none'
      },
      showSubtext () {
        return !!(this.widget && this.widget.ss)
      },
      labelStyle () {
        return {
          color: this.widget && this.widget.c ? this.widget.c : '#000',
          textAlign: this.widget && this.widget.a ? this.widget.a : 'left'
        }
      },
      outlineStyle () {
        return {
          backgroundColor: this.widget && this.widget.bc ? this.widget.bc : '#ffffff'
        }
      }
    },

    components: {
      'vue-interactjs': VueInteractjs
    }
  }

</script>

<style lang=scss scoped>

  .input-widget {
    width: 100%;
    height: 100%;
    display: grid;
    gap: 6px;
    box-sizing: border-box;
    padding: 0;
    grid-auto-rows: min-content 1fr min-content;
  }

  .input-label {
    font-size: 13px;
    line-height: 1.2;
    grid-area: label;
    word-break: break-word;
    min-width: 90px;
  }

  .input-field {
    grid-area: field;
    display: flex;
    align-items: center;
    padding: 2px 4px;
    box-sizing: border-box;
    border-radius: 4px;
    min-height: 40px;
    align-self: stretch;
  }

  .input-outline {
    width: 100%;
    height: 100%;
    border: 2px solid rgba(15, 13, 13, 0.6);
    border-radius: 4px;
    box-sizing: border-box;
  }

  .input-subtext {
    font-size: 11px;
    color: #4b5563;
    grid-area: subtext;
    line-height: 1.2;
    word-break: break-word;
  }

  .label-top {
    grid-template-areas:
      "label"
      "field"
      "subtext";
    grid-template-columns: 1fr;
  }

  .label-bottom {
    grid-template-areas:
      "field"
      "label"
      "subtext";
    grid-template-columns: 1fr;
  }

  .label-left {
    grid-template-areas:
      "label field"
      ". subtext";
    grid-template-columns: minmax(90px, auto) 1fr;
    grid-template-rows: minmax(40px, auto) auto;
    align-items: center;
  }

  .label-right {
    grid-template-areas:
      "field label"
      "field subtext";
    grid-template-columns: 1fr auto;
    grid-template-rows: minmax(40px, auto) auto;
    align-items: center;
  }

  .label-none {
    grid-template-areas:
      "field"
      "subtext";
    grid-template-columns: 1fr;
  }

</style>
