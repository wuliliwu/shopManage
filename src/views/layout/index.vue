<template>
  <div class="all-home">
    <el-container>
      <el-aside width="200px">
        <slidebar></slidebar>
      </el-aside>
      <el-container>
        <el-header>
          <navbar></navbar>
        </el-header>
        <el-main>
<!--          <home></home>-->
<!--          在这里展示所有内容-->
          <router-view></router-view>

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import Slidebar from "./components/Slidebar";
  import Navbar from "./components/Navbar";

  export default {
    name: "index",
    components:{
      Slidebar,
      Navbar,

    }
  }
</script>

<style scoped>
.all-home {
  width: 100%;
  height: 100%;
}
.el-container {
  height: 100%;
}
.el-header {
  background-color: #fff;
  color: #333;
  height: 50px;
  line-height: 50px;
  border-bottom: 2px solid #e7e7e7;
  text-align: center;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  line-height: 50px;
}


.el-main {
  background-color: #fff;
  color: #333;
  text-align: center;
  /*line-height: 160px;*/
}

body > .el-container {
  margin-bottom: 40px;
}
</style>
