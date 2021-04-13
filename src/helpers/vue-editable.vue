<template>
  <input type="text"
    ref="name"
    @input="debounceInput"
    />
</template>

<script>
  import debounce from 'lodash/debounce'

  export default {
    props: [
      'content',
      'page'
    ],

    mounted () {
      this.$refs.name.value = this.content
    },

    methods: {
      debounceInput: debounce(function (e) {
        this.$emit('changed', this.page, e.target.value);
      }, 200),
    }
  }
</script>
