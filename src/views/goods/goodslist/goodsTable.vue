<template>
<div>
  <el-table

    :data="product"

    style="width: 100%;text-align: center">
<!--    商品标号-->
    <el-table-column
      label="编号"
    min-width="40px">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.brand_id }}</span>
      </template>
    </el-table-column>
<!--    商品图片-->
    <el-table-column
      label="商品图片"
    min-width="80px">
      <template slot-scope="scope">
        <span style="margin-left: 10px" class="pic"><img :src="scope.row.pic" alt=""></span>
      </template>
    </el-table-column>
<!--    商品名称-->
    <el-table-column
      label="商品名称"
      min-width="220px">
      <template slot-scope="scope">
        <span style="margin-left: 0px" class="brand-name">{{ scope.row.name }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="价格货号"
    min-width="120px">
      <template slot-scope="scope">
        <span style="margin-left: 10px;display: block;">价格:
        <span style="font-weight: bold;color: red">￥{{ scope.row.original_price }}</span></span>
        <span style="margin-left: 10px">货号:{{ scope.row.product_sn }}</span>

      </template>
    </el-table-column>

    <el-table-column
      label="标签">
      <template slot-scope="scope">
        <div>上架: {{scope.row.publish_status | showStatus}} </div>
        <div>新品: {{scope.row.new_status | showStatus}}  </div>
        <div>推荐: {{scope.row.recommand_status | showStatus}}  </div>
<!--        <span style="margin-left: 10px">{{ scope.row.brand_name }}</span>-->
      </template>
    </el-table-column>

    <el-table-column
      label="排序">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.sort }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="销量">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.sale }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="审核状态">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.verify_status ? "已审核" :'未审核' }}</span>
      </template>
    </el-table-column>


<!--    这是操作-->
    <el-table-column label="操作" width="200px" style="margin: 0">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    style="margin-top: 20px"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="queryInfo.pageNum"
    :page-sizes="[4,10,15]"
    :page-size="queryInfo.pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
  </el-pagination>
</div>
</template>
<script>
  import getGoods from "utils/getgoods";
  export default {
    name: "goodsTable",
    data() {
      return {
        product:[],
        queryInfo:{
          pageSize:4,
          pageNum:1
        },
        searchInfo:{

        },
        total:0,
      }
    },
    filters:{
      // 上架新品推荐状态显示
      showStatus(status) {
        return status?'是':'否'
      }
    },
    mounted() {
      this.getDate()
      this.$EventBus.$on('searchRes',res => {
        // console.log(res)
        this.product = res.product
        this.total = res.total
      })
    },
    methods:{
      getDate() {
        return getGoods((res) => {
          // console.log(res)
          this.product = res.product
          this.total = res.total
        },this.queryInfo)
      },
      searchDate() {
        return getGoods((res) => {
          // console.log(res)
          this.product = res.product
          this.total = res.total
        },this.searchInfo)
      },
      handleSizeChange(num){
        // 改变每页显是的条数
        console.log(num)
        this.queryInfo.pageSize = num
        this.queryInfo.pageNum = 1
        this.getDate()

      },
      handleCurrentChange(num) {
        console.log(num)
        this.queryInfo.pageNum = num
        // 重新获取数据
        this.getDate()
      },

    }
  }
</script>

<style scoped lang="less">

  .el-table {
    .el-popover {

      min-width: 100px;
      span {
        width: 100%;
        height: 100%;
        text-align: center;
      }

    }
    th {
      text-align: center;
    }
  }
  .pic img {
    width: 80px;

  }
  table td {
    border: 1px solid #ccc;
  }
  .has-gutter {
    margin: 0;
  }


</style>
