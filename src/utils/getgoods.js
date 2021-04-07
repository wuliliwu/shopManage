import {request} from "./request";
export default function getGoods(success,params) {
  request({
    url:'/product_list',
    params:params,
  }).then((res)=> {
    success(res)
  })
}

// 获取商品分类
export  function getCategory(success,params) {
  request({
    url:'/get_product_category_list',
    params:params
  }).then((res)=> {
    success(res)
  })
}



// 获取商品类型
export  function productAttr(params) {
  return request({
    url:'/get_product_attr',
    params:params
  })
}

// 获取品牌管理数据
// url 地址：http://10.36.136.83:8001/index/Api/get_product_brand_pag
export function brandManage(params) {
  return request({
    // 这个接口有分页,查询
    url:'/get_product_brand_pag',
    params:params
  })
}

// 接口名称：获取商品分类的所有数据 ，有子节点
// url 地址：http://10.36.136.83:8001/index/Api/get_product_category

export function getcateChild() {
  return request({
    // 这个接口有分页,查询
    url:'/get_product_category',
  })
}


// http://10.36.136.83:8001/index/Api/create_product
// 添加一条商品信息的函数
export function addGoods(params) {
  return request({
    url:'/create_product',
    params:params,
    method:'post'
  })
}

// url 地址：http://10.36.136.83:8001/index/Api/update_product_attr
// 修改商品类型的接口

export function editAttr(params) {
  return request({
    url:'/update_product_attr',
    params:params,
    method:'post'
  })
}
