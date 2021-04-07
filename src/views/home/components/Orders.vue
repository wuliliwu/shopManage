<template>
  <div class="pindex">
    <el-row>
      <el-col :span="8" v-for="i in dingdanArr" :key="i.id">
        <div class="list-box">
          <div class="list-l">
            <img :src="i.img" />
          </div>
          <div class="list-r">
            <span>{{i.name}}</span>
            <span>{{i.count}}</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "Orders",
    data() {
      return {
        dingdanArr: [
          {
            id: 1,
            name: "今日订单总量",
            img: require("assets/images/home_order.png"),
            count: 200
          },
          {
            id: 2,
            name: "今日销售总额",
            img: require("assets/images/home_order.png"),
            count: "￥5000"
          },
          {
            id: 3,
            name: "昨日销售总额",
            img: require("assets/images/home_order.png"),
            count: "￥3000"
          }
        ],
      }
    }
  }
</script>

<style scoped lang="less">
  .list-box {
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 0 30px;
    margin: 10px;
    box-sizing: border-box;
    height: 100px;
    display: flex;
    box-shadow: 0px 4px 2px rgba(194, 187, 187, 0.62);
    align-items: center;
    justify-content: left;
    transition: all .3s;
    img{
      height: 60px;
    }
    &:hover {
      background-color: rgba(246, 246, 246, 0.4);
      cursor: pointer;
    }
  }
  .list-r {
    text-align: left;
    margin-left: 20px;
  }
  .list-r span {
    font-size: 16px;
    display: block;
    line-height: 24px;
    &:last-child {
      font-weight: 800;
    }
  }

</style>
