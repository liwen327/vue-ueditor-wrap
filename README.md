# cnypa_fe

cnypa_fe前端项目
# yes

> cnypa.cn

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

#命名规范
组件开发[VUE 风格指南](https://cn.vuejs.org/v2/style-guide/)

JavaScript[JavaScript Standard Style ](https://github.com/standard/standard/blob/master/docs/README-zhcn.md#are-there-text-editor-plugins)

编辑器设置[editconfig编辑器统一配置](https://www.jianshu.com/p/00ac7bd5e74e)

命名规则

文件名: 资源文件一律小写

Vue Components/JavaScript Class 名称/遵循PascalCase 书写规则
Component name 按照kebab-case规则书写[模板中的组件名大小写](https://cn.vuejs.org/v2/style-guide/#%E6%A8%A1%E6%9D%BF%E4%B8%AD%E7%9A%84%E7%BB%84%E4%BB%B6%E5%90%8D%E5%A4%A7%E5%B0%8F%E5%86%99-%E5%BC%BA%E7%83%88%E6%8E%A8%E8%8D%90)

设置大小写敏感
```
git config core.ignorecase false
```


#环境
为了本地可以同时打开多个不同的环境,注意配置以下域名
*测试/生产环境待定
``` host
# loc
0.0.0.0 loc-cnypa.cn
#192.168.72.115  local.cnypa.cn

# test (无需配置,内网解析)

```
#axios 拦截器新增全局loading加载状态 默认发送请求调用Loading实例 异步结束关闭loading
使用方法：api 传递参数 {params: {loading: ''}} 不传或者loading属性不存在为默loading 如果 传递参数 {params: {loading: 'false'}} 则默认关闭loading状态
配置文件见@apis/http.js 使用element-ui 中Loading 服务调用

#更新全局loading加载状态,展现形式为浏览器顶部进度条形式（progressbar），封装内部loading组件，vuex store 统一管理loading开启关闭状态，状态分发不在子页面中进行,依然在axios拦截请求时dispatch是否开启状态，response异步后统一关闭 是否开启依然根据api需要设置，规则：
api 传递参数 {params: {loading: ''}} 不传或者loading属性不存在为默loading 如果 传递参数 {params: {loading: 'false'}} 则默认关闭loading状态
组件：自定义组件loading进度条  组件可传参数：进度条颜色:colorParam = {{colorParam}} 进度条高度:heightParam = {{heightParam}}
具体形式如下：
    <Loading v-if="fetchLoading" :colorParam='colorParam' :heightParam="heightParam"></Loading>

#新增自定义指令过滤器format（格式化时间）vue1 中自带指令已废弃（currency,uppercase等）
,如需使用需要自定义
使用方式见VueDemo.vue <div>{{times|dateFormat('yyyy.MM.dd')}}</div>

method 中调用
this.$options.filters.dateFormat(new Date(),'yyyy-MM-dd hh:mm’)
构造方法代码见main.js
#修改全局指令过滤器为局部过滤器 新建Filter.js创建过滤器 局部使用局部注册即可 用法同行

# cross-env npm 包支持
新增跨平台cross-env支持  新增testing测试环境变量配置 除了环境变量差异 其他与prod一致 config/test.env.js中配置test环境变量
将prod动态设置production 提到执行时赋值

#将my-upload组件移入到项目component文件夹中作为内部组件使用，修改组件结构与样式
```

#build文件目录新增plugins文件目录 包含HTMLWebpackMonitorPlugin 用于处理站点 增加PV统计、BI统计 由于vue spa条件在index.html增加百度统计代码的一次加载的局限性
 新增如下：1 在webpack.dev.config.js和webpack.prod.config.js中分别引入HTMLWebpackMonitorPlugin（其实应该在webpack.base.config.js一次性引入）
         2 在router.js路由守卫中执行动态增加hash
           window._hmt.push(['_trackPageview', '/#' + hash])

```
