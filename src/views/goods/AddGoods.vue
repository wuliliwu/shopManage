<template>
    <div class="addgoods">
      <div>
        <h4 style="text-align: left;border-bottom: 1px solid #ccc;padding: 10px 0">
          <i class="el-icon-edit-outline"></i>
          添加商品</h4>
      </div>
      <el-button :plain="true" @click="open4" v-show="false">错误</el-button>
      <el-button :plain="true" @click="open2" v-show="false">成功</el-button>
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="商品分类">
          <el-cascader
            v-model="addInfo.product_category_id"
            :options="jilianList"
            :props="{ expandTrigger: 'hover' }"
            @change="">
          </el-cascader>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="addInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="商品标题">
          <el-input v-model="addInfo.sub_title"></el-input>
        </el-form-item>
        <el-form-item label="商品品牌">
          <el-select v-model="addInfo.brand_name" placeholder="请选择商品品牌">
            <el-option
              v-for="item in brandList"
              :key="item.id"
              :label="item.name"
              :value="item.id"></el-option>
            <!--              <el-option label="海澜之家" value="50"></el-option>-->
          </el-select>
        </el-form-item>
        <el-form-item label="商品介绍">
          <el-input type="textarea" v-model="addInfo.description"></el-input>
        </el-form-item>
        <el-form-item label="图片链接地址">
          <el-input v-model="addInfo.pic"></el-input>
        </el-form-item>
        <el-form-item label="商品货号">
          <el-input v-model="addInfo.product_sn"></el-input>
        </el-form-item>
        <el-form-item label="商品售价">
          <el-input v-model="addInfo.price"></el-input>
        </el-form-item>
        <el-form-item label="市场价">
          <el-input v-model="addInfo.original_price"></el-input>
        </el-form-item>
        <el-form-item label="商品库存">
          <el-input v-model="addInfo.stock"></el-input>
        </el-form-item>
        <el-form-item label="计量单位">
          <el-input v-model="addInfo.unit"></el-input>
        </el-form-item>
        <el-form-item label="商品重量">
          <el-input v-model="addInfo.weight"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="addInfo.sort"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即添加</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
  import {addGoods,getcateChild,brandManage} from "utils/getgoods";

  export default {
    name: "AddGoods",
    data() {
      return {
        form: {
          name: '',
        },
        brandList:[],
        jilianList: [],
        // 添加的商品信息
        addInfo:{
          brand_id: null,//商品品牌id
          brand_name: '',//商品品牌名称
          delete_status: 0,//删除标志位，默认填0，表示未删除
          description: '',//商品介绍
          name: '',//商品名称
          original_price: 0,//市场价
          pic: '',//商品图片的url地址
          price: 0,//商品售价
          product_category_id: null,//分类id
          product_category_name: '',//分类名称
          product_sn: '',//商品货号
          sort: 0,//排序
          stock: 0,//商品库存
          sub_title: '',//副标题
          unit: '',//计量单位
          weight: 0,//商品重量
          sale:0,//商品销量,
          // publish_status: 0,
          // new_status: 0, //新品
          // recommand_status: 0, //推荐
          // verify_status: 0 //审核状态
        },
        rules: {
          name: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ]
        }
      }
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
      open4(msg) {
        this.$message.error(msg);
      },
      open2() {
        this.$message({
          message: '恭喜你，添加成功!',
          type: 'success'
        });
      },
      onSubmit() {
        addGoods(this.addInfo).then(res =>{
          console.log(res)
          if (res.status == 400){
            this.open4(res.msg)
          }else if(res.status == 200){
            this.open2()
          }
        })
      },

      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    watch:{
      'addInfo.product_category_id'(newval){
        if (newval!==null && newval.length ==2){
          this.addInfo.product_category_id = newval[1]
        }
      }
    }
  }
</script>

<style scoped lang="less">
.el-form {

  text-align: left;
  margin-top:10px;
  .el-form-item {
    max-width: 600px;
    margin-bottom: 8px;
  }

}
</style>
