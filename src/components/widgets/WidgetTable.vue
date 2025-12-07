<template>
  <vue-interactjs
    :widget="widget"
    :minw="180"
    :minh="120"
  >
    <div v-if="widget" class="table-wrap">
      <table>
        <tbody>
          <tr v-for="(row, index) in widget.d" :key="index">
            <th v-if="index === 0">{{ row.n }}</th>
            <td v-else>{{ row.n }}</td>
            <th v-if="index === 0">{{ row.c }}</th>
            <td v-else>{{ row.c }}</td>
          </tr>
        </tbody>
      </table>
    </div>
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
  .table-wrap {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #fff;
    border: 1px solid #e1e1e1;
    table {
      width: 100%;
      height: 100%;
      border-collapse: collapse;
      table-layout: fixed;
    }
    th, td {
      padding: 8px;
      border: 1px solid #e1e1e1;
      font-size: 12px;
      text-align: left;
      word-break: break-word;
    }
    th {
      background: #fafafa;
      font-weight: 600;
    }
  }
</style>
