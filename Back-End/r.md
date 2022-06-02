在集成终端中需要输入的步骤
1.npm init -y
生成一个package.json
2.git init
为发布到git上做准备
3.安装核心包
npm i express mongooose

路由设计：
路径        方法          get参数           post参数          是否需要登录           备注
/login      GET                                                                  渲染登录页面
/login      POST                           账号、密码                             处理登录请求
/register   GET                                                                  渲染注册页面
/register   POST                           姓名、账号、密码                      处理注册请求

在Express这个框架中，默认不支持session和cookie
但是我们可以使用第三方中间件：express-session来解决
1.npm install express-session
2.配置(一定要在app.use(router)之前)
app.use(session({
    //配置加密字符串，它会在原有加密基础上和这个字符串拼接起来加密
    //目的是为了增加安全性
    secret:'keybord cat',  
    resave:false,
    
    saveUninitialized:true
}))
3.使用
 当把这个插件配置好之后，我们就可以通过req.session来访问和设置session成员了
 添加session数据：req.session.foo = 'bar'
 访问session数据：req.session.foo
提示：
默认session数据是内存储存的，服务器一旦重启就会丢失