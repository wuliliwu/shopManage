<template>
<div class="daiban">
  <el-col :span="24">
    <div class="grid-content bg-purple-dark">
      待处理事务
    </div>
  </el-col>
  <el-row :gutter="24">
    <el-col :span="8"><div class="grid-content bg-purple">
      <span class="left">待未付款订单</span>
      <span class="right">(10)</span>
    </div></el-col>
    <el-col :span="8"><div class="grid-content bg-purple">
      <span class="left">待未付款订单</span>
      <span class="right">(10)</span>
    </div></el-col>
    <el-col :span="8"><div class="grid-content bg-purple">
      <span class="left">待未付款订单</span>
      <span class="right">(10)</span>
    </div></el-col>
    <el-col :span="8"><div class="grid-content bg-purple">
      <span class="left">待未付款订单</span>
      <span class="right">(10)</span>
    </div></el-col>
    <el-col :span="8"><div class="grid-content bg-purple">
      <span class="left">待未付款订单</span>
      <span class="right">(10)</span>
    </div></el-col>
    <el-col :span="8"><div class="grid-content bg-purple">
      <span class="left">待未付款订单</span>
      <span class="right">(10)</span>
    </div></el-col>


  </el-row>
</div>
</template>

<script>
  export default {
    name: "daiban"
  }
</script>

<style scoped lang="less">

  .daiban{
    padding: 10px;
  }
  .el-row {
  padding: 0 10px;

  &:last-child {
     margin-bottom: 0;
   }
  }
  .grid-content.bg-purple-dark{
    background-color: #eeeeee;
    line-height: 40px;
    border: none;
    color: #666666;
    font-weight: 800;
    padding: 0 10px;

  }

  .el-col {
    border-radius: 4px;
    line-height: 36px;
    text-align: left;
    font-size: 14px;

    .left{
      float: left;
    }
    .right
    {
      float: right;
      color: red;
    }
  }
  .bg-purple-dark {
    /*background: #99a9bf;*/
    border-bottom: 1px solid #ccc;
  }
  .bg-purple {
    border-bottom: 1px solid #ccc;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    min-height: 36px;
  }
  .row-bg {

    background-color: #f9fafc;
  }
</style>
