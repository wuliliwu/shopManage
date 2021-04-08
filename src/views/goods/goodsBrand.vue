<template>
  <div class="goodsbrand">

    <div style="display: flex;justify-content: space-between;padding: 0 20px;margin-bottom: 20px">
      <h4 style="text-align: left;border-bottom: 1px solid #ccc;padding: 10px 0">
        <i class="el-icon-edit-outline"></i>
        商品品牌管理页面</h4>
      <el-button size="primary" @click="">添加</el-button>
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
              @click="editBrand(scope.row.id)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>

        <!--            分页区域-->
      </el-table>

<!--      分页-->
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
<!--      修改品牌类型-->

      <el-dialog
        title="修改品牌类型信息"
        :visible.sync="showBrandDialog"
        ref="addAttrDia"
        width="40%"
      class="dailog">
            <span>
               <el-form :model="brandFrom" ref="editFormRef" label-width="70px" >
                 <el-form-item label="品牌名称">
                    <el-input v-model="brandFrom.name"></el-input>
                  </el-form-item>

                 <el-form-item label="品牌首字母">
                    <el-input v-model="brandFrom.first_letter"></el-input>
                  </el-form-item>
                    <el-form-item label="品牌LOGO">
                    <el-input v-model="brandFrom.logo"></el-input>
                  </el-form-item>   <el-form-item label="品牌专区大图">
                    <el-input v-model="brandFrom.big_pic"></el-input>
                  </el-form-item>   <el-form-item label="品牌故事">
                    <el-input v-model="brandFrom.brand_story"></el-input>
                  </el-form-item>   <el-form-item label="排序">
                    <el-input v-model="brandFrom.sort"></el-input>
                  </el-form-item>
                    <el-form-item label="是否显示">
                    <el-input v-model="brandFrom.show_status">
                      <el-radio label="1">是</el-radio>
                      <el-radio label="0">否</el-radio>
                    </el-input>
                  </el-form-item>
                 <el-form-item label="品牌制造商">
                    <el-input v-model="brandFrom.factory_status">
                      <el-radio label="1">是</el-radio>
                      <el-radio label="0">否</el-radio>
                    </el-input>
                  </el-form-item>

                </el-form>
            </span>
        <span slot="footer" class="dialog-footer">
        <el-button @click="showBrandDialog=false">取 消</el-button>
        <el-button type="primary" @click="sureEditbrand" >确 定</el-button>
  </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
  import {brandManage,editBrand,getOneBrand} from "utils/getgoods";

  export default {
    name: "goodsBrand",
    data()  {
      return{
        brandList :[],
        queryInfo:{
          pageSize:6,
          pageNum:1
        },
        brandFrom:{
          big_pic: '',//大图
          brand_story: '',//品牌故事
          factory_status: 0,//品牌制造商
          first_letter: '',//品牌首字母
          logo: '',//品牌logo
          name: '',//品牌名称
          show_status: 0,//品牌是否显示
          sort: 0//品牌排序
        },
        showBrandDialog:false,
        total:0
      }
    },
    mounted() {
      this.getData()
    },
    methods:{
      editBrand(brandId) {
        console.log(brandId)
        this.showBrandDialog = true
          brandManage().then(res => {
            res.data.forEach(item =>{
              if (brandId === item.id){
                console.log(item)
                this.brandFrom = item
              }
            })
          })
      },

      sureEditbrand() {
        this.showBrandDialog = false
        console.log('点击了确定')
        editBrand(this.brandFrom).then(res => {
          console.log(res)
          if (res.status == 400){
            this.$message.error('操作失败,请重试!');

          }else if(res.status ==200){
            this.$message({
              message: '恭喜你，操作成功!',
              type: 'success'
            });
          }
          this.getData()
        })

      },

      getData(){
        return brandManage(this.queryInfo).then(res =>{
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

  .dailog .el-form-item {
    width: 80%;
    margin-bottom: 10px;
    text-align: right;
  }
</style>
