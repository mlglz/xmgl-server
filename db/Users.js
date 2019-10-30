/**
 * users.js 用户信息表
 */

const mongoose = require('./db')


//建立user结构
const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: ''},
})

//新建Users表
//使用结构userSchema ,对应表格(集合)users
const Users = mongoose.model('Users',userSchema,'users')

module.exports = Users