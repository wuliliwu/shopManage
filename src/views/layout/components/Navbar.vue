<template>
<div class="navbar">
  <el-header>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        <i class="el-icon-s-operation"></i> 首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>

    </el-breadcrumb>

    <el-dropdown split-button >
      1
      <div class="touxiang">
        <img src="~assets/img/logo.png" alt="">

      </div>

      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>设置</el-dropdown-item>
        <el-dropdown-item>退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>



  </el-header>
</div>
</template>

<script>
  export default {
    name: "Navbar",
    data() {
      return {

      }
    }
  }
</script>

<style scoped lang="less">

  .touxiang {
    position: absolute;
    left: 10px;
    top: 4px;


  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
  }
  .el-dropdown {
    box-sizing: border-box;
    border: none;

    float: right;
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }

</style>
