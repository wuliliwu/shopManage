<template>
  <div class="user">

    <!--        卡片-->
    <el-card class="box-card" >
      <!--            搜索-->
      <el-row :gutter="20">
        <el-col :span="9">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="9">
          <el-button type="primary" @click="addDialog">添加分类</el-button>
        </el-col>
      </el-row>

      <el-button slot="append" icon="el-icon-search"></el-button>
      <!--            </el-input>-->
      <!--        用户列表区-->

      <el-table :data="categoryList"  stripe border >

<!--        <el-table-column type="index"></el-table-column>-->
        <template slot-scope="scope">
        <el-table-column label="编号" prop="id"></el-table-column>

        <el-table-column label="分类名称" prop="name"></el-table-column>
        <el-table-column label="级别" prop="level"></el-table-column>
        <el-table-column label="商品数量" prop="product_count"></el-table-column>
        <el-table-column label="数量单位" prop="product_unit"></el-table-column>
        <el-table-column label="是否显示" prop="show_status">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStateChange(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="排序" prop="sort"></el-table-column>

          <el-table-column label="查看下级" prop="children" >
            <template slot-scope="scope">
              <el-button size="small" @click="showxiaji(scope.row.id,scope.row.keywords)">查看下级</el-button>
            </template>


          </el-table-column>


        <el-table-column label="操作" prop="" width="200px">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark"
                        content="编辑" placement="top"
                        :enterable="false">
              <el-button type="primary" icon="el-icon-edit" circle>
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete"
                         circle @click="deleteCate(scope.row.id)">
              </el-button>
            </el-tooltip>

          </template>
        </el-table-column>
    </template>
        <!--            分页区域-->
      </el-table>

      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pageNum"
      :page-sizes="[2,6]"
      :page-size="queryInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
      </el-pagination>

    </el-card>


    <el-dialog
      title="添加分类"
      :visible.sync="dialogVisible"
      width="50%"
      @close="addDialogClose">
            <span>
<!--              :rules="addUserrules"-->
                <el-form :model="addcateFrom"  ref="addFormRef" label-width="130px" style="text-align: left">
                  <el-form-item label="分类名称" >
                    <el-input v-model="addcateFrom.name"></el-input>
                  </el-form-item>
                      <el-form-item label="上级分类">
                <el-select v-model="addcateFrom.level" placeholder="选择上级分类">
                  <el-option label="一级" value="0"></el-option>
                  <el-option label="二级" value="1"></el-option>
                </el-select>
              </el-form-item>
                    <el-form-item label="数量单位" >
                    <el-input v-model="addcateFrom.product_unit"></el-input>
                  </el-form-item>
                    <el-form-item label="排序" prop="">
                    <el-input v-model="addcateFrom.sort"></el-input>
                  </el-form-item>
                  <el-form-item label="是否显示">
                  <el-radio-group v-model="addcateFrom.show_status">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>
                  <el-form-item label="是否显示导航栏">
                  <el-radio-group v-model="addcateFrom.nav_status">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>

                  <el-form-item label="关键词" prop="mobile">
                    <el-input v-model="addcateFrom.keywords"></el-input>
                  </el-form-item>
                  <el-form-item label="分类描述" prop="mobile">
                    <el-input v-model="addcateFrom.description"></el-input>
                  </el-form-item>
                </el-form>
            </span>
      <!--            底部区域-->
      <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible1" >取 消</el-button>
            <el-button type="primary"  @click="commitCate">确 定</el-button>
          </span>
    </el-dialog>
    <!--        修改用户的对话框-->


<!--    查看下级的对话框-->

    <el-dialog
      :title="title"
      :visible.sync="showxiaji22"
      width="80%">

      <el-table :data="childcategoryList"  stripe border >
        <el-table-column label="编号" prop="id"></el-table-column>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="级别" prop="level"></el-table-column>
        <el-table-column label="商品数量" prop="product_count"></el-table-column>
        <el-table-column label="数量单位" prop="product_unit"></el-table-column>
        <el-table-column label="是否显示" prop="show_status">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStateChange(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="排序" prop="sort"></el-table-column>
        <el-table-column label="操作" prop="" width="200px">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark"
                        content="编辑" placement="top"
                        :enterable="false">
              <el-button type="primary" icon="el-icon-edit" circle>
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete"
                         circle>
              </el-button>
            </el-tooltip>

          </template>
        </el-table-column>

        <!--            分页区域-->
      </el-table>

    </el-dialog>
  </div>
</template>

<script>
  import {getCategory,getcateChild,addCate,deleteoneCate} from "utils/getgoods";


  export default {
    name: "goodsCate",
    data() {

      return{
        categoryList:[

        ],
        childcategoryList:[],
        title:'',
        // 查询信息
        queryInfo: {
          pageNum: 1,
          pageSize: 6
        },
        total: 0,
        addcateFrom:{
          description: '',//描述
          icon: '',//小图标
          keywords: '',//关键词
          name: '',//名称
          nav_status: 0,//是否显示在导航
          parent_id: 0,//上级节点id
          product_unit: '',//数量单位
          product_count: 0,//商品数量
          show_status: 0,//是否显示
          sort: null,//排序
          level:null//0表示一级分类 1表示二级分类
        },
        // 控制添加用户的对话框
        dialogVisible: false,
        showxiaji22:false,
        // 修改用户信息的数据
        editForm: {
          username:'',
          id: '',
          email:'',
          mobile:''
        },
        // 控制修改用户信息的弹框
        EditdialogVisible:false,



      }
    },
    methods: {
      deleteCate(id) {
        console.log(id)
        deleteoneCate({id}).then(res => {
          console.log(res)
          this.getDate()
        })
      },
      commitCate(){
        console.log('点击了添加')
        addCate(this.addcateFrom).then(res=> {
          console.log(res)
          this.getDate()
          this.dialogVisible = false

        })
      },
      showxiaji(id,title) {
        this.childcategoryList= []
        this.showxiaji22 = true
        getcateChild().then(res => {
            console.log(id,title)
          res.data.forEach(item => {
            if (id === item.id){
              console.log(item.children)
              this.childcategoryList = item.children
              this.title = '当前是'+title+'的子级页面'
            }
          })

          }
        )
      },

      // 获取数据的函数
      getDate() {
        return getCategory((res) => {
          // console.log(res)
          this.categoryList = res.data
          this.total = res.total
        },this.queryInfo)
      },
      handleSizeChange(newSize) {
        console.log(newSize)
        this.queryInfo.pageSize = newSize
        this.getDate()
      },
      handleCurrentChange(newPage) {
        console.log(newPage)
        this.queryInfo.pageNum = newPage
        this.getDate()
      },

      // -------------------------------

      addDialog() {
        this.dialogVisible = true
      },
      dialogVisible1() {
        this.dialogVisible = false
      },
      // 重置表单
      addDialogClose() {
        this.$refs.addFormRef.resetFields()
      },

      },
      mounted() {
        this.getDate()

      }



  }
</script>

<style scoped>
  .el-table {
    font-size: 13px;
    margin-top: 20px;
    border-radius: 5px;
  }
  .el-pagination {
    margin-top: 20px;
  }
</style>
