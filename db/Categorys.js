/**
 * Categorys
 * 项目类型
 */

 
const mongoose = require('./db')


//建立user结构
const categorySchema = mongoose.Schema({
  name: { type: String, required: true },
  parentID: { type: String, default: 0 },
})

//新建Categorys表
//使用结构categorySchema ,对应数据库里的表格(集合)
const Categorys = mongoose.model('Categorys',categorySchema,'categorys')

module.exports = Categorys