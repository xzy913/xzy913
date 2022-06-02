var fs = require('fs')
//express提供了一个更好的方法专门来封装路由
var express = require('express')
var User = require('./models/user')
var md5 = require('blueimp-md5')
// const user = require('./models/user')
// const { data } = require('jquery')
// const user = require('./models/user')
// 1.创建一个路由容器
var router = express.Router()
// 2.
router.get('/login',function(req,res){
        fs.readFile('../../DLZC/Front-End/views/dl.html',function(err,data){
            if(err){
                return res.end('404')
            }
            res.end(data)
        })
        console.log(req.session.user)
})
router.get('/register',function(req,res){
    fs.readFile('../../DLZC/Front-End/views/zc.html',function(err,data){
                    if(err){
                        return res.end('404')
                    }
                    // var htmlStr = template.render(data.toString(),{
                    //     comments:comments
                    // })
                    res.end(data)
                })
})
router.post('/login',async function(req,res){
    // 1.获取表单数据
    // 2.查询数据库
    // 3.发送响应数据
    var body = req.body
    // console.log(md5(md5(body.password)));
    // console.log(body.password);
    // var user =  User.findOne({
    //     account:body.account,
    //     password:body.password
    // })
    var user =await User.findOne({
        account:body.account,
        password:md5(md5(body.password))
    })
    console.log(user);
    function check(err,user){
        if(err){
            return res.status(500).json({
                err_code:500,
                message:err.message
            })
        }
        if(!user){
            return res.status(200).json({
                err_code:1,
                message:'Account or password is invalid.'
            })
            // console.log(user);
        }
        // 用户存在登录成功，通过session记录登录态
        // console.log(user);
        // req.session.user = user
        if(user){
            res.status(200).json({
                err_code:0,
                message:'Ok'
            })
        }
    }
    check(0,user)

})
router.post('/register',function(req,res){
    // 1.获取表单提交的数据
    // req.body
    // console.log(req.body);
    // 2.操作数据库
        //判断用户是否存在：
            //如果已经存在，不允许注册
            //如果不存在，注册新用户 
    // 3.发送响应
   
   
    // {
    var body = req.body
    console.log(body);
    User.findOne({
        $or:[
        {
            name:body.name
        },
        {
            account:body.account
        }
    ]
    },function (err,data){
        if(err){
            return res.status(500).json({
                success:false,
                message:'服务端错误'
            })
        }
        if(data){
            return res.status(200).json({
                err_code:1,
                message:'Name or account already exists'
            })
        }

        // console.log('ok');
        // return res.status(200).json({
        //     success:true,
        //     message:'ok'
        // })
        // 对密码进行md5重复加密
        body.password = md5(md5(body.password))
        body.Password = md5(md5(body.Password))
        new User(body).save(function(err,user){
                    if(err){
                        return res.status(500).json({
                            err_code:500,
                            message:'Internal error'
                        })
                    }

                    // 注册成功，使用session记录用户的登录状态
                    req.session.user = user
                    res.status(200).json({
                        err_code:0,
                        message:'Ok'
                    })
                })
        // // console.log('ok');
        // return res.status(200).json({
        //     success:true,
        //     message:'ok'
        // })
    })
    

})
module.exports = router