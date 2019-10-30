/**
 * db.js 数据库核心文件
 * 负责数据库连接
 */
const mongoose= require("mongoose");


mongoose.connect(
  'mongodb://localhost:27017/project-management',
  { useNewUrlParser: true },
  (err)=>{
    if(err){
      return console.log(err)
    }
    console.log('db connect success , db:test')
  })

  module.exports = mongoose