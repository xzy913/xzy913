var express = require('express')
var bodyParser = require('body-parser')
var session = require('express-session')
var path = require('path')
var fs = require('fs')
var http = require('http')
var url = require('url')
var router = require('./router')
// var template = require('art-template')

var app = express()
// 开发public文件和node_modules文件
app.use('/public/',express.static(path.join(__dirname,'../../DLZC/Front-End/public/')))
app.use('/node_modules/',express.static(path.join(__dirname,'../../DLZC/Front-End/node_modules/')))

// 配置解析表单POST请求体插件(注意：一定要在app.use(router)之前)
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// app.set('views',path.join(__dirname,'./views/'))

app.use(session({
    //配置加密字符串，它会在原有加密基础上和这个字符串拼接起来加密
    //目的是为了增加安全性
    secret:'keybord cat',  
    resave:false,
    saveUninitialized:true
}))

app.use(router)
// http.createServer(function(req,res){
//     // var url = req.url 
//     // 使用url.parse方法将路径解析为一个方便操作的对象，
//     // 第二个参数为true表示直接将查询字符串转为一个对象（通过query属性来访问）
//     var parseObj = url.parse(req.url,true)
//     var pathname = parseObj.pathname
//     if(pathname === '/DL'){
//         fs.readFile('./views/dl.html',function(err,data){
//             if(err){
//                 return res.end('404')
//             }
//             res.end(data)
//         })
//         // res.end('hello')
//     }else if(pathname==='/a'){
//         fs.readFile('./views/zc.html',function(err,data){
//             if(err){
//                 return res.end('404')
//             }
//             var htmlStr = template.render(data.toString(),{
//                 comments:comments
//             })
//             res.end(htmlStr)
//         })
//     }
//     else if(pathname.indexOf('/public/')===0){
//         // 规定如果请求路径以/public/开头，则我认为你要获取public中的某个资源
//         // 所有我们就直接可以把请求路径当做文件路径来直接进行读取
//         fs.readFile('.'+pathname,function(err,data){
//             if(err){
//                 return res.end('404')
//             }
//             res.end(data)
//         })
//     }
//     // console.log('收到了');
// })
.listen(3000,function(){
    console.log("服务器请求成功");
})
