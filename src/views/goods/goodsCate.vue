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
        <el-table-column type="index"></el-table-column>
        <el-table-column label="编号" prop="id"></el-table-column>
        <el-table-column label="分类名称" prop="keywords"></el-table-column>
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
        <el-table-column label="查看下级" prop="children">
          <el-button size="small">查看下级</el-button>
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
                         circle>
              </el-button>
            </el-tooltip>

          </template>
        </el-table-column>

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

    <!--        添加用户对话框-->
    <el-dialog
      title="添加分类"
      :visible.sync="dialogVisible"
      width="50%"
      @close="addDialogClose">
            <span>
                <el-form :model="addForm" :rules="addUserrules" ref="addFormRef" label-width="130px" style="text-align: left">
                  <el-form-item label="分类名称" prop="username">
                    <el-input v-model="addForm.username"></el-input>
                  </el-form-item>
                      <el-form-item label="上级分类">
                <el-select v-model="addForm.username" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
                    <el-form-item label="数量单位" prop="password">
                    <el-input v-model="addForm.password"></el-input>
                  </el-form-item>
                    <el-form-item label="排序" prop="email">
                    <el-input v-model="addForm.email"></el-input>
                  </el-form-item>
                  <el-form-item label="是否显示">
                  <el-radio-group v-model="addForm.email">
                    <el-radio label="是"></el-radio>
                    <el-radio label="否"></el-radio>
                  </el-radio-group>
                </el-form-item>

                  <el-form-item label="是否显示导航栏">
                  <el-radio-group v-model="addForm.email">
                    <el-radio label="是"></el-radio>
                    <el-radio label="否"></el-radio>
                  </el-radio-group>
                </el-form-item>

                  <el-form-item label="关键词" prop="mobile">
                    <el-input v-model="addForm.mobile"></el-input>
                  </el-form-item>
                  <el-form-item label="分类描述" prop="mobile">
                    <el-input v-model="addForm.mobile"></el-input>
                  </el-form-item>
                </el-form>
            </span>
      <!--            底部区域-->
      <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible1" >取 消</el-button>
            <el-button type="primary" >确 定</el-button>
          </span>
    </el-dialog>
    <!--        修改用户的对话框-->
    <el-dialog
      title="修改用户"
      :visible.sync="EditdialogVisible"
      width="50%">
            <span>
               <el-form :model="editForm" :rules="addUserrules" ref="editFormRef" label-width="70px" >
                  <el-form-item label="用户名">
                    <el-input v-model="editForm.username" disabled></el-input>
                  </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                    <el-input v-model="editForm.email"></el-input>
                  </el-form-item><el-form-item label="手机号" prop="mobile">
                    <el-input v-model="editForm.mobile"></el-input>
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
  import {getCategory} from "utils/getgoods";


  export default {
    name: "goodsCate",
    data() {
      var checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'));
        } else {
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
          // console.log(reg.test(value));
          if (reg.test(value)) {
            callback();
          } else {
            return callback(new Error('请输入正确的手机号'));
          }
        }
      };
      return{
        categoryList:[

        ],
        // 查询信息
        queryInfo: {
          pageNum: 1,
          pageSize: 2
        },
        total: 0,


        // 控制添加用户的对话框
        dialogVisible: false,
        // 添加用户的表单数据
        addForm: {
          username: '',
          password: '',
          email: '',
          mobile:''
        },
        // 修改用户信息的数据
        editForm: {
          username:'',
          id: '',
          email:'',
          mobile:''
        },
        // 控制修改用户信息的弹框
        EditdialogVisible:false,
        addUserrules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 12, message: '用户名长度在 3 到 12 个字符之间', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 15, message: '用户名长度在 6 到 15 个字符之间', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ],
          mobile: [
            {required:true, validator:checkPhone, trigger: ['blur', 'change'] }
          ]
        }


      }
    },
    methods: {
      // 获取数据的函数
      getDate() {
        return getCategory((res) => {
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
