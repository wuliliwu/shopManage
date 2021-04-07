<template>
    <div class="goodslist">
      <good-search></good-search>
      <goods-table></goods-table>
    </div>
</template>

<script>
  import GoodSearch from "./goodslist/GoodSearch";
  import goodsTable from "./goodslist/goodsTable";
  export default {
    name: "GoodsList",
    components:{
      GoodSearch,
      goodsTable
    },

  }
</script>

<style scoped>

</style>
