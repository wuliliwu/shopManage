<template>
<div class="goodsattr">
  <div style="display: flex;justify-content: space-between">
    <h4 style="text-align: left;border-bottom: 1px solid #ccc;padding: 10px 0">
      <i class="el-icon-edit-outline"></i>
      商品类型数据列表</h4>
    <el-button size="primary">添加</el-button>
  </div>
  <el-table

    :data="proCate"

    style="width: 100%;text-align: center">
    <!--    商品标号-->
    <el-table-column
      label="编号"
      min-width="40px">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="类型名称"
      min-width="40px">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="属性数量 "
      min-width="40px">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.attribute_count }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="参数数量"
      min-width="40px">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.param_count }}</span>
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
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="queryInfo.pageNum"
    :page-sizes="[3,6]"
    :page-size="3"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
  </el-pagination>


<!--  编辑商品信息的对话框-->
  <el-dialog
    title="修改商品分类信息"
    :visible.sync="EditdialogVisible"
    width="50%">
            <span>
               <el-form :model="editForm" ref="editFormRef" label-width="70px" >
                  <el-form-item label="商品名称">
                    <el-input v-model="editForm.name"></el-input>
                  </el-form-item>
                    <el-form-item label="属性数量">
                    <el-input v-model="editForm.attribute_count"></el-input>

                  </el-form-item><el-form-item label="参数数量" >
                    <el-input v-model="editForm.params_count"></el-input>
                  </el-form-item>
                </el-form>
            </span>
    <span slot="footer" class="dialog-footer">
        <el-button @click="EditdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureEditTable()" >确 定</el-button>
  </span>
  </el-dialog>
</div>
</template>

<script>
  import {productAttr,editAttr} from "utils/getgoods";
  export default {
    name: "goodsAttr",
    data() {
      return {
        proCate:[],
        queryInfo:{
          pageSize:3,
          pageNum:1

        },
        total:0,
        EditdialogVisible:false,
        editForm:{
          name:'',//名称
          attribute_count:0,//属性数量
          params_count:0 //参数数量
        }
      }
    },
    mounted() {
      this.getDate()
    },
    methods:{
      getDate(){
       return productAttr(this.queryInfo).then((res)=> {
         // console.log(res)
         this.proCate = res.data
         this.total = res.total
        })
      },
      handleSizeChange(num) {
        // console.log(num)
        this.queryInfo.pageSize = num
        this.queryInfo.pageNum = 1
        this.getDate()
      },
      handleCurrentChange(num) {
        // console.log(num)
        this.queryInfo.pageNum = num
        this.getDate()
      },
      handleEdit(index,item) {
        this.EditdialogVisible=true
        this.editForm.name = item.name
        this.editForm.attribute_count = item.attribute_count
        this.editForm.params_count = item.param_count
      },
      sureEditTable() {
        // 发送修改的网络请求
        editAttr(this.editForm).then((res)=> {
          console.log(res)
          this.EditdialogVisible=false
          this.getDate()

        })
      }

    }

  }
</script>

<style scoped>
  .el-pagination {
    margin-top: 20px;
  }
</style>
