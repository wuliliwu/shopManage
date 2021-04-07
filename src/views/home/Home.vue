<template>
    <div>
<!--      总订单-->
      <orders></orders>
<!--      待办事项-->
      <dai-ban></dai-ban>

<!--      统计的图表-->
      <tong-ji></tong-ji>
    </div>
</template>

<script>
  import {request} from "../../utils/request";
  import DaiBan from "./components/DaiBan";
  import Orders from "./components/Orders";
  import TongJi from "./components/TongJi";
  export default {
    name: "Home",
    components:{
      Orders,DaiBan,TongJi
    },
    mounted() {

    },

  }
</script>

<style scoped>

</style>
