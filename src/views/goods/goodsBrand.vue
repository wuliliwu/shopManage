<template>
  <div class="goodsbrand">

    <div style="display: flex;justify-content: space-between;padding: 0 20px;margin-bottom: 20px">
      <h4 style="text-align: left;border-bottom: 1px solid #ccc;padding: 10px 0">
        <i class="el-icon-edit-outline"></i>
        商品品牌管理页面</h4>
      <el-button size="primary">添加</el-button>
    </div>

    <!--        卡片-->
    <el-card class="box-card" >

      <!--        用户列表区-->

      <el-table :data="brandList"  stripe border >
        <el-table-column label="选择" width="50px">
          <el-checkbox label="" name="type"></el-checkbox>
        </el-table-column>
        <el-table-column label="编号" prop="id"></el-table-column>
        <el-table-column label="品牌名称" prop="name"></el-table-column>
        <el-table-column label="品牌首字母" prop="first_letter"></el-table-column>
        <el-table-column label="排序" prop="sort"></el-table-column>
        <el-table-column label="品牌制造商" prop="factory_status">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.factory_status"
              @change="">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="是否显示" prop="show_type">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.show_type"
              @change="">
            </el-switch>
          </template>
        </el-table-column>

        <el-table-column label="相关">
          <template slot-scope="scope">
          <p>商品: <span style="color: #00a0e9">{{scope.row.product_comment_count}}</span></p>
          <p>评价: <span style="color: #00a0e9">{{scope.row.product_comment_count}}</span></p>
            </template>
        </el-table-column>
        <el-table-column label="操作" prop="" width="200px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>

        <!--            分页区域-->
      </el-table>

      <el-pagination
        style="margin-top: 20px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum"
        :page-sizes="[3,6]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>

    </el-card>
  </div>
</template>

<script>
  import {brandManage} from "utils/getgoods";

  export default {
    name: "goodsBrand",
    data()  {
      return{
        brandList :[],
        queryInfo:{
          pageSize:6,
          pageNum:1

        },
        total:0
      }
    },
    mounted() {
      this.getData()
    },
    methods:{
      getData(){
        return brandManage(this.queryInfo).then(res =>{
          console.log(res)
          this.brandList = res.data
          this.total = res.total
        })
      },
      handleSizeChange(num) {
        console.log(num)
        this.queryInfo.pageSize = num
        this.queryInfo.pageNum = 1
        this.getData()
      },
      handleCurrentChange(num) {
        console.log(num)
        this.queryInfo.pageNum = num
        this.getData()
      },
    }
  }
</script>

<style scoped>

</style>
