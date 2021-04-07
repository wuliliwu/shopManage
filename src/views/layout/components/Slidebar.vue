<template>
  <div class="sliderbar">

    <div class="content">
      <el-aside width="100%">
        <!--                    侧边栏目-->
        <el-menu
          background-color="#314155"
          text-color="#fff"
          active-text-color="#409fff"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          :default-active="$route.path"
        >

          <router-link to="/index/home">

            <el-menu-item index="/index/home">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>首页</span>
              </template>
            </el-menu-item>
          </router-link>
          <el-submenu :index="index1+1+''" v-for="(item1,index1) in menus">
            <template slot="title">
              <i class="el-icon-s-custom"> </i>
              <span>{{item1.title}}</span>
            </template>
            <!--                            二级菜单-->

            <ul v-for="(item2,index2) in item1.childs">
              <li>
                <router-link :to="'/'+ item1.type+'/'+item1.links[index2]">
                  <el-menu-item :index="'/'+ item1.type+'/'+item1.links[index2]">
                    <template slot="title">
                      <i class="el-icon-menu"></i>
                      <span>{{item2}}</span>
                    </template>
                  </el-menu-item>
                </router-link>
              </li>
            </ul>
          </el-submenu>
        </el-menu>
      </el-aside>
    </div>

  </div>
</template>

<script>
  export default {
    name: "Slidebar",
    data() {
      return {
        isCollapse: false,
        activePath:'1-4',
        menus:[
          {
            index:1,
            title:'商品',
            type:'goods',
            childs:[
              '商品列表',
              '添加商品',
              '商品分类',
              '商品类型',
              '品牌管理'
            ],
            links:[
              'goodslist',
              'addgoods',
              'goodscate',
              'goodsattr',
              'goodsbrand',
            ]
          },
          {
            index: 2,
            title:'订单',
            type:'order',
            childs:[
              '订单列表',
              '订单设置',
              '退货申请处理',
              '退货在设置原因',
            ],
            links:[
              'orderlist',
              'ordersetting',
              'ordertui',
              'goodslist',

            ]
          }
        ]
      }
    },
    methods: {
      toggleCollapse() {
        this.isCollapse = !this.isCollapse
      },
    },


  }
</script>

<style scoped lang="less">

  .hh5 {
   text-align: left;line-height: 50px;color:#fff;box-sizing: border-box
  }
  .sliderbar {
    width: 200px;
    height: 100%;
    .content {
      background-color: #314155;
      height: 100%;
      width: 200px;
      background-color: #314155;
    }

  }
  el-aside {
    height: 800px!important;
  }
  .el-menu {
    border-right: none!important;

  }
  a {
    color: #fff;
  }
  el-submenu {
    height: 100%;
    width: 200px;
  }
</style>
