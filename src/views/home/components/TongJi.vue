<template>
    <div class="tongji">
      <div class="left">

      </div>
      <div id="mychart" class="mychart">

      </div>
    </div>
</template>

<script>
  export default {
    name: "TongJi",
    data() {
      return {
        options : {
          xAxis: {
            type: 'category',
            data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }]
        }
      }
    },
    mounted() {
      this.drawLine()
    },
    methods:{
      // 绘制图表
      drawLine() {
        //1.初始化echarts实例
        //参数 ：节点信息
        let mychart = this.$echarts.init(document.getElementById("mychart"));
        //2.绘制图表
        mychart.setOption(this.options);
      }

    }
  }
</script>

<style scoped lang="less">

  .tongji{
    margin-top: 20px;
    width: 100%;
    height: 380px;
    .left {
      float: left;
      width: 15%;
      height: 100%;
      border: 1px solid #ccc;
    }
  }
  .mychart{
    float: left;
    vertical-align: bottom;
    width: 80%;
    height: 100%;
    padding: 0;
  }
</style>
