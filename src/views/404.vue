<template>
<div class="notfound">
  <img src="~assets/images/404.png" alt="">
  <div>页面找不到咯,呜呜呜~~~~</div>
</div>
</template>

<script>
  export default {
    name: "404"
  }
</script>

<style scoped lang="less">
.notfound {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  img {
    width: 400px;
    margin-bottom: 100px;

  }
}
</style>
