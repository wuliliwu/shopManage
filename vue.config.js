module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'views': '@/views',
        'utils':'@/utils'
      }
    }
  },
  devServer:{
    host:'localhost',
    port:'8080',
    // https:false,
    open:true,
    //以上的ip和端口是我们本机的;下面为需要跨域的
    proxy:{ //配置跨域
      '/':{
        target:'http://10.36.136.83:8001/index/Api',
        ws:true,
        changeOrigin:true,//允许跨域
        pathRewrie:{
          '^/':''   //请求的时候使用这个api就可以
        }
      }
    }
  }
}
