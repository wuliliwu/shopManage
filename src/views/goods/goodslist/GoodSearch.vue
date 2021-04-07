<template>
    <div class="search">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <div class="allfrom">
          <el-form-item label="输入搜索" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>

          <el-form-item label="商品货号" prop="name">
            <el-input v-model="ruleForm.product_sn"></el-input>
          </el-form-item>
<!--          展示忽略-->
          <el-form-item label="上架状态" prop="region">
            <el-select v-model="ruleForm.publish_status" placeholder="请选择商品分类">
              <el-option label="上架" value="1"></el-option>
              <el-option label="下架" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审核状态" prop="region">
            <el-select v-model="ruleForm.verify_status" placeholder="请选择审核状态">
              <el-option label="已经审核" value="1"></el-option>
              <el-option label="尚未审核" value="0"></el-option>
            </el-select>
          </el-form-item>
<!--          这是级联选择器的-->
          <el-form-item label="商品分类" prop="region">
              <el-cascader
                v-model="ruleForm.product_category_id"
                :options="jilianList"
                :props="{ expandTrigger: 'hover' }"
                @change="">
              </el-cascader>
          </el-form-item>
          <el-form-item label="商品品牌" prop="region">
            <el-select v-model="ruleForm.brand_id" placeholder="请选择商品品牌">
              <el-option
                v-for="item in brandList"
                :key="item.id"
                :label="item.name"
                :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="buttons">
          <el-form-item>
            <el-button type="primary" @click="searchDate">搜索</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
</template>

<script>
  import getGoods from "utils/getgoods";
  import {brandManage,getcateChild} from "utils/getgoods";

  export default {
    name: "GoodSearch",
    data() {
      return {
        ruleForm: {
          name: null,
          product_sn:null,
          verify_status:null,
          brand_id:null,
          publish_status:null,
          product_category_id:null,//商品分类的id
        },
        brandList:[],
        // 级联选择器
        jilianList: [],
        rules: {
          name: [
            { required: false, message: '请输入搜索名称', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ],
          region:[
            {required: false, message: '请输入搜索名称', trigger: 'blur'},
            {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
          ],
        }
      };
    },
    mounted() {
      brandManage().then(res => {
        this.brandList = res.data
      })
      getcateChild().then((res)=>{
        // 进行数据处理
        res.data.forEach(item =>{
          var children1 = []
          item.children.forEach(item1 => {
            var label = item1.name
            var value = item1.id
            children1.push({
              label,value
            })
          })
          this.jilianList.push({
            value:item.id,
            label:item.name,
            children:children1
          })
        })

      })
    },

    methods: {
      searchDate() {
        return getGoods((res) => {
          // console.log(res)
          this.product = res.product
          this.total = res.total
          // 把数据发送出去
          this.$EventBus.$emit('searchRes',
            {
              product:this.product,
              total:this.total
            }
            )

        },this.ruleForm)
      },
      resetForm(formName) {
        // console.log('重置了')
        this.$nextTick(() => {
          this.$refs[formName].resetFields();
        })

      }
    },
    watch:{
      'ruleForm.product_category_id'(newval){
        console.log(newval[1])
        // this.ruleForm.product_category_id = null
        if (newval!==null && newval.length ==2){
          this.ruleForm.product_category_id = newval[1]
        }
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
