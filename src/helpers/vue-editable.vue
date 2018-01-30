<template>
  <input type="text"
    ref="name"
    @input="debounceInput"
    />
</template>

<script>
  import _ from 'lodash'

  export default {
    props: [
      'content',
      'page'
    ],

    mounted () {
      this.$refs.name.value = this.content
    },

    methods: {
      debounceInput: _.debounce(function (e) {
        this.$emit('changed', this.page, e.target.value);
      }, 200),
    }
  }
</script>
