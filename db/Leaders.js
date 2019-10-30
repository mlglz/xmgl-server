/**
 * Leaders
 * 项目负责人
 */
const mongoose = require('./db')

//建立leader结构
const leaderSchema = mongoose.Schema({
  leaderName: { type: String, required: true },
  sector: { type: String, default: '测评部' },
  leaderPhone: { type: String },
  leaderMail: { type: String },
})

//新建leaders表
//使用结构leaderSchema ,对应数据库里的表格(集合)
const Leaders = mongoose.model('Leaders', leaderSchema, 'leaders')

module.exports = Leaders