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
export function addGoods(data) {
  return request({
    url:'/create_product',
    // params:params,
    data:data,
    method:'post'
  })
}

// url 地址：http://10.36.136.83:8001/index/Api/update_product_attr
// 修改商品类型的接口
export function editAttr(data) {
  return request({
    url:'/update_product_attr',
    // params:params,
    data:data,
    method:'post'
  })
}

// 添加商品类型的数据接口
// url 地址：http://10.36.136.83:8001/index/Api/create_product_attr
//   参    数：添加的商品类型数据
// {
//   "name":"***",//名称
//   "attribute_count":0,//属性数量
//   "params_count":0} //参数数量
// 请求方式：post

export function addAttr(data) {
  return request({
    url:'/create_product_attr',
    // params:params,
    data:data,
    method:'post'
  })
}
// 添加一条商品类型
export function addCate(data) {
  return request({
    url:'/create_product_cate',
    data:data,
    method:'post'
  })
}

//
// ## 21.修改品牌管理数据
//
// url 地址：http://10.36.136.83:8001/index/Api/update_product_brand
export function editBrand(data) {
  return request({
    url:'/update_product_brand',
    data:data,
    method:'post'
  })
}


// 获取一条品牌管理得信息

export function getOneBrand(params) {
  return request({
    url:'/brand_one',
    params:params,
    method:'get'
  })
}

// delete_category 删除分类
export function deleteoneCate(data) {
  return request({
    url:'/delete_category',
    data:data,
    method:'post'
  })
}
