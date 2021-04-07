<template>
    <div class="orderlist">
      <div class="search">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <div class="allfrom">
            <el-form-item label="输入搜索" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="收货人" prop="name">
              <el-input v-model="ruleForm.product_sn"></el-input>
            </el-form-item>
            <!--          展示忽略-->
            <el-form-item label="提交时间" prop="region">
              <el-select v-model="ruleForm.publish_status" placeholder="请选择商品分类">
                <el-option label="上架" value="1"></el-option>
                <el-option label="下架" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="订单状态" prop="region">
              <el-select v-model="ruleForm.verify_status" placeholder="请选择审核状态">
                <el-option label="已经审核" value="1"></el-option>
                <el-option label="尚未审核" value="0"></el-option>
              </el-select>
            </el-form-item>
            <!--          这是级联选择器的-->
            <el-form-item label="订单分类" prop="region">
              <el-cascader
                v-model="ruleForm.product_category_id"
                :props="{ expandTrigger: 'hover' }"
                @change="">
              </el-cascader>
            </el-form-item>
            <el-form-item label="订单来源" prop="region">
              <el-select v-model="ruleForm.brand_id" placeholder="请选择商品品牌">

              </el-select>
            </el-form-item>
          </div>
          <div class="buttons">
            <el-form-item>
              <el-button type="primary" @click="">搜索</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div style="display: flex;justify-content: space-between">
        <h4 style="text-align: left;border-bottom: 1px solid #ccc;padding: 10px 0">
          <i class="el-icon-edit-outline"></i>
          订单数据列表</h4>
        <el-button size="primary">添加</el-button>
      </div>

    </div>
</template>

<script>
  export default {
    name: "orderList",
    data(){
      return {
        ruleForm: {
          name: null,
          product_sn:null,
          verify_status:null,
          brand_id:null,
          publish_status:null,
          product_category_id:null,//商品分类的id
        },
        rules: {
          name: [
            { required: false, message: '请输入搜索名称', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ],

        }
      }
    },
    methods:{
      resetForm() {

      }
    }
  }
</script>

<style scoped lang="less">
  .el-form {
  .el-form-item{
    width: 100%;
  }
  .buttons {
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    margin-bottom: 10px;
  .el-button{
    float: right;
    margin-left: 10px;
  }
  }
  .allfrom{
    display: flex;
  }
  }
</style>
