var mongoose = require('mongoose')
var Schema = mongoose.Schema

mongoose.connect('mongodb://127.0.0.1/test');
var userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    account:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    }
})
module.exports =  mongoose.model('User', userSchema)
// var User = mongoose.model('User',userSchema);

// var user = new User({
//     name:'xzy',
//     account:'123',
//     password:'123456',
//     Password:'123456'
// })
// user.save(function(err,res){
//     if (err) {
// 		console.log('保存失败');
// 	} else {
// 		console.log('保存成功');
// 		console.log(res);
// 	}
// })